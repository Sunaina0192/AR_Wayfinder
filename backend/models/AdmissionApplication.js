import mongoose from 'mongoose';

const admissionApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },

  // Personal Info
  fullName:    { type: String, required: true },
  fatherName:  { type: String, required: true },
  motherName:  { type: String, required: true },
  dob:         { type: String, required: true },
  gender:      { type: String, required: true },
  mobile:      { type: String, required: true, match: [/^\+\d{7,15}$/, 'Mobile number must be a valid E.164 phone number starting with + and country code.'] },
  email:       { type: String, required: true, match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/i, 'Only Gmail addresses are allowed.'] },

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
    passportPhoto:    { type: String, required: true },
    aadhaarCard:      { type: String, required: true },
    certificate10th:  { type: String, required: true },
    certificate12th:  { type: String, required: true },
  },

  // Document verification status
  documentVerification: {
    passportPhoto:    { type: String, enum: ['Verified', 'Rejected', 'Pending'], default: 'Pending' },
    aadhaarCard:      { type: String, enum: ['Verified', 'Rejected', 'Pending'], default: 'Pending' },
    certificate10th:  { type: String, enum: ['Verified', 'Rejected', 'Pending'], default: 'Pending' },
    certificate12th:  { type: String, enum: ['Verified', 'Rejected', 'Pending'], default: 'Pending' },
  },

  status: {
    type: String,
    enum: ['Pending Verification', 'Pending', 'Approved', 'Rejected'],
    default: 'Pending Verification',
  },
}, { timestamps: true });

// Auto-generate applicationId before save
admissionApplicationSchema.pre('save', async function (next) {
  if (!this.applicationId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationId = `SBBSU${year}${String(count + 1).padStart(3, '0')}`;
  }

  // Auto-set document verification to "Verified" for documents that passed client-side validation
  if (this.isNew) {
    const docs = this.documents || {};
    this.documentVerification = {
      passportPhoto:   docs.passportPhoto   ? 'Verified' : 'Pending',
      aadhaarCard:     docs.aadhaarCard     ? 'Verified' : 'Pending',
      certificate10th: docs.certificate10th ? 'Verified' : 'Pending',
      certificate12th: docs.certificate12th ? 'Verified' : 'Pending',
    };
  }

  next();
});

const AdmissionApplication = mongoose.model('AdmissionApplication', admissionApplicationSchema);
export default AdmissionApplication;
