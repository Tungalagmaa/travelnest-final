import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '../../../models/User';
import Company from '../../../models/Company';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Бүх талбарыг бөглөнө үү' }, { status: 400 });
    }

    await connectToDatabase();

    // Token-аар аль нэг collection-оос хайна
    const now = Date.now();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: now }
    });

    const company = await Company.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: now }
    });

    const account = user || company;

    if (!account) {
      return NextResponse.json({ message: 'Токен хүчингүй эсвэл хугацаа дууссан' }, { status: 400 });
    }

    // Нууц үг шинэчилж хадгална
    const hashed = await bcrypt.hash(password, 10);
    account.password = hashed;
    account.resetToken = undefined;
    account.resetTokenExpiry = undefined;
    await account.save();

    return NextResponse.json({ message: 'Нууц үг шинэчлэгдлээ' });

  } catch (error) {
    console.error('Reset-password алдаа:', error);
    return NextResponse.json({ message: 'Серверийн алдаа' }, { status: 500 });
  }
}
