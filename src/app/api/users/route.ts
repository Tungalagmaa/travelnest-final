// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import  User  from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Имэйл болон нууц үг шаардлагатай' }, { status: 400 });
    }

    await connectToDatabase();

    // Шалгах: хэрэглэгч бүртгэлтэй эсэх
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Энэ имэйл аль хэдийн бүртгэлтэй байна' }, { status: 409 });
    }

    // Нууц үг хашлах
    const hashedPassword = await bcrypt.hash(password, 10);

    // Хадгалах
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: 'Амжилттай бүртгэгдлээ!' }, { status: 201 });

  } catch (error) {
    console.error('Бүртгэхэд алдаа:', error);
    return NextResponse.json({ message: 'Дотоод серверийн алдаа' }, { status: 500 });
  }
}
