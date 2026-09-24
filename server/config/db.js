const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/internconnect';

  try {
    // Attempt standard connection with 3-second timeout
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️  Local MongoDB not detected (${error.message}).`);
    console.log('🔄 Launching In-Memory MongoDB engine for seamless development & demo testing...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Connected: ${conn.connection.host}`);
      console.log('🌱 Automatically seeding demo data into In-Memory database...');

      // Run automatic seed in memory
      try {
        const seedInMemory = require('../seed/autoSeed');
        await seedInMemory();
        console.log('✅ Auto-seed completed successfully!');
      } catch (seedErr) {
        console.error('Seed error:', seedErr.message);
      }
    } catch (memErr) {
      console.error('❌ Could not start in-memory MongoDB:', memErr.message);
    }
  }
};

module.exports = connectDB;
