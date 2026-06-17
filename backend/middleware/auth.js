import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

export const protect = async (req, res, next) => {
  let token;

  console.log('Incoming Authorization Header:', req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Parsed Token:', token);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token Data:', decoded);
      
      let user;
      if (decoded.role === 'Admin') {
        user = await Admin.findById(decoded.id).select('-password');
        console.log('Fetched Admin User:', user ? user.email : 'not found');
      } else if (decoded.role === 'Student') {
        user = await Student.findById(decoded.id).select('-password');
        console.log('Fetched Student User:', user ? user.email : 'not found');
      } else if (decoded.role === 'Teacher') {
        user = await Teacher.findById(decoded.id).select('-password');
        console.log('Fetched Teacher User:', user ? user.email : 'not found');
      }

      if (!user) {
        console.warn('User lookup returned null for id:', decoded.id);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (error) {
      console.error('JWT Verification / Lookup Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.warn('No valid Bearer token provided in headers');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Admin' && req.user.isSuperAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as a super admin' });
  }
};

export const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Teacher') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as a teacher' });
  }
};
