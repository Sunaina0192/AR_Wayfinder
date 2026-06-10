/* eslint no-undef: "off" */
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import NavigationHistory from './server/models/NavigationHistory.js'
import UserProfile from './server/models/UserProfile.js'
import authRoutes from './server/routes/authRoutes.js'
import adminRoutes from './server/routes/adminRoutes.js'
import dataRoutes from './server/routes/dataRoutes.js'
import admissionRoutes from './server/routes/admissionRoutes.js'
import academicRoutes from './server/routes/academicRoutes.js'
import teacherRoutes from './server/routes/teacherRoutes.js'
import studentRoutes from './server/routes/studentRoutes.js'
import uploadRoutes from './server/routes/uploadRoutes.js'
import resultRoutes from './server/routes/resultRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DB_FILE = path.join(__dirname, 'history_db.json')
const PROFILES_FILE = path.join(__dirname, 'profiles_db.json')
const LOGIN_FILE = path.join(__dirname, 'login_db.json')

const app = express()

app.use(cors())
// Increase JSON body size to allow base64-encoded images in form submissions
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Set global mongoose options to fail fast instead of buffering
mongoose.set('bufferCommands', false)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30 seconds
})
  .then(() => {
    console.log('MongoDB Atlas connected')
  })
  .catch((error) => {
    console.warn('MongoDB connection error (will fallback to local JSON database):', error.message)
  })

// Helpers for file-based database fallback
const getLocalHistory = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return []
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(data || '[]')
  } catch (err) {
    console.error('Error reading local history db:', err)
    return []
  }
}

const saveLocalHistory = (history) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(history, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing local history db:', err)
  }
}

const getLocalProfiles = () => {
  try {
    if (!fs.existsSync(PROFILES_FILE)) {
      return {}
    }
    const data = fs.readFileSync(PROFILES_FILE, 'utf-8')
    return JSON.parse(data || '{}')
  } catch (err) {
    console.error('Error reading local profiles db:', err)
    return {}
  }
}

const saveLocalProfiles = (profiles) => {
  try {
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing local profiles db:', err)
  }
}

const getLocalLogins = () => {
  try {
    if (!fs.existsSync(LOGIN_FILE)) {
      return []
    }
    const data = fs.readFileSync(LOGIN_FILE, 'utf-8')
    return JSON.parse(data || '[]')
  } catch (err) {
    console.error('Error reading local logins db:', err)
    return []
  }
}

const saveLocalLogins = (logins) => {
  try {
    fs.writeFileSync(LOGIN_FILE, JSON.stringify(logins, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing local logins db:', err)
  }
}

// Serve frontend files from 'dist' directory if they exist
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')))
}

// Serve uploaded documents statically
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Get History
app.get('/api/history', async (req, res) => {
  const userId = req.query.userId || req.headers['x-user-id']

  if (!userId) {
    return res.status(400).json({
      message: 'userId is required to load navigation history.',
    })
  }

  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const history = await NavigationHistory.find({ userId })
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()

        return res.json(
          history.map((item) => ({
            id: item._id,
            destinationId: item.destinationId,
            name: item.name,
            createdAt: item.createdAt,
          }))
        )
      } catch (dbError) {
        console.error('Mongoose query failed, falling back to local file storage:', dbError.message)
      }
    }

    // Fallback to local history
    const localHistory = getLocalHistory()
    const filteredHistory = localHistory
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)

    res.json(filteredHistory)
  } catch (error) {
    console.error('Failed to load navigation history:', error)
    res.status(500).json({
      message: 'Failed to load navigation history.',
    })
  }
})

// Save History
app.post('/api/history', async (req, res) => {
  const { destinationId, name } = req.body
  const userId = req.body.userId || req.query.userId || req.headers['x-user-id']

  if (!userId) {
    return res.status(400).json({
      message: 'userId is required to save navigation history.',
    })
  }

  if (!destinationId || !name) {
    return res.status(400).json({
      message: 'destinationId and name are required.',
    })
  }

  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const existing = await NavigationHistory.findOne({
          userId,
          destinationId,
        })

        if (existing) {
          existing.name = name
          existing.createdAt = new Date()

          await existing.save()
        } else {
          await NavigationHistory.create({
            userId,
            destinationId,
            name,
          })
        }

        const history = await NavigationHistory.find({ userId })
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()

        return res.status(201).json(
          history.map((item) => ({
            id: item._id,
            destinationId: item.destinationId,
            name: item.name,
            createdAt: item.createdAt,
          }))
        )
      } catch (dbError) {
        console.error('Mongoose write failed, falling back to local file storage:', dbError.message)
      }
    }

    // Fallback to local history
    let localHistory = getLocalHistory()
    const existingIndex = localHistory.findIndex(
      (item) => item.userId === userId && item.destinationId === destinationId
    )
    if (existingIndex > -1) {
      localHistory[existingIndex].name = name
      localHistory[existingIndex].createdAt = new Date().toISOString()
    } else {
      localHistory.push({
        id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId,
        destinationId,
        name,
        createdAt: new Date().toISOString(),
      })
    }

    saveLocalHistory(localHistory)

    const userHistory = localHistory
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)

    res.status(201).json(userHistory)
  } catch (error) {
    console.error('Failed to save route history:', error)

    res.status(500).json({
      message: 'Failed to save route history.',
    })
  }
})

// Get Profile
app.get('/api/profile', async (req, res) => {
  const userId = req.query.userId || req.headers['x-user-id']

  if (!userId) {
    return res.status(400).json({
      message: 'userId is required to load profile settings.',
    })
  }

  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const profile = await UserProfile.findOne({ userId }).lean()
        if (profile) {
          return res.json(profile)
        }
      } catch (dbError) {
        console.error('Mongoose profile query failed, falling back to local file storage:', dbError.message)
      }
    }

    // Fallback to local profile database
    const localProfiles = getLocalProfiles()
    const profile = localProfiles[userId]
    if (profile) {
      return res.json(profile)
    }

    return res.status(404).json({ message: 'Profile not found.' })
  } catch (error) {
    console.error('Failed to load user profile:', error)
    res.status(500).json({
      message: 'Failed to load user profile.',
    })
  }
})

// Save Profile
app.post('/api/profile', async (req, res) => {
  const { name, email, avatar, department } = req.body
  const userId = req.body.userId || req.query.userId || req.headers['x-user-id']

  if (!userId) {
    return res.status(400).json({
      message: 'userId is required to save profile settings.',
    })
  }

  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const profile = await UserProfile.findOneAndUpdate(
          { userId },
          { name, email, avatar, department },
          { new: true, upsert: true }
        ).lean()
        return res.status(200).json(profile)
      } catch (dbError) {
        console.error('Mongoose profile write failed, falling back to local file storage:', dbError.message)
      }
    }

    // Fallback to local profile database
    let localProfiles = getLocalProfiles()
    localProfiles[userId] = {
      userId,
      name,
      email,
      avatar,
      department,
      updatedAt: new Date().toISOString()
    }
    saveLocalProfiles(localProfiles)

    res.status(200).json(localProfiles[userId])
  } catch (error) {
    console.error('Failed to save user profile:', error)
    res.status(500).json({
      message: 'Failed to save user profile.',
    })
  }
})

// Mount new modular routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/data', dataRoutes)
app.use('/api/admissions', admissionRoutes)
app.use('/api/academic', academicRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/results', resultRoutes)

// API 404 Route
app.use('/api', (req, res) => {
  res.status(404).json({
    message: 'API route not found.',
  })
})

// Catch-all to serve the React App if dist exists
app.get('*', (req, res) => {
  if (fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    res.status(404).send('Backend Running (Frontend not built)')
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})