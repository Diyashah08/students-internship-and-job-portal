const Job = require('../models/Job');
const Company = require('../models/Company');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');

// @desc    Get all jobs with search, filtering & sorting
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const {
      q,
      type,
      workMode,
      category,
      location,
      skill,
      experience,
      status,
      recruiterId,
      sort = 'latest',
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // By default, only show Active jobs to public, unless recruiterId is provided (recruiter viewing their own) or explicit status requested
    if (recruiterId) {
      query.recruiterId = recruiterId;
      if (status && status !== 'all') {
        query.status = status;
      }
    } else if (status && status !== 'all') {
      query.status = status;
    } else {
      query.status = 'Active';
    }

    // Type filter (Internship / Full-time)
    if (type && type !== 'all') {
      query.type = type;
    }

    // Work mode filter (Remote / On-site / Hybrid)
    if (workMode && workMode !== 'all') {
      query.workMode = workMode;
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }

    // Location filter
    if (location && location.trim() !== '') {
      query.location = { $regex: location.trim(), $options: 'i' };
    }

    // Experience filter
    if (experience && experience !== 'all') {
      query.experience = { $regex: experience, $options: 'i' };
    }

    // Skill filter
    if (skill && skill.trim() !== '') {
      query.skills = { $in: [new RegExp(skill.trim(), 'i')] };
    }

    // Keyword search (Title, Description, Skills, or Company Name)
    if (q && q.trim() !== '') {
      const searchRegex = new RegExp(q.trim(), 'i');

      // Check if matching company names exist
      const matchingCompanies = await Company.find({
        companyName: searchRegex,
      }).select('_id');
      const matchingCompanyIds = matchingCompanies.map((c) => c._id);

      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { skills: { $in: [searchRegex] } },
        { category: searchRegex },
        { companyId: { $in: matchingCompanyIds } },
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // latest default
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'deadline') {
      sortOption = { deadline: 1 };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('companyId', 'companyName logo location website industry description')
      .populate('recruiterId', 'name email phone')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job details
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'companyName logo location website industry description')
      .populate('recruiterId', 'name email phone');

    if (!job) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Count applications for this job
    const applicationCount = await Application.countDocuments({ jobId: job._id });

    res.status(200).json({
      success: true,
      job,
      applicationCount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job listing
// @route   POST /api/jobs
// @access  Private (Recruiter)
exports.createJob = async (req, res, next) => {
  try {
    const recruiterId = req.user._id;

    // Find or create company for this recruiter
    let company = await Company.findOne({ recruiterId });
    if (!company) {
      company = await Company.create({
        companyName: req.body.companyName || `${req.user.name}'s Company`,
        recruiterId,
      });
    }

    const {
      title,
      description,
      type = 'Internship',
      category = 'Software Development',
      location = 'Remote',
      workMode = 'Remote',
      salary = '',
      stipend = '',
      duration = '',
      experience = 'Fresher',
      skills = [],
      eligibility = '',
      responsibilities = [],
      requirements = [],
      deadline,
    } = req.body;

    // Parse array fields if passed as comma strings
    const parseArray = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        return input
          .split('\n')
          .map((item) => item.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean);
      }
      return [];
    };

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const job = await Job.create({
      title,
      description,
      type,
      category,
      companyId: company._id,
      recruiterId,
      location,
      workMode,
      salary,
      stipend,
      duration,
      experience,
      skills: parsedSkills,
      eligibility,
      responsibilities: parseArray(responsibilities),
      requirements: parseArray(requirements),
      deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'Active',
    });

    const populatedJob = await Job.findById(job._id).populate('companyId');

    res.status(201).json({
      success: true,
      message: 'Listing posted successfully',
      job: populatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job listing
// @route   PUT /api/jobs/:id
// @access  Private (Recruiter / Admin)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership unless admin
    if (job.recruiterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this listing' });
    }

    const parseArray = (input) => {
      if (Array.isArray(input)) return input;
      if (typeof input === 'string') {
        return input
          .split('\n')
          .map((item) => item.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean);
      }
      return [];
    };

    const updateData = { ...req.body };
    if (updateData.skills && typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (updateData.responsibilities) {
      updateData.responsibilities = parseArray(updateData.responsibilities);
    }
    if (updateData.requirements) {
      updateData.requirements = parseArray(updateData.requirements);
    }

    job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('companyId');

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job listing
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiter / Admin)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership unless admin
    if (job.recruiterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this listing' });
    }

    // Cascade delete applications and saved job entries
    await Application.deleteMany({ jobId: job._id });
    await SavedJob.deleteMany({ jobId: job._id });
    await Job.findByIdAndDelete(job._id);

    res.status(200).json({
      success: true,
      message: 'Listing and related data deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle job status (Active / Closed)
// @route   PATCH /api/jobs/:id/status
// @access  Private (Recruiter / Admin)
exports.toggleJobStatus = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.recruiterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { status } = req.body;
    job.status = status || (job.status === 'Active' ? 'Closed' : 'Active');
    await job.save();

    res.status(200).json({
      success: true,
      message: `Job status changed to ${job.status}`,
      job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get categories, top companies & featured opportunities for Home Page
// @route   GET /api/jobs/featured
// @access  Public
exports.getFeaturedAndCategories = async (req, res, next) => {
  try {
    // Categories with counts
    const categoriesAggregation = await Job.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    // Top Companies
    const topCompanies = await Company.find().limit(6);

    // Latest Jobs (Full-time)
    const latestJobs = await Job.find({ status: 'Active', type: 'Full-time' })
      .populate('companyId', 'companyName logo location website')
      .sort({ createdAt: -1 })
      .limit(6);

    // Latest Internships
    const latestInternships = await Job.find({ status: 'Active', type: 'Internship' })
      .populate('companyId', 'companyName logo location website')
      .sort({ createdAt: -1 })
      .limit(6);

    // Quick stats for Hero
    const totalActiveJobs = await Job.countDocuments({ status: 'Active' });
    const totalCompanies = await Company.countDocuments();

    res.status(200).json({
      success: true,
      categories: categoriesAggregation,
      topCompanies,
      latestJobs,
      latestInternships,
      metrics: {
        totalActiveJobs,
        totalCompanies,
      },
    });
  } catch (error) {
    next(error);
  }
};
