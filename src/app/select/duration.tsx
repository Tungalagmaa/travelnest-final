// pages/select/duration.tsx
import { useRouter } from 'next/router';
import DurationSelector from '@/components/DurationSelector/DurationSelector';

const DurationSelectorPage = () => {
  const router = useRouter();
  const { region, season, size } = router.query;

  const handleSelect = (duration: string) => {
    router.push({
      pathname: '/trip-suggestions',
      query: { region, season, size, duration },
    });
  };

  return (
    <div>
      <DurationSelector onSelect={handleSelect} />
    </div>
  );
};

export default DurationSelectorPage;
