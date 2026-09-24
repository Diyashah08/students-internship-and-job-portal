const User = require('../models/User');
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'internconnect_super_secret_jwt_key_2024_secure_fsd_project',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user (Student or Recruiter)
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = 'student',
      phone,
      // Student specific
      college,
      course,
      graduationYear,
      skills,
      // Recruiter specific
      companyName,
      companyWebsite,
      companyLocation,
      industry,
      companyDescription,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Process skills if provided as string or array
    let parsedSkills = [];
    if (skills) {
      if (Array.isArray(skills)) {
        parsedSkills = skills;
      } else if (typeof skills === 'string') {
        parsedSkills = skills.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      phone: phone || '',
      college: college || '',
      course: course || '',
      graduationYear: graduationYear ? Number(graduationYear) : null,
      skills: parsedSkills,
    });

    // If recruiter, create associated company profile
    let company = null;
    if (user.role === 'recruiter') {
      company = await Company.create({
        companyName: companyName || `${user.name}'s Company`,
        website: companyWebsite || '',
        location: companyLocation || '',
        industry: industry || 'Technology & Services',
        description: companyDescription || '',
        recruiterId: user._id,
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
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
        company: company || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Find company if recruiter
    let company = null;
    if (user.role === 'recruiter') {
      company = await Company.findOne({ recruiterId: user._id });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
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
        company: company || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let company = null;
    if (user.role === 'recruiter') {
      company = await Company.findOne({ recruiterId: user._id });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        company,
      },
    });
  } catch (error) {
    next(error);
  }
};
