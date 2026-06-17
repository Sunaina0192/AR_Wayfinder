import mongoose from 'mongoose'

const navigationHistorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    destinationId: { type: String, required: true, index: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const NavigationHistory = mongoose.model('NavigationHistory', navigationHistorySchema, 'navigationhistories')
export default NavigationHistory
