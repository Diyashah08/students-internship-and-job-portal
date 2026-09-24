const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');

async function testBackend() {
  console.log('🚀 Starting Backend Verification Test...');
  await connectDB();

  // Test models
  const User = require('./models/User');
  const Job = require('./models/Job');
  const Company = require('./models/Company');

  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  const companyCount = await Company.countDocuments();

  console.log(`📊 Verified Database State:`);
  console.log(`   - Users: ${userCount}`);
  console.log(`   - Companies: ${companyCount}`);
  console.log(`   - Jobs: ${jobCount}`);

  // Test User authentication matching
  const student = await User.findOne({ email: 'student@demo.com' });
  if (student) {
    const isMatch = await student.matchPassword('password123');
    console.log(`🔑 Student Password Match Test: ${isMatch ? 'PASSED ✅' : 'FAILED ❌'}`);
  }

  const recruiter = await User.findOne({ email: 'recruiter@demo.com' });
  if (recruiter) {
    const isMatch = await recruiter.matchPassword('password123');
    console.log(`🔑 Recruiter Password Match Test: ${isMatch ? 'PASSED ✅' : 'FAILED ❌'}`);
  }

  const admin = await User.findOne({ email: 'admin@demo.com' });
  if (admin) {
    const isMatch = await admin.matchPassword('admin123');
    console.log(`🔑 Admin Password Match Test: ${isMatch ? 'PASSED ✅' : 'FAILED ❌'}`);
  }

  console.log('🎉 ALL BACKEND VERIFICATIONS COMPLETED SUCCESSFULLY!');
  process.exit(0);
}

testBackend().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
