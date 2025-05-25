'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginPage.css';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'tourist' | 'company'>('tourist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // 🔽 ⛳ Ухаалаг хадгалалт
        if (role === 'tourist') {
          localStorage.setItem('userId', data.user.userId);
          localStorage.setItem('userName', data.user.firstName);
        } else if (role === 'company') {
          localStorage.setItem('userId', data.user.companyId); // ✅ гол засвар
          localStorage.setItem('userName', data.user.companyName); // ✅ нэмэлт
        }
        localStorage.setItem('userData', JSON.stringify(data.user));

        if (role === 'tourist') {
          router.push('/user-profile-info');
        } else if (role === 'company') {
          router.push('/company-info');
        }
      } else {
        setMessage(data.message || 'Нэвтрэхэд алдаа гарлаа');
      }
    } catch (error) {
      setMessage('Сервертэй холбогдож чадсангүй');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="role-toggle">
          <button
            className={role === 'tourist' ? 'active' : ''}
            onClick={() => setRole('tourist')}
          >
            Аялагч
          </button>
          <button
            className={role === 'company' ? 'active' : ''}
            onClick={() => setRole('company')}
          >
            Компани
          </button>
        </div>

        <button className="social-button">📘 Facebook нэвтрэх</button>
        <button className="social-button">🔍 Google нэвтрэх</button>

        <h2 className="form-title">Нэвтрэх</h2>

        <input
          type="email"
          placeholder="И-мэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-button" onClick={handleLogin}>
          Нэвтрэх
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <span>Шинэ хэрэглэгч үү? </span>
          <button
            onClick={() => router.push('/register')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0a58ca',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '500',
            }}
          >
            Бүртгүүлэх
          </button>
        </div>

        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}
