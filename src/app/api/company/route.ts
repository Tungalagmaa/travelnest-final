import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Company from '../../models/Company';

export async function GET() {
  try {
    await connectToDatabase();
    const companies = await Company.find();
    return NextResponse.json(companies, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newCompany = new Company(body);
    await newCompany.save();

    return NextResponse.json({ message: 'Company created', company: newCompany }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Failed to create company' }, { status: 500 });
  }
}
