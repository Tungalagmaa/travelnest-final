import Image from 'next/image';
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-content']}>
        <div className={styles['social-media']}>
          <h2>Follow us on:</h2>
          <div className={styles['social-icons']}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/picture-source/facebook.webp"
                alt="facebook"
                width={32}
                height={32}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/picture-source/instagram.webp"
                alt="instagram"
                width={32}
                height={32}
              />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/picture-source/youtube.webp"
                alt="youtube"
                width={32}
                height={32}
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/picture-source/linkedin.webp"
                alt="linkedin"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>

        <div className={styles['website-link']}>
          <a href="/aboutus">About Us</a>
        </div>
      </div>

      <div className={styles['footer-links']}>
        <div className={styles['footer-section']}>
          <h3>Top companies</h3>
          <ul>
            <li><a href="/companies">Top company1</a></li>
            <li><a href="/companies">Top company2</a></li>
            <li><a href="/companies">Top company3</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h3>Top trips</h3>
          <ul>
            <li><a href="/trips">Top trip1</a></li>
            <li><a href="/trips">Top trip2</a></li>
            <li><a href="/trips">Top trip3</a></li>
          </ul>
        </div>

        <div className={styles['footer-section']}>
          <h3>Top attractions</h3>
          <ul>
            <li><a href="/attraction">Top attraction1</a></li>
            <li><a href="/attraction">Top attraction2</a></li>
            <li><a href="/attraction">Top attraction3</a></li>
          </ul>
        </div>


      
      </div>
      <div className={styles['end-section']}> <p>Copyright 2025 © TravelNest. All rights reserved.</p></div>
    </footer>
  );
};

export default Footer;
