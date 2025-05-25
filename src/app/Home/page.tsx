import React from 'react';
import ImageSlider from '@/components/ImageSlider/ImageSlider';
import DestinationSearch from '@/components/DestinationSearch/DestinationSearch';
import HowDoWeWork from '@/components/HowDoWeWork/HowDoWeWork';
import MapSection from '@/components/MapSection/MapSection';
import TripIdeas from '@/components/TravelIdeas/TripIdeas';
import HelpfulInformation from '@/components/HelpfulInformation/HelpfulInformation';

const Page: React.FC = () => {
  return (
    <>
      <ImageSlider />
      <HowDoWeWork />
      <TripIdeas />
      <MapSection />
      <HelpfulInformation />
      <DestinationSearch />
      </>
  );
};

export default Page;
