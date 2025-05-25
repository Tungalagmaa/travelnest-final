import connectToDatabase from '@/lib/mongodb';
import Request from '../../../../models/Request';
import Destination from '../../../../models/Destinations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  await connectToDatabase();

  const requests = await Request.find({ userId: params.userId });

  // Destination нэрсийг татах
  const allDestinations = await Destination.find();
  const idNameMap: Record<string, string> = {};
  allDestinations.forEach(dest => {
    idNameMap[dest._id.toString()] = dest.name;
  });

  // destination ID-нуудыг нэр болгон хувиргах
  const formattedRequests = requests.map(r => ({
    ...r.toObject(),
    destinationNames: r.destination.map((id: string) => idNameMap[id] || 'Unknown'),
  }));

  return NextResponse.json(formattedRequests);
}
