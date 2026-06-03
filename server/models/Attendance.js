import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true, ref: 'Student' },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  subject: { type: String, required: true }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
