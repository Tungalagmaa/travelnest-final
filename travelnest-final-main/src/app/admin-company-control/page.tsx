'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ⛳ MongoDB structure-т тохируулсан type
type Company = {
  _id: string;
  company_name: string;
  email?: string;
  isApproved?: boolean;
};

export default function AdminCompanyList() {
  const [companies, setCompanies] = useState<Company[]>([]);

  // Компаниудыг ачааллах
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get<Company[]>('/api/companies');
      setCompanies(res.data);
    } catch (err) {
      console.error('Алдаа: Компаниудыг татаж чадсангүй', err);
    }
  };

  // Баталгаажуулах
  const approveCompany = async (id: string) => {
    try {
      await axios.put(`/api/companies/${id}/approve`);
      fetchCompanies();
    } catch (err) {
      console.error('Баталгаажуулахад алдаа:', err);
    }
  };

  // Устгах
  const deleteCompany = async (id: string) => {
    try {
      await axios.delete(`/api/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      console.error('Цуцлахад алдаа:', err);
    }
  };

  // Засах хуудас руу чиглүүлэх
  const updateCompany = (id: string) => {
    window.location.href = `/admin-company-edit/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">Компанийн бүртгэлүүд</h2>

      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company._id}
            className="bg-white rounded-lg px-6 py-4 shadow flex flex-col md:flex-row md:items-center justify-between"
          >
            {/* Компанийн мэдээлэл */}
            <div>
              <p className="text-lg font-semibold text-blue-900">{company.company_name}</p>
              <p className="text-sm text-gray-600">{company.email ?? 'И-мэйл оруулаагүй'}</p>
              {company.isApproved !== undefined && (
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                    company.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {company.isApproved ? 'Баталгаажсан' : 'Хүлээгдэж буй'}
                </span>
              )}
            </div>

            {/* Үйлдлийн товчлуурууд */}
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => updateCompany(company._id)}
                className="bg-blue-800 text-white px-4 py-1 rounded-full text-sm"
              >
                Засах
              </button>
              {!company.isApproved && (
                <button
                  onClick={() => approveCompany(company._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded-full text-sm"
                >
                  Баталгаажуулах
                </button>
              )}
              <button
                onClick={() => deleteCompany(company._id)}
                className="bg-red-600 text-white px-4 py-1 rounded-full text-sm"
              >
                Цуцлах
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
