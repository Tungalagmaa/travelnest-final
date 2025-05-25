// src/app/test/page.tsx

'use client';

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState("");

  const handleInsert = async () => {
    const res = await fetch("/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Naraa",
        email: "naraa@example.com",
        age: 22,
      }),
    });

    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={handleInsert}>Мэдээлэл оруулах</button>
      <pre>{result}</pre>
    </div>
  );
}
