import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Result from '../models/Result.js';

const router = express.Router();

// @desc    Get all results
// @route   GET /api/results
// @access  Private/Admin
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const results = await Result.find({}).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching results' });
  }
});

// @desc    Create a result
// @route   POST /api/results
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { studentId, studentName, course, semester, sgpa, status, subjects } = req.body;
    
    const result = await Result.create({
      studentId,
      studentName,
      course,
      semester,
      teacherId: req.user._id, // Admin creating it
      sgpa,
      status,
      subjects: subjects || []
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Create Result Error:', error);
    res.status(500).json({ message: 'Server error creating result' });
  }
});

// @desc    Update a result
// @route   PUT /api/results/:id
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating result' });
  }
});

// @desc    Delete a result
// @route   DELETE /api/results/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ message: 'Result deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting result' });
  }
});

export default router;
