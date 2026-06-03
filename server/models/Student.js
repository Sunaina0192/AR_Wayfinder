import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  registrationDate: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Auto-generate studentId and hash password before saving
studentSchema.pre('save', async function(next) {
  try {
    // Generate unique student ID if it doesn't exist
    if (!this.studentId) {
      const count = await this.constructor.countDocuments();
      const year = new Date().getFullYear().toString().slice(-2);
      this.studentId = `STU${year}${String(count + 1).padStart(4, '0')}`;
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
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
