import express from 'express';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import StudyMaterial from '../models/StudyMaterial.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Only logged in users. We can add studentOnly middleware if needed, 
// but checking req.user.role === 'Student' in the protect middleware or here works.
router.use(protect);

const requireStudent = (req, res, next) => {
  if (req.user && req.user.role === 'Student') next();
  else res.status(403).json({ message: 'Not authorized as student' });
};

router.use(requireStudent);

// ==========================================
// ATTENDANCE
// ==========================================
router.get('/attendance', async (req, res) => {
  try {
    // req.user has the student document from protect middleware
    const records = await Attendance.find({ studentId: req.user.studentId }).sort({ date: -1 });
    
    // Calculate summary
    const total = records.length;
    const present = records.filter(r => r.status === 'Present').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.json({ records, summary: { total, present, percentage } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// RESULTS
// ==========================================
router.get('/results', async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user.studentId }).sort({ semester: 1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// STUDY MATERIALS
// ==========================================
router.get('/materials', async (req, res) => {
  try {
    // Fetch materials matching the student's course and semester
    const materials = await StudyMaterial.find({ 
      course: req.user.course, 
      semester: req.user.semester 
    }).sort({ createdAt: -1 });
    
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// FEES
// ==========================================
import Fee from '../models/Fee.js';

router.get('/fees', async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.user.studentId }).sort({ createdAt: -1 });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
