import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  tripName: { type: String, required: true },
  groupSize: String,
  duration: String,
  direction: String,
  reason: String,
  price: String,
  province: String,
  destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  url: String,
  photos: [String],
});

export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);
