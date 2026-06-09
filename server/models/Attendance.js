import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // referencing student's custom studentId
  studentName: { type: String },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Leave'], required: true },
  teacherId: { type: String, required: true } // who marked it
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
