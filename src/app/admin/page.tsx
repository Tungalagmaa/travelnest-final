'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const adminCards = [
  {
    id: 1,
    title: 'Компанийн хяналт',
    image: '/picture-source/autumn .jpg',
    route: '/admin-company-control',
  },
  {
    id: 2,
    title: 'Хүсэлтүүдийн хяналт',
    image: '/picture-source/Discover.JPG',
    route: '/admin-request-control',
  },
  {
    id: 3,
    title: 'Мэдээ оруулах',
    image: '/picture-source/extreme1.jpeg',
    route: '/admin-news-dashboard',
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-8 py-10">
      <h2 className="text-3xl font-semibold m-10 text-center">Hello Admin!</h2>

      <div className="flex flex-wrap h-5 m-10 gap-6 justify-center">
        {adminCards.map((card) => (
            <div
  key={card.id}
  onClick={() => router.push(card.route)}
  className="relative w-80 h-64 rounded-xl overflow-hidden shadow-md m-[20px] cursor-pointer"
>
  {/* Зураг - card-оо дүүргэнэ */}
  <img
    src={card.image}
    alt={card.title}
    className="absolute inset-0 w-full h-auto object-cover"
  />

  {/* Гарчиг - зураг дээр давхарлана */}
  <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-3 text-lg font-semibold">
    {card.title}
  </div>



            {/* Title overlay */}
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-3 text-lg font-semibold">
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
