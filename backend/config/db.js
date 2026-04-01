const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/qr-billing-system');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed Admin User
    const User = require('../models/User');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminName = process.env.ADMIN_NAME || 'Master Admin';
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

      await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`Default Admin Account Created: ${adminEmail} / ${adminPassword}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
