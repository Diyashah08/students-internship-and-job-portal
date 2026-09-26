const mongoose = require('mongoose');

const connectDB = async () => {
  // Normalize uri: prefer IPv4 127.0.0.1 over localhost to prevent IPv6 ::1 timeout in Node 18+ and 25+
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/internconnect';
  if (uri.includes('mongodb://localhost:')) {
    uri = uri.replace('mongodb://localhost:', 'mongodb://127.0.0.1:');
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Auto-seed if database is currently empty
    try {
      const Job = require('../models/Job');
      const jobCount = await Job.countDocuments();
      if (jobCount === 0) {
        console.log('🌱 Database is empty. Running initial auto-seed...');
        const autoSeed = require('../seed/autoSeed');
        await autoSeed();
        console.log('✅ Initial database auto-seed complete!');
      }
    } catch (seedErr) {
      console.warn('⚠️ Auto-seed check warning:', seedErr.message);
    }

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error on ${uri}:`, error.message);

    // Fallback: If 127.0.0.1 fails, try in-memory server
    try {
      console.log('🔄 Attempting fallback in-memory MongoDB server...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Connected: ${conn.connection.host}`);

      const autoSeed = require('../seed/autoSeed');
      await autoSeed();
      console.log('✅ In-memory database auto-seeded successfully!');
      return conn;
    } catch (fallbackErr) {
      console.error('❌ Could not start in-memory MongoDB fallback:', fallbackErr.message);
    }
  }
};

module.exports = connectDB;
