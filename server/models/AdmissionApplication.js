import mongoose from 'mongoose';

const admissionApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },

  // Personal Info
  fullName:    { type: String, required: true },
  fatherName:  { type: String, required: true },
  motherName:  { type: String, required: true },
  dob:         { type: String, required: true },
  gender:      { type: String, required: true },
  mobile:      { type: String, required: true },
  email:       { type: String, required: true },

  // Address
  state:    { type: String, required: true },
  district: { type: String, required: true },
  city:     { type: String, required: true },
  address:  { type: String, required: true },

  // Academic
  marks10:           { type: String, required: true },
  marks12:           { type: String, required: true },
  prevQualification: { type: String, required: true },
  course:            { type: String, required: true },

  // Documents (stored as base64 strings)
  documents: {
    passportPhoto:    { type: String },
    aadhaarCard:      { type: String },
    certificate10th:  { type: String },
    certificate12th:  { type: String },
  },

  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

// Auto-generate applicationId before save
admissionApplicationSchema.pre('save', async function (next) {
  if (!this.applicationId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationId = `SBBSU${year}${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

const AdmissionApplication = mongoose.model('AdmissionApplication', admissionApplicationSchema);
export default AdmissionApplication;
