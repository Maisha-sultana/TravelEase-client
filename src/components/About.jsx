import React from 'react';
import { FaCar, FaUsers, FaShieldAlt } from 'react-icons/fa';

const About = () => (
    <div className="all-vehicles-wrapper" style={{ padding: '60px 20px' }}>
        <h2 className="section-title">About TravelEase</h2>
        <div className="info-box" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
            <p>TravelEase is Bangladesh's leading peer-to-peer vehicle rental marketplace. Our mission is to provide a seamless, secure, and affordable travel experience for everyone.</p>
            <div className="latest-vehicles-grid" style={{ marginTop: '40px' }}>
                <div className="stat-item"><FaCar size={40} color="#F97316" /><h3>500+ Vehicles</h3></div>
                <div className="stat-item"><FaUsers size={40} color="#F97316" /><h3>10k+ Users</h3></div>
                <div className="stat-item"><FaShieldAlt size={40} color="#F97316" /><h3>Verified Hosts</h3></div>
            </div>
        </div>
    </div>
);
export default About;