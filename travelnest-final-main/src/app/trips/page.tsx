'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Trip = {
  _id: string
  name: string
  image: string
  region: string
  season: string
  groupsize: string
  duration: string
  sideseas: string
  description: string
}

export default function Companies() {
  const [trips, setTrips] = useState<Trip[]>([])

  useEffect(() => {
    axios
      .get<Trip[]>('/api/trips')
      .then((res) => setTrips(res.data))
      .catch((err) => console.error('Error fetching trips:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h2 className="text-3xl font-semibold mb-8">Trips</h2>

      {/* Trips grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip._id} className="bg-white shadow rounded-lg p-4">
            <img
              src={trip.image}
              alt={trip.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-lg mb-2">{trip.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{trip.region} | {trip.season}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{trip.description}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm">
                Overview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sort dropdown (optional logic) */}
      <div className="mt-10 flex justify-end items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          name="sort"
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="date">by date</option>
          <option value="group">by group size</option>
          <option value="province">by region</option>
          <option value="status">by season</option>
        </select>
      </div>
    </div>
  )
}
