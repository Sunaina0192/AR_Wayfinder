import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';
import Teacher from '../models/Teacher.js';
import LoginRecord from '../models/LoginRecord.js';
import UserProfile from '../models/UserProfile.js';

const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendMockEmail = (email, subject, message) => {
  // In a real app, you would use nodemailer here.
  console.log('\n=============================================');
  console.log(`📧 MOCK EMAIL SENT TO: ${email}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`MESSAGE:\n${message}`);
  console.log('=============================================\n');
};

// @desc    Register a new user (Student, Teacher)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { role, password, email } = req.body;

    if (!role || !password || !email) {
      return res.status(400).json({ message: 'Role, email, and password are required' });
    }

    // Check if email exists in ANY collection
    const existsAdmin = await Admin.findOne({ email });
    const existsTeacher = await Teacher.findOne({ email });
    const existsStudent = await Student.findOne({ email });

    if (existsAdmin || existsTeacher || existsStudent) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (role === 'Student') {
      const { fullName, course, semester, rollNumber } = req.body;
      const rollExists = await Student.findOne({ rollNumber });
      if (rollExists) return res.status(400).json({ message: 'Roll number already exists' });

      const student = await Student.create({
        fullName, fatherName: 'N/A', email, phoneNumber: 'N/A', 
        course: course || 'N/A', semester: semester || 'N/A', rollNumber: rollNumber || 'N/A', 
        password, status: 'pending_verification', otp, otpExpires
      });

      sendMockEmail(email, 'Your Verification OTP', `Your OTP to verify your Student account is: ${otp}\nThis OTP is valid for 10 minutes.`);
      return res.status(201).json({ message: 'Registration initiated. Please verify your email via OTP.' });
    }

    if (role === 'Teacher') {
      const { name, department, mobile } = req.body;
      
      const teacher = await Teacher.create({
        name, email, department, mobile, password, status: 'pending_verification',
        qualification: 'N/A', experience: 'N/A', otp, otpExpires
      });

      sendMockEmail(email, 'Your Verification OTP', `Your OTP to verify your Faculty account is: ${otp}\nThis OTP is valid for 10 minutes.`);
      return res.status(201).json({ message: 'Registration initiated. Please verify your email via OTP.' });
    }

    res.status(400).json({ message: 'Invalid role for public registration' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @desc    Verify OTP for account activation
// @route   POST /api/auth/verify-otp
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    let user = null;
    let collectionName = '';

    const student = await Student.findOne({ email });
    if (student) { user = student; collectionName = 'Student'; }
    else {
      const teacher = await Teacher.findOne({ email });
      if (teacher) { user = teacher; collectionName = 'Teacher'; }
      else {
        const admin = await Admin.findOne({ email });
        if (admin) { user = admin; collectionName = 'Admin'; }
      }
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });

    // Mark as verified
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    if (collectionName === 'Student') {
      user.status = 'approved';
      await UserProfile.create({ userId: user.studentId, name: user.fullName, email: user.email, department: user.course, avatar: '' });
    } else if (collectionName === 'Teacher') {
      user.status = 'active';
      await UserProfile.create({ userId: user.teacherId, name: user.name, email: user.email, department: user.department, avatar: '' });
    } else if (collectionName === 'Admin') {
      // Profile might already exist for admins if created via script, but we can ensure it
      const profile = await UserProfile.findOne({ email: user.email });
      if (!profile) await UserProfile.create({ userId: user.email, name: user.name, email: user.email, department: 'Administration', avatar: '' });
    }

    await user.save();

    res.json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    let user = await Student.findOne({ email }) || await Teacher.findOne({ email }) || await Admin.findOne({ email });
    if (!user) return res.status(404).json({ message: 'No account found with this email' });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    sendMockEmail(email, 'Password Reset OTP', `Your OTP for password reset is: ${otp}\nThis OTP is valid for 10 minutes.`);
    res.json({ message: 'Password reset OTP sent to your email.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
});

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ message: 'All fields are required' });

    let user = await Student.findOne({ email }) || await Teacher.findOne({ email }) || await Admin.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (user.otpExpires < new Date()) return res.status(400).json({ message: 'OTP has expired' });

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully! You can now log in.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
});

// @desc    Unified Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Try finding the user in Admin, then Teacher, then Student
    let user = null;
    let role = null;
    let userProfile = null;

    // 1. Check Admin
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.comparePassword(password))) {
      user = admin;
      role = 'Admin';
      userProfile = await UserProfile.findOne({ email }).lean();
      
      await LoginRecord.create({ userId: admin.email, name: admin.name, role, loginTime: new Date() });
      
      return res.json({
        user: {
          id: admin._id,
          name: userProfile?.name || admin.name,
          email: admin.email,
          role,
          isSuperAdmin: admin.isSuperAdmin,
          avatar: userProfile?.avatar || '',
          department: userProfile?.department || 'System Administration'
        },
        token: generateToken(admin._id, role),
      });
    }

    // 2. Check Teacher
    const teacher = await Teacher.findOne({ email });
    if (teacher && (await teacher.comparePassword(password))) {
      if (teacher.status === 'pending_verification') return res.status(401).json({ message: 'Please verify your email via OTP first.' });
      if (teacher.status === 'inactive') return res.status(401).json({ message: 'Account is inactive. Contact admin.' });

      user = teacher;
      role = 'Teacher';
      userProfile = await UserProfile.findOne({ email }).lean();

      await LoginRecord.create({ userId: teacher.teacherId, name: teacher.name, role, loginTime: new Date() });

      return res.json({
        user: {
          id: teacher.teacherId,
          name: userProfile?.name || teacher.name,
          email: teacher.email,
          role,
          avatar: userProfile?.avatar || '',
          department: userProfile?.department || teacher.department,
          mongoId: teacher._id
        },
        token: generateToken(teacher._id, role),
      });
    }

    // 3. Check Student
    const student = await Student.findOne({ email });
    if (student && (await student.comparePassword(password))) {
      if (student.status === 'pending_verification') return res.status(401).json({ message: 'Please verify your email via OTP first.' });
      if (student.status === 'rejected') return res.status(401).json({ message: 'Account rejected. Contact admin.' });

      user = student;
      role = 'Student';
      userProfile = await UserProfile.findOne({ email }).lean();

      await LoginRecord.create({ userId: student.studentId, name: student.fullName, role, loginTime: new Date() });

      return res.json({
        user: {
          id: student.studentId,
          name: userProfile?.name || student.fullName,
          email: student.email,
          role,
          avatar: userProfile?.avatar || '',
          department: userProfile?.department || student.course,
          mongoId: student._id
        },
        token: generateToken(student._id, role),
      });
    }

    // If none matched
    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Get user login records
// @route   GET /api/auth/logins
// @access  Public
router.get('/logins', async (req, res) => {
  const userId = req.query.userId || req.headers['x-user-id'];
  if (!userId) return res.status(400).json({ message: 'userId is required' });
  
  try {
    const logins = await LoginRecord.find({ userId }).sort({ loginTime: -1 }).limit(20).lean();
    return res.json(logins);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load login history' });
  }
});

export default router;
