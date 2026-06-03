import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  target: { type: String, enum: ['All', 'Student', 'Course'], default: 'All' },
  targetId: { type: String }, // specific studentId or course name if target is not All
  date: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
