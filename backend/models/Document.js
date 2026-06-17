import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  type: { type: String, enum: ['PDF', 'Excel', 'Word', 'Image', 'Other'], default: 'Other' },
  uploadedBy: { type: String, required: true }, // Admin name or ID
  size: { type: String }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);
export default Document;
