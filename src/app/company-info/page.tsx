'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface Address {
  building: string
  district: string
  city: string
}

interface CompanyForm {
  email: string
  companyName: string
  phoneNumber: string
  website: string
  address: Address
}

export default function CompanyInfoPage() {
  const router = useRouter()
  const [companyId, setCompanyId] = useState<string>('')
  const [form, setForm] = useState<CompanyForm>({
    email: '',
    companyName: '',
    phoneNumber: '',
    website: '',
    address: {
      building: '',
      district: '',
      city: ''
    }
  })

  // localStorage-г зөвхөн useEffect дотор ашиглана
  useEffect(() => {
    const storedId = localStorage.getItem('userId')
    if (storedId) {
      setCompanyId(storedId)

      // Fetch company info
      axios
  .get<CompanyForm>(`/api/company/${storedId}`)
  .then(res => {
    setForm({
      ...res.data,
      address: res.data.address || { building: '', district: '', city: '' },
    });
  })
  .catch(() => alert('Мэдээлэл авахад алдаа гарлаа'));
}else {
      router.push('/login') // not logged in
    }
  }, [])

  // === Handle change ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (['building', 'district', 'city'].includes(name)) {
      setForm(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // === Submit ===
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.put(`/api/company/${companyId}`, form)
      alert('Мэдээлэл амжилттай шинэчлэгдлээ')
    } catch (error) {
      alert('Мэдээлэл шинэчлэхэд алдаа гарлаа')
      console.error(error)
    }
  }

  const navButtons = [
    { label: 'My company info', path: '/company-info' },
    { label: 'Add itinerary', path: '/company-add-itinerary' },
    { label: 'Approved requests', path: '/company-approved-requests' },
    { label: 'My trips', path: '/company-my-trips' },
    { label: 'Traveler requests', path: '/company-traveler-requests' }
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: '250px',
          backgroundColor: '#002D5B',
          color: 'white',
          padding: '20px'
        }}
      >
        <h3>Hello {form.companyName || 'Company'}</h3>
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          {navButtons.map((btn, index) => (
            <button
              key={index}
              style={navBtnStyle}
              onClick={() => router.push(btn.path)}
            >
              {btn.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px' }}>
        <h2>My company info</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '700px'
          }}
        >
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div style={rowStyle}>
            <div style={halfCol}>
              <label>Company name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={halfCol}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={halfCol}>
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={halfCol}></div>
          </div>

          <h3>Address</h3>
          <div style={rowStyle}>
            <div style={halfCol}>
              <label>Building</label>
              <input
                type="text"
                name="building"
                value={form.address.building}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={halfCol}>
              <label>District</label>
              <input
                type="text"
                name="district"
                value={form.address.district}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ ...halfCol, maxWidth: '50%' }}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.address.city}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{ ...buttonStyle, backgroundColor: '#002D5B', color: 'white' }}
          >
            Save changes
          </button>
        </form>
      </main>
    </div>
  )
}

// ======== STYLES ========
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginTop: '5px'
}

const navBtnStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: '#002D5B',
  border: 'none',
  padding: '10px',
  borderRadius: '20px',
  textAlign: 'left',
  cursor: 'pointer'
}

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer'
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px'
}

const halfCol: React.CSSProperties = {
  flex: 1
}
