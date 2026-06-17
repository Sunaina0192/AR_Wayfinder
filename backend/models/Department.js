import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  hod: { type: String } // Head of Department (could be teacher ID)
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);
export default Department;
