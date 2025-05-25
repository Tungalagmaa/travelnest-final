import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true },
  role: { type: String, enum: ['tourist'], default: 'tourist' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  address: {
    building: { type: String },
    district: { type: String },
    city: { type: String },
  },
});

export default mongoose.models.User || mongoose.model('User', userSchema);
