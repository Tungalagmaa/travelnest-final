import mongoose from 'mongoose'
import Destination from '../models/Destinations' // Model-оо import хий
import Image from 'next/image'
import Link from 'next/link'

export default async function DestinationsPage() {
  if (mongoose.connections[0].readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/travelnest')
  }

  const destinations = await Destination.find()

  return (
<div className="pt-[80px] max-w-7xl mx-auto px-4 py-8">
  <h1 className="text-[100px] font-bold mb-[20px] text-left text-white">Destinations</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
  {destinations.map((destination: any) => (
  <Link key={destination._id?.toString()} href={`/destinations/${destination._id}`}>
    <div className="max-w-[400px] h-[300px] m-[20px] bg-gray-800 rounded-[30px] overflow-hidden shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer">
      
      <div className="relative w-full h-[200px]">
      <Image
  src={destination.image ? destination.image : '/placeholder.jpg'}
  alt={destination.name || 'Image'}
  layout="fill"
  className="object-cover"
/>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
          <h2 className="text-white text-lg font-bold">{destination.name}</h2>
        </div>
      </div>

      <div className="h-[100px] w-[400px] p-3 bg-black">
        <p className="text-white text-sm line-clamp-4">{destination.description}</p>
      </div>
    </div>
  </Link>
))}

  </div>
</div>

  )
}