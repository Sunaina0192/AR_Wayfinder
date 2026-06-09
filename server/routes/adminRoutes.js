import express from 'express';
import Student from '../models/Student.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All routes here require Admin JWT
router.use(protect, adminOnly);

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().select('-password').sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

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

// @desc    Edit a student's details
// @route   PUT /api/admin/students/:id
// @access  Private/Admin
router.put('/students/:id', async (req, res) => {
  try {
    const { fullName, fatherName, email, phoneNumber, course, semester, rollNumber, status } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check for duplicate email if changed
    if (email && email !== student.email) {
      const emailExists = await Student.findOne({ email, _id: { $ne: req.params.id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use by another student' });
      }
    }

    // Check for duplicate rollNumber if changed
    if (rollNumber && rollNumber !== student.rollNumber) {
      const rollExists = await Student.findOne({ rollNumber, _id: { $ne: req.params.id } });
      if (rollExists) {
        return res.status(400).json({ message: 'Roll number already in use by another student' });
      }
    }

    // Update fields
    if (fullName) student.fullName = fullName;
    if (fatherName) student.fatherName = fatherName;
    if (email) student.email = email;
    if (phoneNumber) student.phoneNumber = phoneNumber;
    if (course) student.course = course;
    if (semester) student.semester = semester;
    if (rollNumber) student.rollNumber = rollNumber;
    if (status && ['pending', 'approved', 'rejected'].includes(status)) student.status = status;

    await student.save();

    // Return student without password
    const updatedStudent = await Student.findById(req.params.id).select('-password');
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Edit student error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a student
// @route   DELETE /api/admin/students/:id
// @access  Private/Admin
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
