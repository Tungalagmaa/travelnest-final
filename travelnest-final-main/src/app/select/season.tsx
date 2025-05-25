// pages/select/season.tsx
import { useRouter } from 'next/router';
import SeasonSelector from '@/components/SeasonSelector/SeasonSelector';

const SeasonSelectorPage = () => {
  const router = useRouter();
  const { region } = router.query; // Get the region from the URL

  // Handle the selection of season
  const handleSelect = (season: string) => {
    router.push({
      pathname: '/select/size',
      query: { region, season }, // Pass region and selected season to next page
    });
  };

  return (
    <div>
      <SeasonSelector onSelect={handleSelect} />
    </div>
  );
};

export default SeasonSelectorPage;
