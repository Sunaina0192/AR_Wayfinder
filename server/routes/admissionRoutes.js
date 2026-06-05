import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmissionApplication from '../models/AdmissionApplication.js';
import Student from '../models/Student.js';
import { protect, adminOnly } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMISSIONS_FILE = path.join(__dirname, '../../admissions_db.json');

const router = express.Router();

const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email);
const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);
const isValidDocumentBase64 = (doc) => typeof doc === 'string' && doc.startsWith('data:image/');

// ─── JSON File Database Helpers ─────────────────────────────────────────────
const getLocalAdmissions = () => {
  try {
    if (!fs.existsSync(ADMISSIONS_FILE)) return [];
    const data = fs.readFileSync(ADMISSIONS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading local admissions db:', err);
    return [];
  }
};

const saveLocalAdmissions = (admissions) => {
  try {
    fs.writeFileSync(ADMISSIONS_FILE, JSON.stringify(admissions, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local admissions db:', err);
  }
};

const generateApplicationId = (admissions) => {
  const year = new Date().getFullYear();
  const count = admissions.length + 1;
  return `SBBSU${year}${String(count).padStart(3, '0')}`;
};

// ─── Public Routes ─────────────────────────────────────────────────────────

// @route   POST /api/admissions/apply
// @desc    Submit new admission application
// @access  Public
router.post('/apply', async (req, res) => {
  try {
    const {
      fullName, fatherName, motherName, dob, gender, mobile, email,
      state, district, city, address,
      marks10, marks12, prevQualification, course,
      documents,
    } = req.body;

    const missingFields = [];

    if (!fullName?.trim()) missingFields.push('fullName');
    if (!fatherName?.trim()) missingFields.push('fatherName');
    if (!motherName?.trim()) missingFields.push('motherName');
    if (!dob) missingFields.push('dob');
    if (!gender) missingFields.push('gender');
    if (!mobile || !isValidMobile(mobile)) missingFields.push('mobile');
    if (!email || !isValidGmail(email)) missingFields.push('email');
    if (!state?.trim()) missingFields.push('state');
    if (!district?.trim()) missingFields.push('district');
    if (!city?.trim()) missingFields.push('city');
    if (!address?.trim()) missingFields.push('address');
    if (!marks10?.trim()) missingFields.push('marks10');
    if (!marks12?.trim()) missingFields.push('marks12');
    if (!prevQualification?.trim()) missingFields.push('prevQualification');
    if (!course) missingFields.push('course');

    if (!documents || typeof documents !== 'object') {
      return res.status(400).json({ message: 'All documents are required and must be uploaded.' });
    }

    const invalidDocument = [];
    if (!isValidDocumentBase64(documents.passportPhoto)) invalidDocument.push('passportPhoto');
    if (!isValidDocumentBase64(documents.aadhaarCard)) invalidDocument.push('aadhaarCard');
    if (!isValidDocumentBase64(documents.certificate10th)) invalidDocument.push('certificate10th');
    if (!isValidDocumentBase64(documents.certificate12th)) invalidDocument.push('certificate12th');

    if (missingFields.length > 0) {
      return res.status(400).json({ message: 'Please complete all required fields.', missingFields });
    }
    if (invalidDocument.length > 0) {
      return res.status(400).json({ message: 'Uploaded documents must be valid image files.', invalidDocuments: invalidDocument });
    }

    const applicationData = {
      fullName: fullName.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      dob,
      gender,
      mobile,
      email: email.trim(),
      state: state.trim(),
      district: district.trim(),
      city: city.trim(),
      address: address.trim(),
      marks10: marks10.trim(),
      marks12: marks12.trim(),
      prevQualification: prevQualification.trim(),
      course,
      documents: {
        passportPhoto: documents.passportPhoto,
        aadhaarCard: documents.aadhaarCard,
        certificate10th: documents.certificate10th,
        certificate12th: documents.certificate12th,
      },
      status: 'Pending Verification',
    };

    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
      try {
        const application = await AdmissionApplication.create(applicationData);
        return res.status(201).json({
          message: 'Application submitted successfully!',
          applicationId: application.applicationId,
          application,
          savedTo: 'MongoDB',
        });
      } catch (mongoError) {
        console.error('MongoDB write failed, falling back to local file storage:', mongoError.message);
      }
    }

    // Fallback to local JSON file
    console.log('MongoDB not available, using local file storage for admission application');
    const localAdmissions = getLocalAdmissions();
    const applicationId = generateApplicationId(localAdmissions);
    const applicationWithId = { ...applicationData, applicationId, createdAt: new Date().toISOString() };
    localAdmissions.push(applicationWithId);
    saveLocalAdmissions(localAdmissions);

    res.status(201).json({
      message: 'Application submitted successfully!',
      applicationId,
      application: applicationWithId,
      savedTo: 'Local Storage (JSON)',
    });
  } catch (error) {
    console.error('Admission application error:', error.message || error);
    res.status(500).json({ message: 'Failed to submit application. Please try again.', error: error.message });
  }
});

// @route   GET /api/admissions/status/:applicationId
// @desc    Get status of an application by applicationId
// @access  Public
router.get('/status/:applicationId', async (req, res) => {
  try {
    const app = await AdmissionApplication.findOne({ applicationId: req.params.applicationId }).lean();
    if (!app) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    res.json(app);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ─── Admin Routes ───────────────────────────────────────────────────────────

// @route   GET /api/admissions
// @desc    Get all admission applications
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const applications = await AdmissionApplication.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(applications);
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   PUT /api/admissions/:id/status
// @desc    Approve or reject an admission application
// @access  Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected', 'Pending', 'Pending Verification'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const application = await AdmissionApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.json({ message: `Application ${status} successfully.`, application });
  } catch {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
