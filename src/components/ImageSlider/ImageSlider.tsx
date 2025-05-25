'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ImageSlider.module.css'; // If you're using CSS modules, import them

interface Slide {
  image: string;
  title: string;
  link: string;
  buttonText: string;
}

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slides: Slide[] = [
    {
      image: '/picture-source/bagts.jpg',
      title: 'Make Your Own Adventure',
      link: '/travelitinerary',
      buttonText: 'Create Your Trip',
    },
    {
      image: '/picture-source/Discover.JPG',
      title: 'Mongolian beautiful nature',
      link: '/travels',
      buttonText: 'Discover trips',
    },
    {
      image: '/picture-source/extreme4.avif',
      title: 'Find out your travel company',
      link: '/companies',
      buttonText: 'Discover companies',
    },
  ];

  const moveSlide = (direction: 'left' | 'right') => {
    const totalSlides = slides.length;
    if (direction === 'left') {
      setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
    }
  };

  return (
    <section className={styles.imageSlider}>
      <div
        className={styles.imageContainer}
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
            />
            <div className={styles.textOverlay}>
              <h2>{slide.title}</h2>
              <Link href={slide.link}>
                <button className={styles.transparentBtn}>{slide.buttonText}</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.prevBtn} onClick={() => moveSlide('left')}>
        &#10094;
      </button>
      <button className={styles.nextBtn} onClick={() => moveSlide('right')}>
        &#10095;
      </button>
    </section>
  );
};

export default ImageSlider;
