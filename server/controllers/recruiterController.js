const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get recruiter dashboard stats
// @route   GET /api/recruiter/dashboard
// @access  Private (Recruiter)
exports.getRecruiterDashboard = async (req, res, next) => {
  try {
    const recruiterId = req.user._id;

    // Find recruiter company
    const company = await Company.findOne({ recruiterId });

    // Find all jobs by this recruiter
    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });
    const jobIds = jobs.map((j) => j._id);

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => j.status === 'Active').length;
    const closedJobs = jobs.filter((j) => j.status === 'Closed').length;

    // Total applications across all recruiter jobs
    const totalApplications = await Application.countDocuments({
      jobId: { $in: jobIds },
    });

    // Recent applications
    const recentApplications = await Application.find({
      jobId: { $in: jobIds },
    })
      .populate('studentId', 'name email phone college course skills graduationYear profileImage resume')
      .populate('jobId', 'title type location')
      .sort({ appliedAt: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      dashboard: {
        company,
        totalJobs,
        activeJobs,
        closedJobs,
        totalApplications,
        recentApplications,
        recentJobs: jobs.slice(0, 5),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get company profile for recruiter
// @route   GET /api/recruiter/company
// @access  Private (Recruiter)
exports.getCompanyProfile = async (req, res, next) => {
  try {
    let company = await Company.findOne({ recruiterId: req.user._id });
    if (!company) {
      company = await Company.create({
        companyName: `${req.user.name}'s Company`,
        recruiterId: req.user._id,
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update company profile
// @route   PUT /api/recruiter/company
// @access  Private (Recruiter)
exports.updateCompanyProfile = async (req, res, next) => {
  try {
    const { companyName, logo, description, website, location, industry } = req.body;

    let company = await Company.findOne({ recruiterId: req.user._id });
    if (!company) {
      company = new Company({ recruiterId: req.user._id });
    }

    if (companyName) company.companyName = companyName;
    if (logo !== undefined) company.logo = logo;
    if (description !== undefined) company.description = description;
    if (website !== undefined) company.website = website;
    if (location !== undefined) company.location = location;
    if (industry !== undefined) company.industry = industry;

    await company.save();

    res.status(200).json({
      success: true,
      message: 'Company profile updated successfully',
      company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload company logo
// @route   POST /api/recruiter/upload-logo
// @access  Private (Recruiter)
exports.uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file' });
    }

    const filePath = `/uploads/${req.file.filename}`;
    let company = await Company.findOne({ recruiterId: req.user._id });
    if (company) {
      company.logo = filePath;
      await company.save();
    }

    res.status(200).json({
      success: true,
      message: 'Logo uploaded successfully',
      logoUrl: filePath,
    });
  } catch (error) {
    next(error);
  }
};
