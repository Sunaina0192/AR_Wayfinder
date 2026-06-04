import express from 'express';
import AdmissionApplication from '../models/AdmissionApplication.js';
import Student from '../models/Student.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// ─── Public Routes ─────────────────────────────────────────────────────────

// @route   POST /api/admissions/apply
// @desc    Submit new admission application
// @access  Public
router.post('/apply', async (req, res) => {
  try {
    const application = await AdmissionApplication.create(req.body);
    res.status(201).json({
      message: 'Application submitted successfully!',
      applicationId: application.applicationId,
      application,
    });
  } catch (error) {
    console.error('Admission application error:', error);
    res.status(500).json({ message: 'Failed to submit application. Please try again.' });
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
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   PUT /api/admissions/:id/status
// @desc    Approve or reject an admission application
// @access  Private/Admin
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be Approved or Rejected.' });
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
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
