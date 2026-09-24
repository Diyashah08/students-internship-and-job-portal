const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: 'Information Technology',
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Company', companySchema);
