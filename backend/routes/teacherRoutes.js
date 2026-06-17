import express from 'express';
import Attendance from '../models/Attendance.js';
import Result from '../models/Result.js';
import StudyMaterial from '../models/StudyMaterial.js';
import Student from '../models/Student.js';
import { protect, teacherOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, teacherOnly);

// ==========================================
// ATTENDANCE
// ==========================================
// Get students for a specific course/semester to mark attendance
router.get('/students', async (req, res) => {
  try {
    const { course, semester } = req.query;
    if (!course || !semester) return res.status(400).json({ message: 'Course and semester required' });
    
    const students = await Student.find({ course, semester, status: 'approved' }).select('studentId fullName rollNumber');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Submit attendance for multiple students
router.post('/attendance', async (req, res) => {
  try {
    const { course, semester, subject, date, records } = req.body;
    // records is an array of { studentId, studentName, status }

    const attendanceRecords = records.map(record => ({
      studentId: record.studentId,
      studentName: record.studentName,
      course,
      semester,
      subject,
      date: new Date(date),
      status: record.status,
      teacherId: req.user.teacherId
    }));

    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// RESULTS
// ==========================================
router.post('/results', async (req, res) => {
  try {
    const { studentId, studentName, course, semester, sgpa, status, subjects } = req.body;

    // Check if result already exists for this student/semester
    const existing = await Result.findOne({ studentId, semester });
    if (existing) {
      return res.status(400).json({ message: 'Result already exists for this student in this semester' });
    }

    const result = await Result.create({
      studentId,
      studentName,
      course,
      semester,
      sgpa,
      status,
      subjects,
      teacherId: req.user.teacherId
    });

    res.status(201).json({ message: 'Result uploaded successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// STUDY MATERIALS
// ==========================================
router.get('/materials', async (req, res) => {
  try {
    // Teacher sees their own uploads
    const materials = await StudyMaterial.find({ teacherId: req.user.teacherId }).sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/materials', async (req, res) => {
  try {
    const { title, description, subject, course, semester, link, type } = req.body;
    
    const material = await StudyMaterial.create({
      title,
      description,
      subject,
      course,
      semester,
      link,
      type,
      teacherId: req.user.teacherId,
      teacherName: req.user.name
    });

    res.status(201).json({ message: 'Study material shared successfully', material });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/materials/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findOne({ _id: req.params.id, teacherId: req.user.teacherId });
    if (!material) return res.status(404).json({ message: 'Material not found or unauthorized' });

    await StudyMaterial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
