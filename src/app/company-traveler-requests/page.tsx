'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface RequestItem {
  _id: string;
  destination: string[];
  destinationNames?: string[];
  startDate: string;
  endDate: string;
  description: string;
}

const navButtons = [
  { label: 'My company info', path: '/company-info' },
  { label: 'Add itinerary', path: '/company-add-itinerary' },
  { label: 'Approved requests', path: '/company-approved-requests' },
  { label: 'My trips', path: '/company-my-trips' },
  { label: 'Traveler requests', path: '/company-traveler-requests' },
];

export default function CompanyTravelerRequests() {
  const router = useRouter();

  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('companyName');
    if (name) setCompanyName(name);

    axios.get('/api/requests')
      .then(res => setRequests(res.data))
      .catch(() => alert('Хүсэлтүүдийг татахад алдаа гарлаа'));
  }, []);

  const handleOffer = async () => {
    if (!selectedRequest) return;

    const companyId = localStorage.getItem('companyId');
    const companyName = localStorage.getItem('companyName');
    const phone = localStorage.getItem('phoneNumber');

    const offer = {
      companyId,
      companyName,
      phone,
      price,
      additionalInfo: 'Custom offer',
    };

    try {
      await axios.put(`/api/requests/${selectedRequest._id}/offer`, { offer });
      alert('Санал амжилттай илгээгдлээ');
      setShowModal(false);
      setPrice('');
    } catch (error) {
      alert('Санал илгээхэд алдаа гарлаа');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: '#002D5B',
          color: 'white',
          padding: '20px'
        }}
      >
        <h3>Hello {companyName || 'Company'}</h3>
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          {navButtons.map((btn, index) => (
            <button
              key={index}
              style={navBtnStyle}
              onClick={() => router.push(btn.path)}
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ padding: '40px', flex: 1 }}>
        <h2>All Traveler Requests</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {requests.map(req => (
            <div key={req._id} style={cardStyle}>
              <h3>{req.destinationNames?.join(', ') || 'Unknown destinations'}</h3>
              <p><strong>From:</strong> {req.startDate}</p>
              <p><strong>To:</strong> {req.endDate}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <button
                style={buttonStyle}
                onClick={() => {
                  setSelectedRequest(req);
                  setShowModal(true);
                }}
              >
                Give Offer
              </button>
            </div>
          ))}
        </div>

        {showModal && selectedRequest && (
          <div style={modalStyle}>
            <h3>Give Offer</h3>
            <p><strong>Request Description:</strong></p>
            <p>{selectedRequest.description}</p>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleOffer} style={buttonStyle}>Send Offer</button>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Styles
const navBtnStyle = {
  backgroundColor: '#fff',
  color: '#002D5B',
  border: 'none',
  padding: '10px',
  borderRadius: '20px',
  textAlign: 'left',
  cursor: 'pointer',
};

const cardStyle = {
  padding: '20px',
  background: 'white',
  borderRadius: '10px',
  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#002D5B',
  color: 'white',
  cursor: 'pointer',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '100%',
  marginTop: '10px',
};

const modalStyle = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -30%)',
  background: 'white',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  zIndex: 1000,
};
