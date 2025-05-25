import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Request from '../../../models/Request'; // замыг зөв тохируул

// POST: Шинэ хүсэлт үүсгэх
export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const data = await req.json();
    const newRequest = new Request(data);
    await newRequest.save();

    return NextResponse.json(newRequest, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Error creating request', error: err.message },
      { status: 500 }
    );
  }
}
