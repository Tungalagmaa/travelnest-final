'use client';

import { useState } from 'react';
import './ForgotPasswordPage.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'tourist' | 'company'>('tourist');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage('Имэйл илгээгдлээ! Та имэйлээ шалгана уу.');
      } else {
        setMessage(data.message || 'Алдаа гарлаа');
      }
    } catch {
      setMessage('Сервертэй холбогдож чадсангүй');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Нууц үг мартсан</h2>
        <p>Та бүртгэлтэй имэйл болон төрөл (роль)-өө сонгоно уу</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <select value={role} onChange={(e) => setRole(e.target.value as 'tourist' | 'company')} required>
            <option value="tourist">Аялагч</option>
            <option value="company">Компани</option>
          </select>

          <input
            type="email"
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="submit-button">Нууц үг сэргээх холбоос илгээх</button>
        </form>

        {message && (
          <p style={{ color: success ? 'green' : 'red', marginTop: '15px' }}>{message}</p>
        )}
      </div>
    </div>
  );
}
