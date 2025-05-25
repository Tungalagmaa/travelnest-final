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
    const { email, password } = req.body;

    // Connect to DB
    await connectToDB();

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '1d' });

      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
