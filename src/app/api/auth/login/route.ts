import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '../../../models/User';         // users collection
import Company from '../../../models/Company';   // companies collection

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: 'Имэйл, нууц үг болон хэрэглэгчийн төрөл шаардлагатай' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    let user;

    if (role === 'company') {
      user = await Company.findOne({ email });
    } else if (role === 'tourist') {
      user = await User.findOne({ email });
    } else {
      return NextResponse.json({ message: 'Хэрэглэгчийн төрөл буруу байна' }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ message: 'И-мэйл бүртгэлтэй хэрэглэгч олдсонгүй' }, { status: 401 });
    }

    // ✅ Нууц үг байгаа эсэхийг шалгах
    if (!user.password) {
      console.error('❌ user.password алга байна');
      return NextResponse.json(
        { message: 'Нууц үг бүртгэл дээр олдсонгүй. Бүртгэлээ шалгана уу.' },
        { status: 500 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Нууц үг буруу байна' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Амжилттай', user }); // ❗ user нь бүх өгөгдөлтэй байна


  } catch (error) {
    console.error('Login алдаа:', error);
    return NextResponse.json({ message: 'Серверийн алдаа гарлаа' }, { status: 500 });
  }
}
