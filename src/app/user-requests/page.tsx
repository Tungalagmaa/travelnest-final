'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Offer = {
  companyName: string;
  price: string;
  phone: string;
  additionalInfo: string;
};

type RequestItem = {
  _id: string;
  destination: string[];
  destinationNames?: string[];   // ✅ Нэрс
  startDate: String;
  status: string;
  offers?: Offer[];
};


export default function UserRequestsPage() {
    const router = useRouter();
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [showOfferBox, setShowOfferBox] = useState(false);
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      const name = localStorage.getItem('userName');
      if (name) setUserName(name);
  
      const userId = localStorage.getItem('userId');
      if (!userId) return;
  
      fetch(`/api/requests/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch(() => alert('Хүсэлтүүдийг татахад алдаа гарлаа'));
    }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#002D5B', color: 'white', padding: '20px' }}>
      <h3>Hello {userName || 'User Name'}</h3>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button style={navBtnStyle} onClick={() => router.push('/user-profile-info')}>My info</button>
          <button style={navBtnStyle} onClick={() => router.push('/user-requests')}>Uploaded requests</button>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>My requests</h2>
          <button
  onClick={() => location.href = '/user-add-request'}
  style={{
    backgroundColor: '#0a58ca',   // цэнхэр өнгө
    color: 'white',               // цагаан текст
    padding: '10px 16px',         // зай
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'background 0.3s',
  }}
  onMouseOver={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#084298'; // hover үед
  }}
  onMouseOut={(e) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0a58ca';
  }}
>
  Add new request
</button>
        </div>

        {requests.length === 0 ? (
          <p>No requests found</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} style={requestCardStyle}>
<p><strong>Destination:</strong> {req.destinationNames?.join(', ')}</p>
<p><strong>Start Date:</strong> {req.startDate}</p>
              <p><strong>Status:</strong> {req.status}</p>

              {(req.offers?.length || 0) > 0 ? (
                req.offers!.map((offer, i) => (
                  <div key={i}>
                    <button
                      style={seeOfferBtnStyle}
                      onClick={() => {
                        setSelectedOffer(offer);
                        setShowOfferBox(true);
                      }}
                    >
                      See offer
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ color: 'gray' }}>No offers yet</p>
              )}
            </div>
          ))
        )}

        {/* Offer box */}
        {showOfferBox && selectedOffer && (
          <div style={offerBoxStyle}>
            <h3>Offer</h3>
            <p><strong>Company Name:</strong> {selectedOffer.companyName}</p>
            <p><strong>Price:</strong> {selectedOffer.price}</p>
            <p><strong>Additional Info:</strong> {selectedOffer.additionalInfo}</p>
            <p><strong>Phone:</strong> {selectedOffer.phoneNumber}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button style={denyBtnStyle}>Deny offer</button>
              <button style={approveBtnStyle}>Approve offer</button>
            </div>

            <button style={{ marginTop: '10px' }} onClick={() => setShowOfferBox(false)}>Close</button>
          </div>
        )}
      </main>
    </div>
  );
}

const navBtnStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '20px',
};

const requestCardStyle = {
  border: '1px solid #ddd',
  padding: '16px',
  borderRadius: '10px',
  marginBottom: '20px',
};

const seeOfferBtnStyle = {
  backgroundColor: '#0a58ca',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
};

const offerBoxStyle = {
  background: '#e9f0ff',
  padding: '20px',
  borderRadius: '10px',
  marginTop: '30px',
};

const denyBtnStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const approveBtnStyle = {
  backgroundColor: '#2ecc71',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
