import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  explanation: String, 
  sideseas: String, 
  region: String, 
})

export default mongoose.models.Destination ||
  mongoose.model('Destination', destinationSchema)
