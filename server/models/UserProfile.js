import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    lastLogin: { type: Date },
    isOnline: { type: Boolean, default: false },
    department: { type: String },
  },
  {
    timestamps: true,
  }
)

const UserProfile = mongoose.model('UserProfile', userProfileSchema, 'userprofiles')
export default UserProfile
