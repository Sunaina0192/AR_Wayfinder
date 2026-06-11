import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save the contact message
    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    // Generate a notification for the Admin
    await Notification.create({
      title: 'New Contact Message',
      message: `Message from ${name}: ${subject}`,
      target: 'Admin',
      type: 'info',
      date: new Date(),
    });

    res.status(201).json({ message: 'Message sent successfully!', data: newMessage });
  } catch (error) {
    console.error('Submit contact message error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
// Optionally, this can be added later and protected, but for now we focus on the POST route.
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
