'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './HelpfulInformation.module.css';

type News = {
  _id: string;
  title: string;
  image?: string;
  content?: string;
};

const HelpfulInformation: React.FC = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data: News[] = await res.json();
      setNewsList(data.slice(0, 3)); // зөвхөн хамгийн сүүлийн 3
    } catch (error) {
      console.error('Мэдээ татаж чадсангүй:', error);
    }
  };

  return (
    <div className={styles.fourthline}>
      <h2>Helpful Information</h2>
      <div className={styles.fourthbox}>
        {newsList.map((news) => (
          <div key={news._id} className={styles.aside}>
<Image
  src={news.image ? news.image : '/placeholder.jpg'}
  alt={news.title}
  width={500}
  height={300}
/>

            <div className={styles['box-content']}>
              <h2>{news.title}</h2>
              <p>{news.content?.substring(0, 60)}...</p>
              <Link
                href={`/news/${news._id}`}
                className={styles.read}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpfulInformation;