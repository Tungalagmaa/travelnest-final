'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Нууц үг таарахгүй байна');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: params.token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Нууц үг амжилттай солигдлоо!');
        router.push('/login');
      } else {
        setMessage(data.message || 'Алдаа гарлаа');
      }
    } catch {
      setMessage('Сервертэй холбогдож чадсангүй');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleReset} style={{ background: 'white', padding: 30, borderRadius: 10 }}>
        <h2>Нууц үг шинэчлэх</h2>
        <input
          type="password"
          placeholder="Шинэ нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Дахин оруулна уу"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Шинэчлэх</button>
        {message && <p style={{ color: 'red' }}>{message}</p>}
      </form>
    </div>
  );
}
