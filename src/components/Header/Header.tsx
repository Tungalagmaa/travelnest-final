'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles['logo-container']}>
        <Link href="/Home">
          <Image
            src="/picture-source/logo.png"
            alt="TravelNest Logo"
            width={50}
            height={50}
            id="logo"
          />
        </Link>
        <h1>
          TravelNest<br />Domestic Travel
        </h1>
      </div>
      <nav>
        <div className={styles['header-right']}>
          <ul>
            <li><Link href="/Home">Home</Link></li>
            <li><Link href="/trips">Trips</Link></li>
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/companies">Companies</Link></li>
            <li><Link href="/suggestion">Plan your trip</Link></li>
          </ul>
          <Link href="/login" passHref>
        <button className={styles['login-btn']}>
          <Image src="/picture-source/login.webp" alt="Login" width={20} height={20} />
        </button>
      </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
