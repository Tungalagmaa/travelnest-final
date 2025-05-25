'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Company = {
  _id: string
  name: string
  email: string
  phone: string
  website: string
  image: string
  description: string
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    axios
      .get<Company[]>('/api/company')
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error('Error fetching companies:', err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h2 className="text-3xl font-semibold mb-8">Companies</h2>

      {/* Companies grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company._id} className="bg-white shadow rounded-lg p-4">
            <img
              src={company.image || '/picture-source/Discover.JPG'}
              alt={company.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-lg mb-2">{company.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{company.email} | {company.phone}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
            <div className="flex justify-between mt-4">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm"
              >
                Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
