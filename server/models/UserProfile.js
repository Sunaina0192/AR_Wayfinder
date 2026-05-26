import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    department: { type: String },
  },
  {
    timestamps: true,
  }
)

const UserProfile = mongoose.model('UserProfile', userProfileSchema)
export default UserProfile
