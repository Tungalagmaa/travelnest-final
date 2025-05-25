import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Request from '../../models/Request';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newRequest = new Request(body);
    await newRequest.save();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Failed to create request', error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const requests = await Request.find().populate('destination');
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
