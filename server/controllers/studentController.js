const User = require('../models/User');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');

// Helper to compute student profile completion percentage
const calculateProfileCompletion = (user) => {
  let score = 0;
  const fields = [
    { key: 'name', weight: 10 },
    { key: 'email', weight: 10 },
    { key: 'phone', weight: 10 },
    { key: 'college', weight: 15 },
    { key: 'course', weight: 10 },
    { key: 'graduationYear', weight: 10 },
    { key: 'skills', weight: 15, isArray: true },
    { key: 'resume', weight: 15 },
    { key: 'about', weight: 5 },
    { key: 'linkedin', weight: 5 },
    { key: 'github', weight: 5 },
  ];

  for (const field of fields) {
    if (field.isArray) {
      if (user[field.key] && user[field.key].length > 0) score += field.weight;
    } else {
      if (user[field.key] && String(user[field.key]).trim() !== '') score += field.weight;
    }
  }

  return Math.min(score, 100);
};

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const completionPercentage = calculateProfileCompletion(user);

    res.status(200).json({
      success: true,
      user,
      profileCompletion: completionPercentage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/students/profile
// @access  Private (Student)
exports.updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      college,
      course,
      graduationYear,
      skills,
      resume,
      github,
      linkedin,
      about,
      profileImage,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (college !== undefined) user.college = college;
    if (course !== undefined) user.course = course;
    if (graduationYear !== undefined) user.graduationYear = graduationYear ? Number(graduationYear) : null;
    if (resume !== undefined) user.resume = resume;
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (about !== undefined) user.about = about;
    if (profileImage !== undefined) user.profileImage = profileImage;

    if (skills !== undefined) {
      if (Array.isArray(skills)) {
        user.skills = skills;
      } else if (typeof skills === 'string') {
        user.skills = skills.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }

    await user.save();

    const completionPercentage = calculateProfileCompletion(user);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        college: user.college,
        course: user.course,
        graduationYear: user.graduationYear,
        skills: user.skills,
        resume: user.resume,
        github: user.github,
        linkedin: user.linkedin,
        about: user.about,
        profileImage: user.profileImage,
      },
      profileCompletion: completionPercentage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload resume file
// @route   POST /api/students/upload-resume
// @access  Private (Student)
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    const user = await User.findById(req.user._id);
    if (user) {
      user.resume = filePath;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      resumeUrl: filePath,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Student Dashboard data
// @route   GET /api/students/dashboard
// @access  Private (Student)
exports.getStudentDashboard = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const user = await User.findById(studentId).select('-password');

    // Profile completion
    const profileCompletion = calculateProfileCompletion(user);

    // Total applications & status counts
    const applications = await Application.find({ studentId })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName logo location' },
      })
      .sort({ appliedAt: -1 });

    const totalApplications = applications.length;

    const statusCounts = {
      applied: 0,
      underReview: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      rejected: 0,
    };

    applications.forEach((app) => {
      const st = (app.status || 'Applied').toLowerCase().replace(/\s+/g, '');
      if (st === 'applied') statusCounts.applied++;
      else if (st === 'underreview') statusCounts.underReview++;
      else if (st === 'shortlisted') statusCounts.shortlisted++;
      else if (st === 'interview') statusCounts.interview++;
      else if (st === 'selected') statusCounts.selected++;
      else if (st === 'rejected') statusCounts.rejected++;
    });

    // Saved jobs count
    const totalSavedJobs = await SavedJob.countDocuments({ studentId });

    // Recommended opportunities based on student's skills
    let recommendedQuery = { status: 'Active' };
    if (user.skills && user.skills.length > 0) {
      recommendedQuery.skills = { $in: user.skills.map((s) => new RegExp(s, 'i')) };
    }

    const recommendedJobs = await Job.find(recommendedQuery)
      .populate('companyId', 'companyName logo location website industry')
      .sort({ createdAt: -1 })
      .limit(6);

    // Recently added opportunities
    const recentJobs = await Job.find({ status: 'Active' })
      .populate('companyId', 'companyName logo location website industry')
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      dashboard: {
        user,
        profileCompletion,
        totalApplications,
        totalSavedJobs,
        statusCounts,
        recentApplications: applications.slice(0, 5),
        recommendedJobs,
        recentJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};
