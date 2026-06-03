import express from 'express';
import { protect } from '../middleware/auth.js';
import Notification from '../models/Notification.js';
import Attendance from '../models/Attendance.js';
import Fee from '../models/Fee.js';
import Result from '../models/Result.js';
import Course from '../models/Course.js';

const router = express.Router();

// Apply protection to all these routes
router.use(protect);

// Notifications
router.get('/notifications', async (req, res) => {
  try {
    // For students, fetch 'All' or specific to them
    // For admin, fetch all
    let query = {};
    if (req.user.role === 'Student') {
      query = { $or: [{ target: 'All' }, { target: 'Student', targetId: req.user.studentId }] };
    }
    const notifications = await Notification.find(query).sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching notifications' });
  }
});

// Attendance
router.get('/attendance', async (req, res) => {
  try {
    const studentId = req.user.role === 'Student' ? req.user._id : req.query.studentId;
    if (!studentId) return res.status(400).json({ message: 'Student ID required' });
    
    const attendance = await Attendance.find({ studentId }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching attendance' });
  }
});

// Fees
router.get('/fees', async (req, res) => {
  try {
    const studentId = req.user.role === 'Student' ? req.user._id : req.query.studentId;
    const fees = await Fee.find({ studentId }).sort({ dueDate: -1 });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching fees' });
  }
});

// Results
router.get('/results', async (req, res) => {
  try {
    const studentId = req.user.role === 'Student' ? req.user._id : req.query.studentId;
    const results = await Result.find({ studentId }).sort({ semester: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching results' });
  }
});

// Courses
router.get('/courses', async (req, res) => {
  try {
    // Basic course catalog for now
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching courses' });
  }
});

export default router;
