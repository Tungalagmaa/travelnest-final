// components/SeasonSelector/SeasonSelector.tsx
import { FC } from 'react';
import Image from 'next/image';
import styles from './SeasonSelector.module.css';

interface Season {
  name: string;
  imageSrc: string;
  altText: string;
}

interface SeasonSelectorProps {
  onSelect: (season: string) => void; // Expecting the onSelect function from parent component
}

const seasons: Season[] = [
  { name: 'Winter', imageSrc: '/picture-source/winter.jpg', altText: 'Winter' },
  { name: 'Summer', imageSrc: '/picture-source/summer.jpg', altText: 'Summer' },
  { name: 'Autumn', imageSrc: '/picture-source/autumn .jpg', altText: 'Autumn' },
  { name: 'Spring', imageSrc: '/picture-source/spring.jpg', altText: 'Spring' },
];

const SeasonSelector: FC<SeasonSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles.seasons}>
      <h2>Choose your season</h2>
      
      {seasons.map((season) => (
        <div 
          key={season.name} 
          className={styles.thirdboxtwo}
          onClick={() => onSelect(season.name)} // Call the onSelect function when clicked
        >
          <h3>{season.name}</h3>
          <Image
            src={season.imageSrc}
            alt={season.altText}
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default SeasonSelector;
