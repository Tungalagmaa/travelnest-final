// app/api/trips/company/[companyId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Trip from '../../../../models/Trip';

export async function GET(
  req: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    await connectToDatabase();

    const trips = await Trip.find({ companyId: params.companyId }).populate('destinations');

    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    console.error('GET /api/trips/company/[companyId] error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
