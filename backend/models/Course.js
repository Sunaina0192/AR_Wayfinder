import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
