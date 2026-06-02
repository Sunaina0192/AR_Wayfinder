import mongoose from 'mongoose';

const loginRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Student', 'Admin', 'Visitor'],
  },
  password: {
    type: String,
    // Required for Student and Admin, but Visitor might just have a purpose instead
    required: function() { return this.role !== 'Visitor'; }
  },
  purpose: {
    type: String,
    // Optional, mainly for Visitors
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const LoginRecord = mongoose.model('LoginRecord', loginRecordSchema, 'loginlogs');

export default LoginRecord;
