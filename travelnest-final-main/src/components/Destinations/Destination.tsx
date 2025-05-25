import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

interface TripSuggestionProps {
  region: string;
  season: string;
  size: string;
  duration: string;
}

interface Trip {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
}

const Destinations: FC<TripSuggestionProps> = ({ region, season, size, duration }) => {
  const [suggestions, setSuggestions] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generateSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/destinations`);
      if (!response.ok) {
        throw new Error('Failed to fetch destination data');
      }

      const destinations: Destination[] = await response.json();

      const filteredSuggestions = destinations.map((destination) => ({
        title: destination.name,
        description: `${destination.description}. Таны ${size}-хүнтэй багт тохиромжтой газар!`,
        imageUrl: destination.imageUrl,
        link: `/trips/${destination.id}`,
      }));

      setSuggestions(filteredSuggestions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateSuggestions();
  }, [region, season, size, duration]);

  if (loading) return <p className="text-center mt-8">Аяллын саналууд ачааллаж байна...</p>;

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Танд санал болгож буй аяллууд</h2>
      <p className="text-center mb-8 text-gray-600">{`Сонгосон тохиргоо: Бүс - ${region}, Улирал - ${season}, Хэмжээ - ${size}, Үргэлжлэх хугацаа - ${duration}`}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {suggestions.map((trip, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <Image
              src={trip.imageUrl}
              alt={trip.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
              <a href={trip.link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Энэ аяллыг төлөвлөх
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
