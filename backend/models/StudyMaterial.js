import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  course: { type: String, required: true },
  semester: { type: String, required: true },
  teacherId: { type: String, required: true }, // The teacher who uploaded it
  teacherName: { type: String },
  link: { type: String, required: true }, // URL to Google Drive, Dropbox, etc.
  type: { type: String, enum: ['Notes', 'Assignment', 'Syllabus', 'Other'], default: 'Notes' }
}, { timestamps: true });

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
export default StudyMaterial;
