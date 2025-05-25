'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './TripIdeas.module.css'

const TripIdeas: React.FC = () => {
  return (
    <div className={styles['thirdline']}>
      <div className={styles['trip-ideas']}>
        <h2>Ideas for your trip</h2>
        <div className={styles['thirdbox']}>
          <h3>Top reviews</h3>
          <Image
            src="/picture-source/uvurkhangai.jpg"
            alt="Top reviews in Uvurkhangai"
            width={500}
            height={300}
          />
        </div>
        <div className={styles['thirdbox']}>
          <h3>Most visited</h3>
          <Image
            src="/picture-source/bagts.jpg"
            alt="Most visited in Bagts"
            width={500}
            height={300}
          />
        </div>
        <div className={styles['thirdbox']}>
          <h3>Companies</h3>
          <Image
            src="/picture-source/itinerary2.jpeg"
            alt="Itinerary companies"
            width={500}
            height={300}
          />
        </div>
        <Link href="/suggestion">
          <div className={styles['button-1']}>Plan Your Trip</div>
        </Link>
      </div>

      {/* Explore 5 regions of Mongolia Section */}
      <div className={styles['regions']}>
        <h2>Explore 5 regions of Mongolia</h2>

        <div className={styles['thirdboxtwo']}>
          <h3>North</h3>
          <Link href="/north">
            <Image
              src="/picture-source/umnu-govi.jpg"
              alt="North region"
              width={500}
              height={300}
            />
          </Link>
        </div>

        <div className={styles['thirdboxtwo']}>
          <h3>South</h3>
          <Link href="/south">
            <Image
              src="/picture-source/bulgan.jpeg"
              alt="South region"
              width={500}
              height={300}
            />
          </Link>
        </div>

        <div className={styles['thirdboxtwo']}>
          <h3>Center</h3>
          <Link href="/center">
            <Image
              src="/picture-source/ulaanbaatar.jpg"
              alt="Center region"
              width={500}
              height={300}
            />
          </Link>
        </div>

        <div className={styles['thirdboxtwo']}>
          <h3>East</h3>
          <Link href="/east">
            <Image
              src="/picture-source/bayankhongor.jpeg"
              alt="East region"
              width={500}
              height={300}
            />
          </Link>
        </div>

        <div className={styles['thirdboxtwo']}>
          <h3>West</h3>
          <Link href="/west">
            <Image
              src="/picture-source/dornod.jpeg"
              alt="West region"
              width={500}
              height={300}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TripIdeas
