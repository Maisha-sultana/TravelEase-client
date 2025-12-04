import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-box" data-aos="zoom-in">
                <FaExclamationTriangle className="not-found-icon" />
                <h1 className="not-found-title">404 - Page Not Found</h1>
                <p className="not-found-text">
                    The requested page could not be located. It might have been moved or deleted.
                </p>
                <Link to="/" className="not-found-btn">
                    <FaHome style={{ marginRight: '10px' }} />
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;