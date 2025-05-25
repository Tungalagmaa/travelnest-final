import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '../../../models/User';
import Company from '../../../models/Company';

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json({ message: 'Имэйл болон роль заавал шаардлагатай' }, { status: 400 });
    }

    await connectToDatabase();

    // ✅ Role шалгаж тусдаа collection ашиглах
    let account;

    if (role === 'company') {
      account = await Company.findOne({ email });
    } else if (role === 'tourist') {
      account = await User.findOne({ email });
    } else {
      return NextResponse.json({ message: 'Буруу хэрэглэгчийн төрөл' }, { status: 400 });
    }

    if (!account) {
      return NextResponse.json({ message: 'Имэйл бүртгэлтэй биш байна' }, { status: 404 });
    }

    // 🔐 Reset token үүсгэх
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 1000 * 60 * 30; // 30 минут

    account.resetToken = resetToken;
    account.resetTokenExpiry = tokenExpiry;
    await account.save();

    // ✅ Reset линкийг имэйлээр илгээх оронд log хийж байна
    console.log(`Reset линк: http://localhost:3000/reset-password/${resetToken}`);

    return NextResponse.json({ message: 'Сэргээх холбоос амжилттай илгээгдлээ' }, { status: 200 });

  } catch (error) {
    console.error('Forgot-password алдаа:', error);
    return NextResponse.json({ message: 'Серверийн алдаа' }, { status: 500 });
  }
}
