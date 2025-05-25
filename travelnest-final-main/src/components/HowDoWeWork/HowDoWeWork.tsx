'use client' 
import React from 'react'
import Link from 'next/link'

import styles from './HowDoWeWork.module.css' // Import the CSS module styles

const HowDoWeWork: React.FC = () => {
  return (
    <div className={styles.secondline}> {/* Use styles to apply the CSS classes */}
      {/* How do we work section */}
      <h2>How do we work?</h2>

      <div className={styles.secondbox}>
        <h1>
          <span className={styles.highlight}>1000+</span>
        </h1>
        <p>Travelers</p>
        <div className={styles['down-arrows']} aria-label="Scroll down">&#9660;</div>
      </div>

      <div className={styles.secondbox}>
        <h1>
          <span className={styles.highlight}>150+</span>
        </h1>
        <p>Destinations</p>
        <div className={styles['down-arrows']} aria-label="Scroll down">&#9660;</div>
      </div>

      <div className={styles.secondbox}>
        <h1>
          <span className={styles.highlight}>50+</span>
        </h1>
        <p>Companies</p>
        <div className={styles['down-arrows']} aria-label="Scroll down">&#9660;</div>
      </div>

      <div className={styles['offer-text']}>
        <h3>
          You choose, we help you to find the best <br />
          <span className={styles.highlight}>OFFER</span>.
        </h3>
      </div>

      <div className={styles['button-container']}>
        <Link href="/aboutus" className={styles['find-out-btn']} aria-label="Learn more about us">
          Find Out More About Us &gt;&gt;
        </Link>
      </div>
    </div>
  )
}
export default HowDoWeWork
