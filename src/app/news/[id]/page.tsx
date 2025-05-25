'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type News = {
  _id: string;
  title: string;
  content: string;
  image: string;
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/news/${id}`)
        .then((res) => res.json())
        .then((data) => setNews(data))
        .catch((err) => console.error('Error fetching news:', err));
    }
  }, [id]);

  if (!news) return <div className="p-10">Уншиж байна...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-[50px] py-[50px]">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Зүүн тал: Зураг */}
        <div className="w-full md:w-1/2 relative h-[400px]">
          <div className="w-full h-full relative rounded-[50px] overflow-hidden">
            <Image
              src={news.image || '/placeholder.jpg'}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Баруун тал: Гарчиг + Тайлбар */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-[#002D5B] m-4">{news.title}</h1>
          <p className="text-gray-700 leading-relaxed">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
