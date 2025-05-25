// components/RegionSelector/RegionSelector.tsx
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './RegionSelector.module.css';

interface Region {
  name: string;
  link: string;
  imageSrc: string;
  altText: string;
}

interface RegionSelectorProps {
  onSelect: (region: string) => void; // Make sure this is the correct type for onSelect
}

const regions: Region[] = [
  { name: 'North', link: '/north', imageSrc: '/picture-source/umnu-govi.jpg', altText: 'North region' },
  { name: 'South', link: '/south', imageSrc: '/picture-source/bulgan.jpeg', altText: 'South region' },
  { name: 'Center', link: '/center', imageSrc: '/picture-source/ulaanbaatar.jpg', altText: 'Center region' },
  { name: 'East', link: '/east', imageSrc: '/picture-source/bayankhongor.jpeg', altText: 'East region' },
  { name: 'West', link: '/west', imageSrc: '/picture-source/dornod.jpeg', altText: 'West region' },
];

const RegionSelector: FC<RegionSelectorProps> = ({ onSelect }) => {
  return (
    <div className={styles.regions}>
      <h2>Choose your region</h2>

      {regions.map((region) => (
        <div key={region.name} className={styles.thirdboxtwo}>
          <h3>{region.name}</h3>
          <Link href="#" onClick={() => onSelect(region.name)}> 
            <Image
              src={region.imageSrc}
              alt={region.altText}
              width={500}
              height={300}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RegionSelector;
