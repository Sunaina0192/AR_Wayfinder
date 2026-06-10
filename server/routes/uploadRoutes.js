import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect, adminOnly } from '../middleware/auth.js';
import Document from '../models/Document.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @desc    Upload a new document
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, adminOnly, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, type } = req.body;
    
    // Create URL path to be served statically
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Calculate size in KB/MB
    const sizeInBytes = req.file.size;
    const size = sizeInBytes > 1024 * 1024 
      ? `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB` 
      : `${Math.round(sizeInBytes / 1024)} KB`;

    const newDoc = await Document.create({
      title: title || req.file.originalname,
      description: description || '',
      fileUrl,
      type: type || 'Other',
      uploadedBy: req.user.name,
      size
    });

    res.status(201).json(newDoc);
  } catch (error) {
    console.error('File Upload Error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// @desc    Get all documents
// @route   GET /api/upload
// @access  Public
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find({}).sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching documents' });
  }
});

// @desc    Delete a document
// @route   DELETE /api/upload/:id
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Attempt to delete physical file
    const filePath = path.join(process.cwd(), doc.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document removed' });
  } catch (error) {
    console.error('Delete Document Error:', error);
    res.status(500).json({ message: 'Server error deleting document' });
  }
});

export default router;
