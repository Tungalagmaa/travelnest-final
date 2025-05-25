'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Destination = {
  _id: string;
  name: string;
};

export default function UserAddRequestPage() {
      const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);

    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelected(selectedOptions);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return alert('User not found');
    if (selected.length === 0 || !startDate || !endDate) {
      return alert('Бүх талбарыг бөглөнө үү');
    }
  
    const res = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: selected,
        startDate,
        endDate,
        description,
        userId,
      }),
    });
  
    const data = await res.json();
    if (res.ok) {
      setMessage('Хүсэлт илгээгдлээ');
      setSelected([]);
      setStartDate('');
      setEndDate('');
      setDescription('');
    } else {
      setMessage(data.message || 'Алдаа гарлаа');
    }
  };
  

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
      <main style={{ flex: 1, padding: '40px', fontFamily: 'sans-serif' }}>
        <h2>Аяллын хүсэлт оруулах</h2>

        {/* Dropdown */}
        <label style={labelStyle}>Очих газрууд:</label>
        {destinations.map((d) => (
  <label key={d._id} style={{ display: 'block', marginBottom: '8px' }}>
    <input
      type="checkbox"
      checked={selected.includes(d._id)}
      onChange={() => {
        setSelected((prev) =>
          prev.includes(d._id)
            ? prev.filter((id) => id !== d._id)
            : [...prev, d._id]
        );
      }}
    />{' '}
    {d.name}
  </label>
))}


        {/* Dates */}
        <label style={labelStyle}>Эхлэх огноо:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Дуусах огноо:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />

        {/* Description */}
        <label style={labelStyle}>Нэмэлт тайлбар:</label>
        <textarea
          placeholder="Тайлбар бичих..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
        />

        {/* Submit */}
        <button onClick={handleSubmit} style={submitBtnStyle}>
          Илгээх
        </button>

        {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
      </main>
    </div>
  );
}

// ✅ Styles
const navBtnStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '20px',
};

const labelStyle = {
  marginTop: '20px',
  display: 'block',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  marginTop: '8px',
  marginBottom: '16px',
  fontSize: '14px',
};

const submitBtnStyle = {
  backgroundColor: '#002D5B',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
};
