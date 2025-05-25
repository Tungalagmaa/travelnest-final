'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const [isCompany, setIsCompany] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Login toggle */}
        <div className="flex border border-[#0A2342] rounded-full overflow-hidden mb-6">
          <button
            onClick={() => setIsCompany(true)}
            className={`flex-1 px-4 py-2 text-sm font-semibold ${
              isCompany ? 'bg-[#0A2342] text-white' : 'text-[#0A2342]'
            }`}
          >
            Компани
          </button>
          <button
            onClick={() => setIsCompany(false)}
            className={`flex-1 px-4 py-2 text-sm font-semibold ${
              !isCompany ? 'bg-[#0A2342] text-white' : 'text-[#0A2342]'
            }`}
          >
            Аялагч
          </button>
        </div>

        <h2 className="text-center text-2xl font-bold mb-6 text-[#0A2342]">Нэвтрэх</h2>

        {/* Social buttons */}
        <div className="space-y-4">
          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-full gap-2 hover:bg-gray-100">
            <Image src="/facebook-icon.png" alt="Facebook" width={20} height={20} />
            <span>Facebook эрхээр нэвтрэх</span>
          </button>
          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-full gap-2 hover:bg-gray-100">
            <Image src="/google-icon.png" alt="Google" width={20} height={20} />
            <span>Google эрхээр нэвтрэх</span>
          </button>
        </div>

        <div className="w-full my-6 h-[1px] bg-gray-300" />

        {/* Form */}
        <form className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Овогоо оруулна уу."
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Нэрээ оруулна уу."
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <input
            type="email"
            placeholder="И-мэйл хаягаа оруулна уу."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="w-full bg-[#0A2342] text-white py-2 rounded-full font-semibold hover:bg-[#081b33]"
          >
            Бүртгүүлэх
          </button>
        </form>
      </div>
    </div>
  );
}
