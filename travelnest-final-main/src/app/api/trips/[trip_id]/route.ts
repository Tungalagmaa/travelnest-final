// /app/api/trips/[trip_id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '../../../models/Trip';

export async function GET(
  req: NextRequest,
  { params }: { params: { trip_id: string } }
) {
  try {
    await connectToDatabase();
    const trip = await Trip.findById(params.trip_id).populate('destinations');

    if (!trip) {
      return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json(trip);
  } catch (error) {
    console.error('GET trip error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { trip_id: string } }
) {
  try {
    const updatedData = await req.json();
    await connectToDatabase();

    const updatedTrip = await Trip.findByIdAndUpdate(
      params.trip_id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTrip);
  } catch (error) {
    console.error('PUT trip error:', error);
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { trip_id: string } }
) {
  try {
    await connectToDatabase();
    const deleted = await Trip.findByIdAndDelete(params.trip_id);

    if (!deleted) {
      return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Trip deleted' });
  } catch (error) {
    console.error('DELETE trip error:', error);
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
