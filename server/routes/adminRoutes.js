import express from 'express';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Course from '../models/Course.js';
import Department from '../models/Department.js';
import Fee from '../models/Fee.js';
import Notification from '../models/Notification.js';
import AdmissionApplication from '../models/AdmissionApplication.js';
import Attendance from '../models/Attendance.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All routes here require Admin JWT
router.use(protect, adminOnly);

// @desc    ERP dashboard overview
// @route   GET /api/admin/overview
// @access  Private/Admin
router.get('/overview', async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalCourses,
      totalDepartments,
      totalAdmissions,
      pendingFees,
      attendanceRecords,
      notificationCount,
      recentAdmissions,
      recentPayments,
      recentNotifications,
      feeTotals
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Course.countDocuments(),
      Department.countDocuments(),
      AdmissionApplication.countDocuments(),
      Fee.countDocuments({ status: { $in: ['Pending', 'Overdue'] } }),
      Attendance.countDocuments(),
      Notification.countDocuments(),
      AdmissionApplication.find().sort({ createdAt: -1 }).limit(5).select('applicationId fullName course status createdAt'),
      Fee.find({ paidAmount: { $gt: 0 } }).sort({ updatedAt: -1 }).limit(5).select('studentId semester totalAmount paidAmount status updatedAt'),
      Notification.find().sort({ createdAt: -1 }).limit(5).select('title target date createdAt'),
      Fee.aggregate([
        {
          $group: {
            _id: null,
            totalCollection: { $sum: '$paidAmount' },
            pendingAmount: { $sum: { $subtract: ['$totalAmount', '$paidAmount'] } }
          }
        }
      ])
    ]);

    res.json({
      stats: {
        totalStudents,
        totalTeachers,
        totalCourses,
        totalDepartments,
        totalAdmissions,
        totalFeeCollection: feeTotals[0]?.totalCollection || 0,
        pendingFees,
        pendingFeeAmount: feeTotals[0]?.pendingAmount || 0,
        totalHostels: 2,
        notificationsSent: notificationCount,
        attendanceRecords
      },
      recentAdmissions,
      recentPayments,
      recentNotifications
    });
  } catch (error) {
    console.error('Overview error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create notification for students, teachers, departments, or all users
// @route   POST /api/admin/notifications
// @access  Private/Admin
router.post('/notifications', async (req, res) => {
  try {
    const { title, message, target = 'All', targetId = '' } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const notification = await Notification.create({
      title,
      message,
      target,
      targetId,
      createdBy: req.user?._id
    });

    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/fees', async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 }).limit(100);
    res.json(fees);
  } catch (_error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/fees', async (req, res) => {
  try {
    const { studentId, semester, totalAmount, paidAmount = 0, dueDate, status } = req.body;
    if (!studentId || !semester || !totalAmount || !dueDate) {
      return res.status(400).json({ message: 'Student ID, semester, total amount, and due date are required' });
    }

    const fee = await Fee.create({
      studentId,
      semester,
      totalAmount,
      paidAmount,
      dueDate,
      status: status || (Number(paidAmount) >= Number(totalAmount) ? 'Paid' : 'Pending')
    });

    res.status(201).json({ message: 'Fee record created successfully', fee });
  } catch (_error) {
    console.error('Create fee error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().select('-password').sort({ createdAt: -1 });
    res.json(students);
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
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
  } catch (_error) {
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

// ==========================================
// TEACHER MANAGEMENT ROUTES
// ==========================================

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private/Admin
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().select('-password').sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Add a new teacher
// @route   POST /api/admin/teachers
// @access  Private/Admin
router.post('/teachers', async (req, res) => {
  try {
    const { name, department, qualification, experience, mobile, email, salary, subjects, classesAssigned, password } = req.body;

    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher with this email already exists' });
    }

    const teacher = await Teacher.create({
      name,
      department,
      qualification,
      experience,
      mobile,
      email,
      salary,
      subjects: subjects || [],
      classesAssigned: classesAssigned || [],
      password
    });

    const createdTeacher = await Teacher.findById(teacher._id).select('-password');
    res.status(201).json({ message: 'Teacher created successfully', teacher: createdTeacher });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Edit a teacher's details
// @route   PUT /api/admin/teachers/:id
// @access  Private/Admin
router.put('/teachers/:id', async (req, res) => {
  try {
    const { name, department, qualification, experience, mobile, email, salary, subjects, classesAssigned, status } = req.body;

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check for duplicate email if changed
    if (email && email !== teacher.email) {
      const emailExists = await Teacher.findOne({ email, _id: { $ne: req.params.id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use by another teacher' });
      }
    }

    // Update fields
    if (name) teacher.name = name;
    if (department) teacher.department = department;
    if (qualification) teacher.qualification = qualification;
    if (experience) teacher.experience = experience;
    if (mobile) teacher.mobile = mobile;
    if (email) teacher.email = email;
    if (salary !== undefined) teacher.salary = salary;
    if (subjects) teacher.subjects = subjects;
    if (classesAssigned) teacher.classesAssigned = classesAssigned;
    if (status && ['active', 'inactive'].includes(status)) teacher.status = status;

    await teacher.save();

    const updatedTeacher = await Teacher.findById(req.params.id).select('-password');
    res.json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
  } catch (error) {
    console.error('Edit teacher error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a teacher
// @route   DELETE /api/admin/teachers/:id
// @access  Private/Admin
router.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
