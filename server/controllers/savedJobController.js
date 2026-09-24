const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');

// @desc    Save a job
// @route   POST /api/saved-jobs/:jobId
// @access  Private (Student)
exports.saveJob = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const existing = await SavedJob.findOne({ studentId, jobId });
    if (existing) {
      return res.status(200).json({ success: true, message: 'Job already saved', savedJob: existing });
    }

    const savedJob = await SavedJob.create({
      studentId,
      jobId,
    });

    res.status(201).json({
      success: true,
      message: 'Job saved to your bookmarks',
      savedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsave a job
// @route   DELETE /api/saved-jobs/:jobId
// @access  Private (Student)
exports.unsaveJob = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const { jobId } = req.params;

    await SavedJob.findOneAndDelete({ studentId, jobId });

    res.status(200).json({
      success: true,
      message: 'Job removed from saved list',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved jobs for student
// @route   GET /api/saved-jobs
// @access  Private (Student)
exports.getSavedJobs = async (req, res, next) => {
  try {
    const studentId = req.user._id;

    const savedJobs = await SavedJob.find({ studentId })
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName logo location website industry' },
      })
      .sort({ savedAt: -1 });

    // Filter out any jobs that were deleted
    const validSavedJobs = savedJobs.filter((item) => item.jobId !== null);

    res.status(200).json({
      success: true,
      count: validSavedJobs.length,
      savedJobs: validSavedJobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if a job is saved by student
// @route   GET /api/saved-jobs/check/:jobId
// @access  Private (Student)
exports.checkSavedJob = async (req, res, next) => {
  try {
    const isSaved = await SavedJob.exists({
      studentId: req.user._id,
      jobId: req.params.jobId,
    });

    res.status(200).json({
      success: true,
      isSaved: !!isSaved,
    });
  } catch (error) {
    next(error);
  }
};
