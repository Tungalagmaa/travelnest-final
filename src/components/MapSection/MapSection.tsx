'use client'
import React from 'react'
import styles from './Mapsection.module.css'

const MapSection: React.FC = () => {
  return (
    <div className={styles.Mapsection}>
      <h2>Find Your Place</h2>
      <div className={styles.MapContainer}>
        {/* Option 1: Embed map without API */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11474172.147145428!2d95.18950404203014!3d46.825292936899444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96923cb0c263cb%3A0x6c5a21922be5a4a5!2sMongolia!5e0!3m2!1sen!2smn!4v1682107699132!5m2!1sen!2smn"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}

export default MapSection
