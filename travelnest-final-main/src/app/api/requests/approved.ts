// pages/api/requests/approved.ts
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import Request from '../../models/Request'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.MONGODB_URI!)

  const { companyId } = req.query

  if (req.method === 'GET') {
    const approvedRequests = await Request.find({
      companyId: companyId,
      status: 'Approved',
    })
    return res.status(200).json(approvedRequests)
  }

  res.status(405).end()
}
