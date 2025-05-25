'use client'
import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './admin.module.css';

const Admin: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="admin-greeting">Hello Admin!</div>
            <div className="dashboard">
                <button className="dashboard-btn" onClick={() => window.location.href = 'admincompanylist.html'}>
                    <img src="/public/picture-source/admin1.jpg" alt="Company Control" />
                    <h2>Компанийн хяналт</h2>
                </button>

                <button className="dashboard-btn" onClick={() => window.location.href = 'adminitinarylist.html'}>
                    <img src="/public/picture-source/admin2.jpg" alt="Request Control" />
                    <h2>Хүсэлтүүдийн хяналт</h2>
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
