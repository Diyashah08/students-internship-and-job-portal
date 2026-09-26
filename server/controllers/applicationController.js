const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Apply for a job / internship
// @route   POST /api/applications
// @access  Private (Student)
exports.applyJob = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const { jobId, resume, coverLetter, studentName, studentEmail, studentPhone } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    // Check if job exists and is Active
    const job = await Job.findById(jobId).populate('companyId');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    if (job.status !== 'Active') {
      return res.status(400).json({ success: false, message: 'This opportunity is no longer accepting applications' });
    }

    // Check application deadline
    if (new Date(job.deadline) < new Date()) {
      return res.status(400).json({ success: false, message: 'The application deadline for this position has passed' });
    }

    // Prevent duplicate application
    const existingApplication = await Application.findOne({ studentId, jobId });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this position',
      });
    }

    const student = await User.findById(studentId);
    const resumeToUse = resume || student.resume;

    if (!resumeToUse) {
      return res.status(400).json({
        success: false,
        message: 'Please provide or upload a resume to submit your application',
      });
    }

    const application = await Application.create({
      studentId,
      jobId,
      resume: resumeToUse,
      coverLetter: coverLetter || '',
      studentName: studentName || student.name,
      studentEmail: studentEmail || student.email,
      studentPhone: studentPhone || student.phone || '',
      status: 'Applied',
    });

    // Notify recruiter about new applicant
    if (job.recruiterId) {
      await Notification.create({
        userId: job.recruiterId,
        message: `New applicant ${student.name} applied for "${job.title}".`,
        type: 'application',
        link: `/recruiter/jobs/${job._id}/applications`,
      });
    }

    // Also notify student confirming application
    await Notification.create({
      userId: studentId,
      message: `Your application for "${job.title}" at ${job.companyId?.companyName || 'the company'} was submitted successfully!`,
      type: 'status_update',
      link: '/student/applications',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications submitted by logged-in student
// @route   GET /api/applications/my
// @access  Private (Student)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName logo location website industry' },
      })
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications for a specific job (for recruiter)
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter / Admin)
exports.getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('companyId');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership unless admin
    if (job.recruiterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ jobId })
      .populate('studentId', 'name email phone college course graduationYear skills resume github linkedin profileImage about')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      job,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status & send notification
// @route   PUT /api/applications/:id/status
// @access  Private (Recruiter / Admin)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, interviewDate, interviewTime, interviewLink, interviewNotes } = req.body;
    const validStatuses = ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status provided' });
    }

    const application = await Application.findById(req.params.id)
      .populate('jobId')
      .populate('studentId');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check recruiter authorization
    if (
      application.jobId.recruiterId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized to update status' });
    }

    application.status = status;
    if (interviewDate !== undefined) application.interviewDate = interviewDate;
    if (interviewTime !== undefined) application.interviewTime = interviewTime;
    if (interviewLink !== undefined) application.interviewLink = interviewLink;
    if (interviewNotes !== undefined) application.interviewNotes = interviewNotes;
    await application.save();

    // Create Notification for the student
    const job = await Job.findById(application.jobId._id).populate('companyId');
    const companyName = job?.companyId?.companyName || 'Company';

    let messageText = `Your application for "${job?.title}" at ${companyName} has been updated to: ${status}.`;
    if (status === 'Shortlisted') {
      messageText = `🎉 Congratulations! Your application for "${job?.title}" at ${companyName} has been shortlisted!`;
    } else if (status === 'Interview') {
      messageText = `📅 Interview Scheduled! Position: "${job?.title}" at ${companyName}. Date: ${interviewDate || 'Upcoming'} ${interviewTime ? 'at ' + interviewTime : ''}. Join link: ${interviewLink || 'Portal Notification'}`;
    } else if (status === 'Selected') {
      messageText = `🌟 Congratulations! You have been selected for the position of "${job?.title}" at ${companyName}!`;
    } else if (status === 'Rejected') {
      messageText = `Update on your application for "${job?.title}" at ${companyName}: Status changed to Rejected.`;
    }

    await Notification.create({
      userId: application.studentId._id,
      message: messageText,
      type: 'status_update',
      link: '/student/applications',
    });

    res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if logged-in student has applied for a job
// @route   GET /api/applications/check/:jobId
// @access  Private (Student)
exports.checkIfApplied = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      studentId: req.user._id,
      jobId: req.params.jobId,
    });

    res.status(200).json({
      success: true,
      hasApplied: !!application,
      application: application || null,
    });
  } catch (error) {
    next(error);
  }
};
