import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './TripSuggestions.module.css';

interface TripSuggestionProps {
  region: string;
  season: string;
  size: string;
  duration: string;
}

interface Trip {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
}

const TripSuggestion: FC<TripSuggestionProps> = ({ region, season, size, duration }) => {
  const [suggestions, setSuggestions] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Үндсэн аялалын санал үүсгэх функц
  const generateSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/destinations`); // Adjust this endpoint according to your API route
      if (!response.ok) {
        throw new Error('Failed to fetch destination data');
      }

      const destinations: Destination[] = await response.json(); // Explicitly define the type

      // Filter or manipulate the fetched data based on the props (region, season, etc.)
      const filteredSuggestions = destinations.map((destination) => ({
        title: destination.name,
        description: `${destination.description}. A great place for a ${size}-person group!`,
        imageUrl: destination.imageUrl,
        link: `/trips/${destination.id}`,
      }));

      setSuggestions(filteredSuggestions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSuggestions();
  }, [region, season, size, duration]);

  if (loading) return <p>Loading suggestions...</p>;

  return (
    <div className= {styles['headerr']}>
      <h2>Your Suggested Trips</h2>
      <p>{`Based on your choices: Region: ${region}, Season: ${season}, Group Size: ${size}, Duration: ${duration}`}</p>
      <div className={styles['trip-list']}>
        {suggestions.map((trip, index) => (
          <div key={index} className={styles['trip-card']}>
            <h3>{trip.title}</h3>
            <p>{trip.description}</p>
            <Image src={trip.imageUrl} alt={trip.title} width={500} height={300} />
            <a href={trip.link} className={styles['btn']}>
              Plan This Trip
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripSuggestion;
