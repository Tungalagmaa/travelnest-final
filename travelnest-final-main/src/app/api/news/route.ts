import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import News from '../../models/News';

export async function GET() {
  await connectToDatabase();
  const newsList = await News.find().sort({ createdAt: -1 }); // хамгийн сүүлийн мэдээ эхэнд
  return NextResponse.json(newsList);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const news = await News.create({
    title: body.title,
    content: body.content,
    image: body.image,
    team: body.team,
  });

  return NextResponse.json(news, { status: 201 });
}
