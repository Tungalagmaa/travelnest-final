'use client';
import React from 'react';
import Link from 'next/link';
import styles from './DestinationSearch.module.css';

const DestinationSearch: React.FC = () => {
  return (
    <div className={styles.fifthline}>
      <h2>Find your destination</h2>

      <section className={styles.section}>
        <form action="/search-results" method="get" className={styles.form}>
          <input
            type="text"
            name="query"
            placeholder="Where do you want to go?"
            required
            aria-label="Search for a destination"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Discover
          </button>
        </form>
      </section>

      <Link href="/user-add-request" className={styles['button-2']}>
        Create your own itinerary
      </Link>
    </div>
  );
};

export default DestinationSearch;
