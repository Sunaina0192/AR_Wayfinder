import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      let user;
      if (decoded.role === 'Admin') {
        user = await Admin.findById(decoded.id).select('-password');
      } else if (decoded.role === 'Student') {
        user = await Student.findById(decoded.id).select('-password');
      } else if (decoded.role === 'Teacher') {
        user = await Teacher.findById(decoded.id).select('-password');
      }

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
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
