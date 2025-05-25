import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Request from '../../../../models/Request';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { offer } = await req.json();
    await connectToDatabase();

    const updatedRequest = await Request.findByIdAndUpdate(
      params.id,
      { $push: { offers: offer } },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    return NextResponse.json({ message: 'Error sending offer' }, { status: 500 });
  }
}
