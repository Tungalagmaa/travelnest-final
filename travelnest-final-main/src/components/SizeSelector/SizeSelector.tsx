// components/SizeSelector/SizeSelector.tsx
import { FC } from 'react';
import Image from 'next/image';
import styles from './SizeSelector.module.css'; // Ensure you have appropriate styling for this

interface Size {
  name: string;
  imageSrc: string;
  altText: string;
}

interface SizeSelectorProps {
  onSelect: (size: string) => void; // Function to pass selected size back to parent
}

const sizes: Size[] = [
  { name: 'Solo', imageSrc: '/picture-source/extreme1.jpeg', altText: 'Small group' },
  { name: '2-4 Friends', imageSrc: '/picture-source/extreme2.jpg', altText: 'Small group' },
  { name: '5-7 Family', imageSrc: '/picture-source/extreme3.jpg', altText: 'Small group' },
  { name: '8-10 Big group', imageSrc: '/picture-source/extreme4.avif', altText: 'Medium group' },
  { name: '10+ Guide', imageSrc: '/picture-source/govi-altai.jpg', altText: 'Large group' },
];

const SizeSelector: FC<SizeSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles.sizes}>
      <h2>Choose your group size</h2>

      {sizes.map((size) => (
        <div 
          key={size.name} 
          className={styles.sizeOption}
          onClick={() => onSelect(size.name)} // Trigger onSelect with the size name
        >
          <h3>{size.name}</h3>
          <Image
            src={size.imageSrc}
            alt={size.altText}
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default SizeSelector;
