'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type News = {
  _id: string;
  title: string;
  image?: string;
  createdAt: string;
};

export default function AdminNewsDashboard() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get<News[]>('/api/news');
      setNewsList(res.data);
    } catch (err) {
      console.error('Мэдээ татахад алдаа:', err);
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await axios.delete(`/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error('Устгах үед алдаа:', err);
    }
  };

  return (
    <div className="min-h-screen m-5 bg-[#F5F5F5] px-[50px] py-[50px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">Мэдээний удирдлага</h2>
          <Link href="/admin-insert-news">
            <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg shadow-md transition duration-200">
              Мэдээ нэмэх
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-200"
            >
              {/* Image */}
              {item.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  <span>Зураг байхгүй</span>
                </div>
              )}
            
              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex justify-between mt-4">
                  <Link href={`/admin-news-edit/${item._id}`}>
                    <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md text-sm transition duration-200">
                      Засах
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteNews(item._id)}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md text-sm transition duration-200"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}