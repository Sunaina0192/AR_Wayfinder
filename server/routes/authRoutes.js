import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import Teacher from '../models/Teacher.js';
import LoginRecord from '../models/LoginRecord.js';
import UserProfile from '../models/UserProfile.js';

const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (Student, Teacher, Admin)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { role, password, email } = req.body;

    if (!role || !password || !email) {
      return res.status(400).json({ message: 'Role, email, and password are required' });
    }

    if (role === 'Student') {
      const { fullName, fatherName, phoneNumber, course, semester, rollNumber } = req.body;
      const studentExists = await Student.findOne({ $or: [{ email }, { rollNumber }] });
      if (studentExists) return res.status(400).json({ message: 'Student with this email or roll number already exists' });

      const student = await Student.create({
        fullName, fatherName: fatherName || 'N/A', email, phoneNumber: phoneNumber || 'N/A', 
        course: course || 'N/A', semester: semester || 'N/A', rollNumber, password, status: 'approved'
      });

      if (student) {
        await UserProfile.create({ userId: student.studentId, name: student.fullName, email: student.email, department: student.course, avatar: '' });
        return res.status(201).json({ message: 'Student registered successfully', user: { id: student.studentId, name: student.fullName, email: student.email, role: 'Student' }, token: generateToken(student._id, 'Student') });
      }
    }

    if (role === 'Teacher') {
      const { name, department, mobile } = req.body;
      const teacherExists = await Teacher.findOne({ email });
      if (teacherExists) return res.status(400).json({ message: 'Teacher with this email already exists' });

      const count = await Teacher.countDocuments();
      const teacherId = `TCH${new Date().getFullYear().toString().slice(-2)}${String(count + 1).padStart(3, '0')}`;

      const teacher = await Teacher.create({
        teacherId, name, email, department, mobile, password, status: 'active'
      });

      if (teacher) {
        await UserProfile.create({ userId: teacher.teacherId, name: teacher.name, email: teacher.email, department: teacher.department, avatar: '' });
        return res.status(201).json({ message: 'Teacher registered successfully', user: { id: teacher.teacherId, name: teacher.name, email: teacher.email, role: 'Teacher' }, token: generateToken(teacher._id, 'Teacher') });
      }
    }

    if (role === 'Admin') {
      const { name } = req.body;
      const adminExists = await Admin.findOne({ email });
      if (adminExists) return res.status(400).json({ message: 'Admin with this email already exists' });

      const admin = await Admin.create({ name, email, password, isSuperAdmin: false });

      if (admin) {
        await UserProfile.create({ userId: admin.email, name: admin.name, email: admin.email, department: 'Administration', avatar: '' });
        return res.status(201).json({ message: 'Admin registered successfully', user: { id: admin._id, name: admin.name, email: admin.email, role: 'Admin' }, token: generateToken(admin._id, 'Admin') });
      }
    }

    res.status(400).json({ message: 'Invalid registration data' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { role, userId, password, name, purpose } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    // Visitor Login (No Auth Required)
    if (role === 'Visitor') {
      const finalName = name || 'Guest Visitor';
      const finalUserId = 'VISITOR_' + finalName.trim().replace(/\s+/g, '_').toUpperCase();
      
      const visitorData = {
        role,
        name: finalName,
        id: finalUserId,
        email: `${finalName.toLowerCase().replace(/\s+/g, '.')}@visitor.com`
      };

      await LoginRecord.create({
        userId: finalUserId,
        name: finalName,
        role,
        purpose: purpose || 'Visit',
        loginTime: new Date()
      });

      return res.json({ user: visitorData, token: null });
    }

    // Admin Login
    if (role === 'Admin') {
      const admin = await Admin.findOne({ email: userId }); // assuming userId is email for admin
      if (admin && (await admin.comparePassword(password))) {
        
        await LoginRecord.create({
          userId: admin.email,
          name: admin.name,
          role: 'Admin',
          loginTime: new Date()
        });

        const userProfile = await UserProfile.findOne({ userId: admin.email }).lean();

        return res.json({
          user: {
            id: admin._id,
            name: userProfile?.name || admin.name,
            email: userProfile?.email || admin.email,
            role: 'Admin',
            isSuperAdmin: admin.isSuperAdmin,
            avatar: userProfile?.avatar || '',
            department: userProfile?.department || 'System Administration'
          },
          token: generateToken(admin._id, 'Admin'),
        });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    // Teacher Login
    if (role === 'Teacher') {
      const teacher = await Teacher.findOne({ teacherId: userId });
      if (!teacher) {
        return res.status(401).json({ message: 'Invalid Teacher ID' });
      }

      if (await teacher.comparePassword(password)) {
        if (teacher.status === 'inactive') {
          return res.status(401).json({ message: 'Account is inactive. Please contact administration.' });
        }

        await LoginRecord.create({
          userId: teacher.teacherId,
          name: teacher.name,
          role: 'Teacher',
          loginTime: new Date()
        });

        const userProfile = await UserProfile.findOne({ userId: teacher.teacherId }).lean();

        return res.json({
          user: {
            id: teacher.teacherId,
            name: userProfile?.name || teacher.name,
            email: userProfile?.email || teacher.email,
            role: 'Teacher',
            avatar: userProfile?.avatar || '',
            department: userProfile?.department || teacher.department,
            mongoId: teacher._id
          },
          token: generateToken(teacher._id, 'Teacher'),
        });
      } else {
        return res.status(401).json({ message: 'Invalid Teacher ID or password' });
      }
    }

    // Student Login
    if (role === 'Student') {
      const student = await Student.findOne({ studentId: userId });
      if (!student) {
        return res.status(401).json({ message: 'Invalid Student ID' });
      }

      if (await student.comparePassword(password)) {
        if (student.status === 'pending') {
          return res.status(401).json({ message: 'Account is pending approval by an admin.' });
        }
        if (student.status === 'rejected') {
          return res.status(401).json({ message: 'Account has been rejected. Please contact administration.' });
        }

        await LoginRecord.create({
          userId: student.studentId,
          name: student.fullName,
          role: 'Student',
          loginTime: new Date()
        });

        const userProfile = await UserProfile.findOne({ userId: student.studentId }).lean();

        return res.json({
          user: {
            id: student.studentId,
            name: userProfile?.name || student.fullName,
            email: userProfile?.email || student.email,
            role: 'Student',
            avatar: userProfile?.avatar || '',
            department: userProfile?.department || student.course,
            mongoId: student._id
          },
          token: generateToken(student._id, 'Student'),
        });
      } else {
        return res.status(401).json({ message: 'Invalid Student ID or password' });
      }
    }

    return res.status(400).json({ message: 'Invalid role' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Get user login records
// @route   GET /api/auth/logins
// @access  Public (for backward compatibility, ideally protected)
router.get('/logins', async (req, res) => {
  const userId = req.query.userId || req.headers['x-user-id'];
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }
  try {
    const logins = await LoginRecord.find({ userId }).sort({ loginTime: -1 }).limit(20).lean();
    return res.json(logins);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load login history' });
  }
});

export default router;
