import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '../../../models/User';
import Company from '../../../models/Company';

export async function POST(req: NextRequest) {
  try {
    const {
      role,
      email,
      password,
      firstName,
      lastName,
      companyName,
      regNumber,
    } = await req.json();

    if (!role || !email || !password) {
      return NextResponse.json({ message: 'Шаардлагатай мэдээлэл дутуу байна' }, { status: 400 });
    }

    await connectToDatabase();

    const existing = role === 'company'
      ? await Company.findOne({ email })
      : await User.findOne({ email });

    if (existing) {
      return NextResponse.json({ message: 'И-мэйл бүртгэлтэй байна' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'tourist') {
      if (!firstName || !lastName) {
        return NextResponse.json({ message: 'Овог, нэр заавал хэрэгтэй' }, { status: 400 });
      }

      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'tourist',
        userId: 'TOUR' + Date.now(),
        phoneNumber: '',
        address: {
          building: '',
          district: '',
          city: '',
        },
      });

      await newUser.save();
      return NextResponse.json({ message: 'Аялагч бүртгэгдлээ', user: newUser });
    }

    if (role === 'company') {
      if (!companyName || !regNumber) {
        return NextResponse.json({ message: 'Компанийн нэр болон регистр шаардлагатай' }, { status: 400 });
      }

      const newCompany = new Company({
        email,
        password: hashedPassword,
        companyName,
        regNumber,
        role: 'company',
        companyId: 'COMP' + Date.now(), // ✅ автоматаар ID
        phoneNumber: '',
        website: '',
        address: {
          building: '',
          district: '',
          city: '',
        },
      });

      await newCompany.save();
      return NextResponse.json({ message: 'Компани бүртгэгдлээ', user: newCompany });
    }

    return NextResponse.json({ message: 'Role тохирохгүй байна' }, { status: 400 });

  } catch (error) {
    console.error('Бүртгэлийн алдаа:', error);
    return NextResponse.json({ message: 'Серверийн алдаа' }, { status: 500 });
  }
}
