// /app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'

const reviews = [
  {
    id: '1',
    userId: 'u1',
    destinationId: '1',
    rating: 5,
    tripId: '1',
    comment: 'Absolutely loved it!',
    createdAt: new Date().toISOString()
  }
]

// GET all reviews (optionally filter by destinationId or tripId)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const destinationId = searchParams.get('destinationId')
  const tripId = searchParams.get('tripId')

  let filteredReviews = reviews

  if (destinationId) {
    filteredReviews = filteredReviews.filter(r => r.destinationId === destinationId)
  }

  if (tripId) {
    filteredReviews = filteredReviews.filter(r => r.tripId === tripId)
  }

  return NextResponse.json(filteredReviews)
}

// POST new review
export async function POST(req: NextRequest) {
  const body = await req.json()

  const newReview = {
    id: (reviews.length + 1).toString(),
    ...body,
    createdAt: new Date().toISOString()
  }

  reviews.push(newReview)
  return NextResponse.json(newReview, { status: 201 })
}
