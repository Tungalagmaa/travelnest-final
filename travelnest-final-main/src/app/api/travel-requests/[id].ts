import { NextApiRequest, NextApiResponse } from 'next';
import travelRequests from '../../../data/travelRequests.json';  // Adjust as needed

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const request = travelRequests.find((r) => r.id === parseInt(id as string));
    if (!request) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(request);
  } else if (req.method === 'PUT') {
    // Handle updating the travel request
    const updatedRequest = req.body;
    // Add logic to update the request
    res.status(200).json({ message: 'Travel request updated', data: updatedRequest });
  } else if (req.method === 'DELETE') {
    // Handle deleting the travel request
    // Add logic to delete the request
    res.status(200).json({ message: 'Travel request deleted' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
