// models/Request.ts
import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  companyId: String,
  companyName: String,
  phone: String,
  price: String,
  additionalInfo: String,
}, { _id: false });

const RequestSchema = new mongoose.Schema({
  destination: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  startDate: String, 
  endDate: String,
  description: String,
  status: { type: String, default: 'Uploaded' },
  userId: String,
  offers: [OfferSchema],
});

export default mongoose.models.Request || mongoose.model('Request', RequestSchema);
