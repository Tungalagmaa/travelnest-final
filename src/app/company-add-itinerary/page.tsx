'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Destination {
  _id: string;
  name: string;
}

interface TripForm {
  tripName: string;
  groupSize: string;
  duration: string;
  direction: string;
  reason: string;
  price: string;
  province: string;
  url: string;
}

export default function CompanyAddTrip() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  const [form, setForm] = useState<TripForm>({
    tripName: '',
    groupSize: '',
    duration: '',
    direction: '',
    reason: '',
    price: '',
    province: '',
    url: '',
  });

  useEffect(() => {
    axios
      .get<Destination[]>('/api/destinations')
      .then((res) => setDestinations(res.data))
      .catch(() => alert('Failed to load destinations'));
  }, []);

  const toggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof TripForm;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
      alert('Company ID олдсонгүй. Та дахин нэвтрэнэ үү.');
      router.push('/login');
      return;
    }

    try {
      await axios.post('/api/trips', {
        ...form,
        destinations: selectedDestinations,
        companyId,  // Заавал companyId-г оруулж өгнө
      });
      alert('Trip created successfully!');
      router.push('/company-my-trips');
    } catch (error) {
      alert('Failed to create trip');
      console.error(error);
    }
  };

  const navButtons = [
    { label: 'My company info', path: '/company-info' },
    { label: 'Add trip', path: '/company-add-itinerary' },
    { label: 'Approved requests', path: '/company-approved-requests' },
    { label: 'My trips', path: '/company-my-trips' },
    { label: 'Traveler requests', path: '/company-traveler-requests' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: '250px',
          backgroundColor: '#002D5B',
          color: 'white',
          padding: '20px',
        }}
      >
        <h3>Hello Company Name</h3>
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          {navButtons.map((btn, i) => (
            <button
              key={i}
              style={navBtnStyle}
              onClick={() => router.push(btn.path)}
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px' }}>
        <h2>Add Trip</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}
        >
          {[
            { label: 'Trip name', name: 'tripName', placeholder: 'Name' },
            { label: 'Group size', name: 'groupSize', placeholder: 'Solo, small, big ...' },
            { label: 'Duration', name: 'duration', placeholder: 'One week, Two week, Three week' },
            { label: 'Direction', name: 'direction', placeholder: 'North, South, East, West, Center' },
            { label: 'Reason', name: 'reason', placeholder: 'Summer, Autumn, Spring, Winter' },
            { label: 'Price', name: 'price', placeholder: '₮₮₮' },
            { label: 'Province', name: 'province', placeholder: 'Province from 21' },
            { label: 'URL', name: 'url', placeholder: 'Website URL' },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <label>{label}</label>
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          ))}

          <fieldset>
            <legend>Select Destinations</legend>
            {destinations.map((dest) => (
              <label key={dest._id} style={{ display: 'block', margin: '5px 0' }}>
                <input
                  type="checkbox"
                  checked={selectedDestinations.includes(dest._id)}
                  onChange={() => toggleDestination(dest._id)}
                />{' '}
                {dest.name}
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            style={{ ...buttonStyle, marginTop: '20px', backgroundColor: '#002D5B', color: 'white' }}
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

// Styles
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginTop: '5px',
};

const navBtnStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: '#002D5B',
  border: 'none',
  padding: '10px',
  borderRadius: '20px',
  textAlign: 'left',
  cursor: 'pointer',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
};
