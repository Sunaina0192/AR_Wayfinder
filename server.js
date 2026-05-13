import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import NavigationHistory from './server/models/NavigationHistory.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGODB_URI
if (!mongoUri) {
  console.error('Missing MONGODB_URI in environment variables.')
  process.exit(1)
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

app.get('/api/history', async (req, res) => {
  try {
    const history = await NavigationHistory.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    res.json(history.map((item) => ({
      id: item._id,
      destinationId: item.destinationId,
      name: item.name,
      createdAt: item.createdAt,
    })))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to load navigation history.' })
  }
})

app.post('/api/history', async (req, res) => {
  const { destinationId, name } = req.body
  if (!destinationId || !name) {
    return res.status(400).json({ message: 'destinationId and name are required.' })
  }

  try {
    const existing = await NavigationHistory.findOne({ destinationId })
    if (existing) {
      existing.name = name
      existing.createdAt = new Date()
      await existing.save()
    } else {
      await NavigationHistory.create({ destinationId, name })
    }

    const history = await NavigationHistory.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    res.status(201).json(history.map((item) => ({
      id: item._id,
      destinationId: item.destinationId,
      name: item.name,
      createdAt: item.createdAt,
    })))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to save route history.' })
  }
})

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found.' })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
