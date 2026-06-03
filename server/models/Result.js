import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true, ref: 'Student' },
  semester: { type: String, required: true },
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
