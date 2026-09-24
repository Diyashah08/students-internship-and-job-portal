const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get system-wide Admin Dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getAdminStats = async (req, res, next) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments({ type: 'Full-time' });
    const totalInternships = await Job.countDocuments({ type: 'Internship' });
    const totalAllOpportunities = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Opportunity status breakdown
    const activeJobsCount = await Job.countDocuments({ status: 'Active' });
    const closedJobsCount = await Job.countDocuments({ status: 'Closed' });
    const pendingJobsCount = await Job.countDocuments({ status: 'Pending' });

    // Application status breakdown
    const applicationsByStatus = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Opportunities by category
    const opportunitiesByCategory = await Job.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    // Recent signups
    const recentUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(6);

    // Recent jobs
    const recentJobs = await Job.find()
      .populate('companyId', 'companyName logo location')
      .populate('recruiterId', 'name email')
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalRecruiters,
        totalCompanies,
        totalJobs,
        totalInternships,
        totalAllOpportunities,
        totalApplications,
        activeJobsCount,
        closedJobsCount,
        pendingJobsCount,
        applicationsByStatus,
        opportunitiesByCategory,
        recentUsers,
        recentJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users with filtering
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { role, q } = req.query;
    const query = {};

    if (role && role !== 'all') {
      query.role = role;
    }

    if (q && q.trim() !== '') {
      const searchRegex = new RegExp(q.trim(), 'i');
      query.$or = [{ name: searchRegex }, { email: searchRegex }, { college: searchRegex }];
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent deleting superadmin self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own admin account' });
    }

    // Clean up dependent data
    if (user.role === 'student') {
      await Application.deleteMany({ studentId: user._id });
    } else if (user.role === 'recruiter') {
      const jobs = await Job.find({ recruiterId: user._id });
      const jobIds = jobs.map((j) => j._id);
      await Application.deleteMany({ jobId: { $in: jobIds } });
      await Job.deleteMany({ recruiterId: user._id });
      await Company.deleteMany({ recruiterId: user._id });
    }

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      success: true,
      message: 'User and all associated data deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all jobs for Admin
// @route   GET /api/admin/jobs
// @access  Private (Admin)
exports.getAllJobsAdmin = async (req, res, next) => {
  try {
    const { status, type, q } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (type && type !== 'all') {
      query.type = type;
    }
    if (q && q.trim() !== '') {
      query.title = { $regex: q.trim(), $options: 'i' };
    }

    const jobs = await Job.find(query)
      .populate('companyId', 'companyName logo location website')
      .populate('recruiterId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Moderate / update job status (Approve, Reject, Active, Closed)
// @route   PUT /api/admin/jobs/:id/status
// @access  Private (Admin)
exports.updateJobModeration = async (req, res, next) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('companyId');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({
      success: true,
      message: `Job status updated to ${status}`,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications platform-wide
// @route   GET /api/admin/applications
// @access  Private (Admin)
exports.getAllApplicationsAdmin = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate('studentId', 'name email phone college course skills')
      .populate({
        path: 'jobId',
        populate: { path: 'companyId', select: 'companyName logo location' },
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
