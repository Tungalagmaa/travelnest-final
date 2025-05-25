'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdminInsertNews() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [team, setTeam] = useState('team1'); // default баг
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/news', {
        title,
        content,
        image,
        team,
      });

      router.push('/admin-news-dashboard');
    } catch (err) {
      console.error('Оруулахад алдаа:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">➕ Мэдээ оруулах</h2>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block font-medium">Гарчиг</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Агуулга</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Зургийн URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/picture-source/news1.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium">Баг (team)</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="bg-[#002D5B] text-white px-6 py-2 rounded-md">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
