const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    type: {
      type: String,
      enum: ['Internship', 'Full-time'],
      required: true,
      default: 'Internship',
    },
    category: {
      type: String,
      required: true,
      default: 'Software Development',
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      default: 'Bengaluru, India',
    },
    workMode: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'Hybrid',
    },
    salary: {
      type: String,
      default: '',
    },
    stipend: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '', // e.g. "3 Months", "6 Months"
    },
    experience: {
      type: String,
      default: 'Fresher',
    },
    skills: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: String,
      default: 'B.Tech / BCA / MCA / B.Sc or related IT degree (2024 / 2025 / 2026 Batch)',
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    deadline: {
      type: Date,
      required: [true, 'Application deadline is required'],
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Pending', 'Rejected'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Job', jobSchema);
