import express from 'express';
import Department from '../models/Department.js';
import Course from '../models/Course.js';
import Subject from '../models/Subject.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes for fetching (students/visitors might need to see courses/departments)
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().sort({ name: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ course: 1, semester: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Admin ONLY routes for CRUD
router.use(protect, adminOnly);

// ==========================================
// DEPARTMENT MANAGEMENT
// ==========================================
router.post('/departments', async (req, res) => {
  try {
    const { name, code, description, hod } = req.body;
    const exists = await Department.findOne({ $or: [{ name }, { code }] });
    if (exists) return res.status(400).json({ message: 'Department name or code already exists' });
    
    const department = await Department.create({ name, code, description, hod });
    res.status(201).json({ message: 'Department created', department });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/departments/:id', async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department updated', department });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// COURSE MANAGEMENT
// ==========================================
router.post('/courses', async (req, res) => {
  try {
    const { name, courseCode, department, credits, description } = req.body;
    const exists = await Course.findOne({ courseCode });
    if (exists) return res.status(400).json({ message: 'Course code already exists' });

    const course = await Course.create({ name, courseCode, department, credits, description });
    res.status(201).json({ message: 'Course created', course });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course updated', course });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// ==========================================
// SUBJECT MANAGEMENT
// ==========================================
router.post('/subjects', async (req, res) => {
  try {
    const { name, subjectCode, course, semester, credits, type } = req.body;
    const exists = await Subject.findOne({ subjectCode });
    if (exists) return res.status(400).json({ message: 'Subject code already exists' });

    const subject = await Subject.create({ name, subjectCode, course, semester, credits, type });
    res.status(201).json({ message: 'Subject created', subject });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/subjects/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json({ message: 'Subject updated', subject });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/subjects/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
