import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Destination from '../../models/Destinations';

export async function GET() {
  try {
    await connectToDatabase();
    const destinations = await Destination.find();
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch destinations' }, { status: 500 });
  }
}
