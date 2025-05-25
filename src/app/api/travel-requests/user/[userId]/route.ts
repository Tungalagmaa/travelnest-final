// app/api/travel-requests/user/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import TravelRequest from '../../../../models/Request';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await connectToDatabase();

  try {
    const requests = await TravelRequest.find({ userId: params.userId });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ message: 'Error loading requests' }, { status: 500 });
  }
}
