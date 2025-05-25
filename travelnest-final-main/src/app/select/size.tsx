// pages/select/size.tsx
import { useRouter } from 'next/router';
import SizeSelector from '@/components/SizeSelector/SizeSelector';

const SizeSelectorPage = () => {
  const router = useRouter();
  const { region, season } = router.query;

  const handleSelect = (size: string) => {
    router.push({
      pathname: '/select/duration',
      query: { region, season, size },
    });
  };

  return (
    <div>
      <SizeSelector onSelect={handleSelect} />
    </div>
  );
};

export default SizeSelectorPage;
