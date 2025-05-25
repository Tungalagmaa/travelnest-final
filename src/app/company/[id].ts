// pages/api/company/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import Company from '../models/Company'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await mongoose.connect(process.env.MONGODB_URI!)

  const { id } = req.query

  if (req.method === 'GET') {
    const company = await Company.findById(req.query.id)
    return res.status(200).json(company)
  }

  if (req.method === 'PUT') {
    const updated = await Company.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).json(updated)
  }

  res.status(405).end()
}
