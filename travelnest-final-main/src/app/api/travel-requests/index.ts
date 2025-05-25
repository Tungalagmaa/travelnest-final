import { NextApiRequest, NextApiResponse } from 'next';
import travelRequests from '../../../data/travelRequests.json';  // Adjust as needed

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all travel requests
    res.status(200).json(travelRequests);
  } else if (req.method === 'POST') {
    // Create a new travel request (you might need to add logic for saving data)
    const newRequest = req.body;
    // Add logic to save the new request
    res.status(201).json({ message: 'Travel request created', data: newRequest });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
