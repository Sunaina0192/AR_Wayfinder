import express from 'express';
import Student from '../models/Student.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All routes here require Admin JWT
router.use(protect, adminOnly);

// @desc    Get all pending students
// @route   GET /api/admin/students/pending
// @access  Private/Admin
router.get('/students/pending', async (req, res) => {
  try {
    const students = await Student.find({ status: 'pending' }).sort({ registrationDate: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Approve or reject a student
// @route   PUT /api/admin/students/:id/status
// @access  Private/Admin
router.put('/students/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.status = status;
    await student.save();
    
    res.json({ message: `Student ${status} successfully`, student });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
