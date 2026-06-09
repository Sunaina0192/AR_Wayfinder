import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // referencing student's custom studentId
  studentName: { type: String },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  teacherId: { type: String, required: true }, // who uploaded it
  sgpa: { type: Number, required: true },
  status: { type: String, enum: ['Pass', 'Fail', 'Promoted'], required: true },
  subjects: [{
    name: { type: String, required: true },
    credits: { type: Number, required: true },
    grade: { type: String, required: true }
  }]
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;
