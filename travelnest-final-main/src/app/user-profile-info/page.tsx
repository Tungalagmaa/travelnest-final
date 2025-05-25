'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TouristInfoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: {
      building: '',
      district: '',
      city: '',
    },
  });

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setForm({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        address: {
          building: user.address?.building || '',
          district: user.address?.district || '',
          city: user.address?.city || '',
        },
      });
    }
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['building', 'district', 'city'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const userId = localStorage.getItem('userId'); // login үед хадгалсан байх ёстой
  if (!userId) return alert('User not found');

  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Амжилттай хадгалагдлаа');
    } else {
      alert('Алдаа: ' + data.message);
    }
  } catch (error) {
    alert('Сервертэй холбогдоход алдаа гарлаа');
  }
};


  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#002D5B', color: 'white', padding: '20px' }}>
        <h3>Hello {userName || 'User Name'}</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button style={navBtnStyle} onClick={() => router.push('/user-profile-info')}>My info</button>
          <button style={navBtnStyle} onClick={() => router.push('/user-requests')}>Uploaded requests</button>
        </nav>
      </aside>

      {/* Main Form */}
      <main style={{ flex: 1, padding: '40px' }}>
        <h2>My info</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />

          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
          </div>
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} />

          <div>
            <h4>Address</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" name="building" placeholder="Building" value={form.address.building} onChange={handleChange} />
              <input type="text" name="district" placeholder="District" value={form.address.district} onChange={handleChange} />
            </div>
            <input type="text" name="city" placeholder="City" value={form.address.city} onChange={handleChange} />
          </div>

          <button type="submit" style={submitBtnStyle}>Save changes</button>
        </form>
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

const submitBtnStyle = {
  backgroundColor: '#002D5B',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
};
