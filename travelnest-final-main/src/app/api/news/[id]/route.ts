import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import News from '../../../models/News';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const news = await News.findById(params.id);
  return NextResponse.json(news);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const body = await req.json();

  const updated = await News.findByIdAndUpdate(
    params.id,
    {
      title: body.title,
      content: body.content,
      image: body.image,
      createdAt: new Date(body.createdAt),
    },
    { new: true }
  );
  return NextResponse.json(updated);
}
  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectToDatabase();
    await News.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Устгагдлаа' });
  

}
