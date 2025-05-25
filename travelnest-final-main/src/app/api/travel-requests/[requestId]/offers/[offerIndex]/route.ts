// app/api/travel-requests/[requestId]/offers/[offerIndex]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import TravelRequest from '../../../../../models/Request';

export async function PUT(
  req: NextRequest,
  { params }: { params: { requestId: string; offerIndex: string } }
) {
  await connectToDatabase();
  const { action } = await req.json();

  try {
    const request = await TravelRequest.findById(params.requestId);
    if (!request) return NextResponse.json({ message: 'Request not found' }, { status: 404 });

    const offer = request.offers[+params.offerIndex];
    if (!offer) return NextResponse.json({ message: 'Offer not found' }, { status: 404 });

    offer.status = action === 'approve' ? 'approved' : 'denied';
    await request.save();

    return NextResponse.json({ message: 'Offer updated' });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
