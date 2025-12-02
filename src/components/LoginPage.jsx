import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const LoginPage = () => {
    const { user, googleSignIn } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log('Signed in user:', loggedUser);
                // Redirect user after successful login
                // This redirect is handled automatically below via the 'user' check
            })
            .catch(error => {
                console.error('Google Sign-In Error:', error.message);
            });
    };

    // If the user is already logged in, redirect them away from the login page
    if (user) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="login-page-container">
            <h2 className="login-title">
                <FaSignInAlt style={{ marginRight: '10px' }} />
                Log In to TravelEase
            </h2>
            <div className="login-form">
                <p className="login-instruction">Please sign in to access My Vehicles and Bookings.</p>

                {/* Google Sign-In Button */}
                <button 
                    onClick={handleGoogleSignIn} 
                    className="google-sign-in-btn"
                >
                    <FaGoogle style={{ marginRight: '10px' }} />
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;