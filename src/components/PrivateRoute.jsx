import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p className="loading-text" style={{ padding: '40px' }}>Loading authentication status...</p>;
    }

    if (user) {
        return children;
    }

    return (
        <div className="login-page-container">
            <h2 className="login-title" style={{color: '#EF4444'}}>
                <FaLock style={{ marginRight: '10px' }} />
                Access Restricted
            </h2>
            <p className="login-instruction" style={{ marginBottom: '20px' }}>
                You must be logged in to view this page.
            </p>
            <Navigate to="/login" state={{ from: location }} replace />
        </div>
    );
};

export default PrivateRoute;