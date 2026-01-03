import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const Privacy = () => (
    <div className="all-vehicles-wrapper" style={{ padding: '60px 20px' }}>
        <h2 className="section-title">Privacy Policy</h2>
        <div className="info-box" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <FaShieldAlt size={50} color="#F97316" />
            </div>
            <h3>1. Information We Collect</h3>
            <p className="description-text">We collect personal information such as your name, email, and booking history to provide a better rental experience.</p>
            
            <h3>2. How We Use Data</h3>
            <p className="description-text">Your data is primarily used to facilitate bookings and communicate between vehicle owners and renters.</p>
            
            <h3>3. Data Security</h3>
            <p className="description-text">We implement industry-standard security measures to protect your sensitive information from unauthorized access.</p>
        </div>
    </div>
);

export default Privacy;