import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentId: { type: String, required: true, ref: 'Student' },
  semester: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true, default: 0 },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' }
}, { timestamps: true });

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;
