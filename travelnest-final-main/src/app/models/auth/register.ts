import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import mongoose from 'mongoose';

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect('mongodb://localhost:27017/travelnest');
};

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Connect to DB
    await connectToDB();

    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, 'your-jwt-secret', { expiresIn: '1d' });

      res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
