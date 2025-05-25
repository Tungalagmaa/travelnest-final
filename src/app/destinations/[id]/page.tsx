// app/destination/[id]/page.tsx or similar (App Router)

import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";

type Destination = {
  _id: string;
  name: string;
  description: string;
  image: string;
  visits: string[];
};

async function getDestination(id: string): Promise<Destination | null> {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db("travelnest");

  const destination = await db
    .collection("destinations")
    .findOne({ _id: new ObjectId(id) });

  await client.close();

  if (!destination) return null;

  return {
    _id: destination._id.toString(),
    name: destination.name,
    description: destination.description,
    image: destination.image,
    visits: Array.isArray(destination.visits) ? destination.visits : [],
  };
}

export default async function DestinationPage({
  params,
}: {
  params: { id: string };
}) {
  const destination = await getDestination(params.id);

  if (!destination) return <div>Destination not found</div>;

  return (
    <div>
      <h1>{destination.name}</h1>
      <Image src={destination.image} alt={destination.name} width={800} height={600} />
      <p>{destination.description}</p>
    </div>
  );
}
