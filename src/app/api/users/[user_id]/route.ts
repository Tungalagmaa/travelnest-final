// app/api/users/[userId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '../../../models/User';

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const userId = pathSegments[pathSegments.length - 1]; // сүүлийн segment

    const updatedUser = await User.findOneAndUpdate({ userId }, body, { new: true });
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
  
}
