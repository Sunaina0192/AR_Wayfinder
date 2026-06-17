import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: String, required: true }, // Name of the course it belongs to
  semester: { type: String, required: true },
  credits: { type: Number, required: true },
  type: { type: String, enum: ['Theory', 'Practical', 'Both'], default: 'Theory' }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
