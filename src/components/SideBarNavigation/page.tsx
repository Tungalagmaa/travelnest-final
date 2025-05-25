// components/SidebarNavigation.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type NavButton = {
  label: string
  path: string
}

const navButtons: NavButton[] = [
  { label: 'My company info', path: '/company-info' },
  { label: 'Add itinerary', path: '/company-add-itinerary' },
  { label: 'Approved requests', path: '/company-approved-requests' },
  { label: 'My trips', path: '/company-my-trips' },
  { label: 'Traveler requests', path: '/company-traveler-requests' },
]

export default function SidebarNavigation() {
  const router = useRouter()

  return (
    <aside style={{ width: '250px', backgroundColor: '#002D5B', color: 'white', padding: '20px' }}>
      <h3>Hello Company</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {navButtons.map((btn, index) => (
          <button
            key={index}
            style={{
              backgroundColor: '#fff',
              color: '#002D5B',
              border: 'none',
              padding: '10px',
              borderRadius: '20px',
              textAlign: 'left',
              cursor: 'pointer',
            }}
            onClick={() => router.push(btn.path)}
          >
            {btn.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
