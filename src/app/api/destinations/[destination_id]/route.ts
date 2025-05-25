// /app/api/destinations/[destination_id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import destinations from '../../../../data/destination.json'; // Adjust the path if necessary

export async function GET(
  req: NextRequest,
  { params }: { params: { destination_id: string } }
) {
  const destination = destinations.find(d => d.id === params.destination_id);
  if (!destination) {
    return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
  }
  return NextResponse.json(destination);
}
