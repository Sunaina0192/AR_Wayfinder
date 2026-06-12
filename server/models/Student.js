import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, default: '' },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, default: '' },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  registrationNumber: { type: String, default: '' },
  aadhaarNumber: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  category: { type: String, default: 'General' },
  // Documents (Store URLs or base64 strings)
  passportPhoto: { type: String, default: '' },
  tenthCertificate: { type: String, default: '' },
  twelfthCertificate: { type: String, default: '' },
  aadhaarCardDoc: { type: String, default: '' },
  // Statuses
  feeStatus: { type: String, enum: ['paid', 'pending', 'partial'], default: 'pending' },
  hostelStatus: { type: String, enum: ['Not Applied', 'Allocated', 'Pending'], default: 'Not Applied' },
  password: { type: String, required: true },
  status: { type: String, enum: ['pending_verification', 'pending', 'approved', 'rejected'], default: 'pending_verification' },
  registrationDate: { type: Date, default: Date.now },
  role: { type: String, default: 'Student' },
  otp: { type: String },
  otpExpires: { type: Date },
  isEmailVerified: { type: Boolean, default: false }
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
