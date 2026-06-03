import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './server/models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const adminExists = await Admin.findOne({ email: 'admin@sbbsu.ac.in' });
    
    if (adminExists) {
      console.log('Admin account already exists.');
      process.exit();
    }

    await Admin.create({
      name: 'Super Admin',
      email: 'admin@sbbsu.ac.in',
      password: 'adminpassword123',
      role: 'Admin'
    });

    console.log('Default Admin account created successfully.');
    console.log('Email: admin@sbbsu.ac.in');
    console.log('Password: adminpassword123');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
