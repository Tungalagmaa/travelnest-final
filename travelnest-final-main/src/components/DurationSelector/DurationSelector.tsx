// components/DurationSelector/DurationSelector.tsx
import { FC } from 'react';
import Image from 'next/image';
import styles from './DurationSelector.module.css'; // Make sure to add appropriate styles

interface Duration {
  name: string;
  imageSrc: string;
  altText: string;
}

interface DurationSelectorProps {
  onSelect: (duration: string) => void; // Function to pass selected duration back to parent
}

const durations: Duration[] = [
    { name: '1 week', imageSrc: '/picture-source/extreme1.jpeg', altText: 'Small group' },
    { name: '2 week', imageSrc: '/picture-source/extreme2.jpg', altText: 'Small group' },
    { name: '3 week', imageSrc: '/picture-source/extreme3.jpg', altText: 'Small group' },
    { name: '4 week', imageSrc: '/picture-source/extreme4.avif', altText: 'Medium group' },
    { name: 'All', imageSrc: '/picture-source/govi-altai.jpg', altText: 'Large group' },
  ];

const DurationSelector: FC<DurationSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles.durations}>
      <h2>Choose your trip duration</h2>

      {durations.map((duration) => (
        <div 
          key={duration.name} 
          className={styles.durationOption}
          onClick={() => onSelect(duration.name)} // Trigger onSelect with the duration name
        >
          <h3>{duration.name}</h3>
          <Image
            src={duration.imageSrc}
            alt={duration.altText}
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default DurationSelector;
