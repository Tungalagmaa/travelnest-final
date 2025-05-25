'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Trip {
  _id: string;
  tripName: string;
  price?: string;
  duration?: string;
  // шаардлагатай бол бусад талбаруудыг нэмнэ
  // image гэх мэт байвал нэмээрэй
}

export default function CompanyMyTrips() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
      router.push('/login');
      return;
    }

    axios
      .get<Trip[]>(`/api/trips/company/${companyId}`)
      .then((res) => setTrips(res.data))
      .catch(() => alert('Аялалуудыг авахад алдаа гарлаа'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p style={{ padding: '20px' }}>Ачааллаж байна...</p>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: '#002D5B',
          color: 'white',
          padding: '20px',
        }}
      >
        <h3>Hello Company</h3>
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <button style={navBtnStyle} onClick={() => router.push('/company-info')}>
            My company info
          </button>
          <button style={navBtnStyle} onClick={() => router.push('/company-add-itinerary')}>
            Add trip
          </button>
          <button style={navBtnStyle} onClick={() => router.push('/company-approved-requests')}>
            Approved requests
          </button>
          <button style={navBtnStyle} onClick={() => router.push('/company-my-trips')}>
            My trips
          </button>
          <button style={navBtnStyle} onClick={() => router.push('/company-traveler-requests')}>
            Traveler requests
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: '#F5F5F5' }}>
        <h2>My Trips</h2>

        {trips.length === 0 ? (
          <p>Та аялал үүсгээгүй байна.</p>
        ) : (
          <div style={gridStyle}>
            {trips.map((trip) => (
              <div key={trip._id} style={cardStyle}>
                {/* Зураг байхгүй бол default зургаар */}
                <img
                  src="/images/default-trip.jpg"
                  alt={trip.tripName}
                  style={imgStyle}
                />
                <h3>{trip.tripName}</h3>
                {trip.duration && <p>Duration: {trip.duration}</p>}
                {trip.price && <p>Price: {trip.price}</p>}

                <button
                  style={buttonStyle}
                  onClick={() => router.push(`/trip/${trip._id}`)}
                >
                  Overview
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '30px' }}>
          <button
            style={{ ...buttonStyle, backgroundColor: '#002D5B', color: 'white' }}
            onClick={() => router.push('/company-add-itinerary')}
          >
            Add New Trip
          </button>
        </div>
      </main>
    </div>
  );
}

// ===== STYLES =====

const navBtnStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: '#002D5B',
  border: 'none',
  padding: '10px',
  borderRadius: '20px',
  textAlign: 'left',
  cursor: 'pointer',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '20px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  padding: '15px',
  textAlign: 'center',
};

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '150px',
  borderRadius: '20px',
  objectFit: 'cover',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px 20px',
  backgroundColor: '#eee',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
};
