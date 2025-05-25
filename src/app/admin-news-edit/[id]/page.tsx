'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type News = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  image: string;
};

export default function AdminNewsEdit({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params); // ✅ params-ийг Promise-оос гаргаж авна

  const [news, setNews] = useState<News | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get<News>(`/api/news/${id}`);
        setNews(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image);
        setCreatedAt(new Date(res.data.createdAt).toISOString().substring(0, 10));
      } catch (err) {
        console.error('Edit news fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/news/${id}`, {
        title,
        content,
        image,
        createdAt,
      });
      router.push('/admin-news-dashboard');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        Уншиж байна...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-[50px] py-[50px]">
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-8 flex flex-col md:flex-row gap-10">
          {/* Зүүн тал: Зураг */}
          <div className="w-full md:w-1/2">
            <img
              src={image || '/placeholder.jpg'}
              alt="Preview"
              className="w-full h-[400px] object-cover rounded-[30px]"
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          </div>

          {/* Баруун тал: Форм */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-blue-800">✏️ Мэдээ засах</h2>

            {/* Гарчиг */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Гарчиг</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Огноо */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Огноо</label>
              <input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Зургийн URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Зургийн URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Агуулга */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Агуулга</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border rounded-md"
                required
              ></textarea>
            </div>

            {/* Товчлуурууд */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/admin-news-dashboard')}
                className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                Цуцлах
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Хадгалах
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
