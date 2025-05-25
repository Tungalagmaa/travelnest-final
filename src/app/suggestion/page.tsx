'use client'
import { useState } from 'react';
import RegionSelector from '@/components/RegionSelector/RegionSelector';
import SeasonSelector from '@/components/SeasonSelector/SeasonSelector';
import SizeSelector from '@/components/SizeSelector/SizeSelector';
import DurationSelector from '@/components/DurationSelector/DurationSelector';
import TripSuggestions from '@/components/TripSuggestion/TripSuggestions';

const SuggestionPage = () => {
  const [region, setRegion] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleSeasonSelect = (selectedSeason: string) => {
    setSeason(selectedSeason);
  };

  const handleSizeSelect = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleDurationSelect = (selectedDuration: string) => {
    setDuration(selectedDuration);
  };

  return (
    <div >
      <h1>Select Your Preferences</h1>
      {!region && <RegionSelector onSelect={handleRegionSelect} />}
      {region && !season && <SeasonSelector onSelect={handleSeasonSelect} />}
      {season && !size && <SizeSelector onSelect={handleSizeSelect} />}
      {size && !duration && <DurationSelector onSelect={handleDurationSelect} />}
      {region && season && size && duration && (
        <TripSuggestions region={region} season={season} size={size} duration={duration} />
      )}
    </div>
  );
};

export default SuggestionPage;
