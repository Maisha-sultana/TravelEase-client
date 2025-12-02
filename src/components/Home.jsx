import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="hero-section-container">
            {/* 1. Hero Content */}
            <div className="hero-content">
                <h1 className="hero-title">Your Next Adventure Starts Here</h1>
                <p className="hero-subtitle">
                    Find the perfect vehicle for your journey with **TravelEase**.
                </p>
                
                {/* 2. All Vehicles Button */}
                <Link to="/vehicles" className="hero-btn">
                    <FaCar style={{ marginRight: '10px' }} />
                    Explore All Vehicles
                </Link>
            </div>

            {/* 3. Optional: Slider/Video Background (CSS এ যুক্ত করা হবে) */}
            <div className="hero-background-overlay"></div>
        </div>
    );
};

export default Home;