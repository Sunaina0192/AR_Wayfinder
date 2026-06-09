import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  hostelName: { type: String, required: true },
  type: { type: String, enum: ['Boys', 'Girls'], required: true },
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true, default: 2 },
  occupants: [{ type: String }], // Array of student IDs
  fees: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' }
}, { timestamps: true });

const Hostel = mongoose.model('Hostel', hostelSchema);
export default Hostel;
