// pages/select/region.tsx
import { useRouter } from 'next/router';
import RegionSelector from '@/components/RegionSelector/RegionSelector';

const RegionSelectorPage = () => {
  const router = useRouter();

  // Handle the selection of a region
  const handleSelect = (region: string) => {
    router.push({
      pathname: '/select/season',
      query: { region }, // Pass the selected region to the next page (SeasonSelector)
    });
  };

  return (
    <div>
      <RegionSelector onSelect={handleSelect} />
    </div>
  );
};

export default RegionSelectorPage;
