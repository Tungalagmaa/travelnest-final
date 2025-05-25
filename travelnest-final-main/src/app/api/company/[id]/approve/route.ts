import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Company from '../../../../models/Company';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();
    await Company.findByIdAndUpdate(params.id, { isApproved: true });
    return NextResponse.json({ message: 'Approved' });
  }
  
