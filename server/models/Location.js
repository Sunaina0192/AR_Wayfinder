import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'Facilities' },
  explorerCategory: { type: String, default: 'Facilities' },
  icon: { type: String, default: '01' },
  coordinates: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
