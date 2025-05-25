// /app/api/reviews/[review_id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

const reviews = [
  {
    id: '1',
    userId: 'u1',
    destinationId: '1',
    rating: 5,
    comment: 'Absolutely loved it!',
    createdAt: new Date().toISOString()
  }
]

// GET review by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { review_id: string } }
) {
  const review = reviews.find(r => r.id === params.review_id)
  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json(review)
}

// UPDATE review
export async function PUT(
  req: NextRequest,
  { params }: { params: { review_id: string } }
) {
  const index = reviews.findIndex(r => r.id === params.review_id)
  if (index === -1) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  const updatedData = await req.json()
  reviews[index] = { ...reviews[index], ...updatedData }

  return NextResponse.json(reviews[index])
}

// DELETE review
export async function DELETE(
  req: NextRequest,
  { params }: { params: { review_id: string } }
) {
  const index = reviews.findIndex(r => r.id === params.review_id)
  if (index === -1) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  const deleted = reviews.splice(index, 1)
  return NextResponse.json({ deleted })
}
