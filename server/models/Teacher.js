import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: String },
  subjects: [{ type: String }],
  classesAssigned: [{ type: String }],
  photo: { type: String, default: '' },
  aadhaar: { type: String, default: '' },
  leaveStatus: { type: String, enum: ['none', 'pending', 'approved', 'rejected'], default: 'none' },
  joiningDate: { type: Date, default: Date.now },
  password: { type: String, required: true },
  role: { type: String, default: 'Teacher' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, {
  timestamps: true
});

// Auto-generate teacherId and hash password before saving
teacherSchema.pre('save', async function(next) {
  try {
    // Generate unique teacher ID if it doesn't exist
    if (!this.teacherId) {
      const count = await this.constructor.countDocuments();
      const year = new Date().getFullYear().toString().slice(-2);
      this.teacherId = `TCH${year}${String(count + 1).padStart(3, '0')}`;
    }

    // Hash password if modified
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
teacherSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
