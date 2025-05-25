'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './RegisterPage.css'; // custom css файл

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'company' | 'tourist'>('tourist');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Нууц үг таарахгүй байна');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          firstName,
          lastName,
          companyName,
          regNumber,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Амжилттай бүртгэгдлээ');
        const shouldGoToLogin = window.confirm('Амжилттай бүртгэгдлээ! Нэвтрэх хуудас руу очих уу?');
        if (shouldGoToLogin) {
          router.push('/login');
        }
      } else {
        setMessage(data.message || 'Алдаа гарлаа');
      }
    } catch (err) {
      setMessage('Сервертэй холбогдож чадсангүй');
    }
  };

  // ✅ JSX-г энд оруулна
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="role-toggle">
          <button
            className={role === 'company' ? 'active' : ''}
            onClick={() => setRole('company')}
          >
            Компани
          </button>
          <button
            className={role === 'tourist' ? 'active' : ''}
            onClick={() => setRole('tourist')}
          >
            Аялагч
          </button>
        </div>

        <button className="social-button">📘 Facebook эрхээр нэвтрэх</button>
        <button className="social-button">🔍 Google эрхээр нэвтрэх</button>

        <h2 className="form-title">Бүртгүүлэх хэсэг</h2>

        {role === 'tourist' && (
          <>
            <input
              type="text"
              placeholder="Овог"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Нэр"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        {role === 'company' && (
          <>
            <input
              type="text"
              placeholder="Компанийн нэр"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Регистрийн дугаар"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          placeholder="И-мэйл хаяг"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Нууц үг давтах"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="submit-button" onClick={handleRegister}>
          Бүртгүүлэх
        </button>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <span>Бүртгэлтэй хэрэглэгч үү? </span>
          <button
            type="button"
            onClick={() => router.push('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '500',
            }}
          >
            Нэвтрэх
          </button>
        </div>

        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
}
