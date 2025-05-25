'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

// ======================
// 1. Request төрөл
// ======================
type Request = {
  travelerName: string
  destination: string
  time: string
  status: string
}

export default function ApprovedRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [sortBy, setSortBy] = useState('date')
  const router = useRouter()

  const companyId = '663fc...'; // 🔁 Login-с авч оруулах

  // ======================
  // 2. Өгөгдөл татах
  // ======================
  useEffect(() => {
    axios.get<Request[]>(`/api/requests/approved?companyId=${companyId}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error('Error fetching requests:', err))
  }, [])

  // ======================
  // 3. Sort хийх
  // ======================
  const sortedRequests = [...requests].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.time).getTime() - new Date(b.time).getTime()
      case 'status':
        return a.status.localeCompare(b.status)
      case 'province':
        return a.destination.localeCompare(b.destination)
      default:
        return 0
    }
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNavigation />

      <main style={{ flex: 1, padding: '40px' }}>
        <h2>My approved requests</h2>

        {/* Sort dropdown */}
        <div style={{ margin: '20px 0' }}>
          <label style={{ marginRight: '10px' }}>Sort:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={inputStyle}>
            <option value="date">By Date</option>
            <option value="province">By Province</option>
            <option value="status">By Status</option>
          </select>
        </div>

        {/* Requests list */}
        {sortedRequests.map((req, index) => (
          <div key={index} style={requestCardStyle}>
            <strong>{req.travelerName}</strong>
            <div style={rowStyle}>
              <span><strong>Destination:</strong> {req.destination}</span>
              <span><strong>Time:</strong> {req.time}</span>
              <span><strong>Status:</strong> {req.status}</span>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

// ======================
// Sidebar локал компонент
// ======================
function SidebarNavigation() {
  const router = useRouter()

  const navButtons = [
    { label: 'My company info', path: '/company-info' },
    { label: 'Add itinerary', path: '/company-add-itinerary' },
    { label: 'Approved requests', path: '/company-approved-requests' },
    { label: 'My trips', path: '/company-my-trips' },
    { label: 'Traveler requests', path: '/company-traveler-requests' },
  ]

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

// ======================
// Styles
// ======================
const inputStyle: React.CSSProperties = {
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
}

const requestCardStyle: React.CSSProperties = {
  border: '1px solid #000',
  borderRadius: '20px',
  padding: '15px',
  marginBottom: '15px',
  backgroundColor: '#fff',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
}
