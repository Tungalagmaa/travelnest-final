// app/api/trips/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '../../models/Trip';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // Жишээ: companyId-г өгөгдөлд байршуулах хэрэгтэй
    if (!data.companyId) {
      return NextResponse.json({ message: 'Company ID is required' }, { status: 400 });
    }

    const newTrip = new Trip(data);
    await newTrip.save();

    return NextResponse.json({ message: 'Trip created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create trip' }, { status: 500 });
  }
}
