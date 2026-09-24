const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    resume: {
      type: String,
      required: [true, 'Resume is required'],
    },
    coverLetter: {
      type: String,
      default: '',
    },
    studentName: {
      type: String,
      default: '',
    },
    studentEmail: {
      type: String,
      default: '',
    },
    studentPhone: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate application by same student for same job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
