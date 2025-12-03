import React, { useState } from 'react'; // useState imported
import { Navigate, useLocation, Link } from 'react-router-dom'; // Link imported
import { FaGoogle, FaSignInAlt, FaLock, FaEnvelope } from 'react-icons/fa'; // New icons imported
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
    // Destructure the new emailPasswordSignIn function
    const { user, googleSignIn, emailPasswordSignIn } = useAuth(); 
    
    // State for form fields and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // --- Email/Password Login Handler ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            // Call the new sign-in function
            await emailPasswordSignIn(email, password); 
            // Successful login leads to redirection via 'if (user)' block below
        } catch (err) {
            // Handle Firebase error codes
            let errorMessage = 'Login failed. Please check your credentials.';
            
            if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format.';
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } 

            console.error('Login Error:', err);
            setError(errorMessage); // Show error message in the UI
        }
    };
    // ------------------------------------

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log('Signed in user:', loggedUser);
                // Redirect handled by 'if (user)' check
            })
            .catch(error => {
                console.error('Google Sign-In Error:', error.message);
                setError('Google Sign-In failed. Please try again.');
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
            
            {/* Display error message */}
            {error && <p className="status-message error">{error}</p>}
            
            <form onSubmit={handleLogin} className="login-form">
                
                {/* Email Field */}
                <div className="input-group">
                    <FaEnvelope className="login-input-icon" />
                    <input 
                        type="email" 
                        placeholder="Email Address" // <--- PLACEHOLDER ADDED
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        // --- Autofill আটকানোর জন্য (ঐচ্ছিক) ---
                        autoComplete="off" 
                    />
                </div>

                {/* Password Field */}
                <div className="input-group">
                    <FaLock className="login-input-icon" />
                    <input 
                        type="password" 
                        placeholder="Password" // <--- PLACEHOLDER ADDED
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        // --- Autofill আটকানোর জন্য (ঐচ্ছিক) ---
                        autoComplete="off"
                    />
                </div>
                
                {/* Forget Password Link */}
                <div className="flex forget-password-link">
                    <Link to="/reset-password" className="text-sm text-gray-500 hover:text-orange-500 transition duration-150">
                        Forget Password?
                    </Link>
                </div>

                {/* Login Button */}
                <button type="submit" className="submit-btn">
                    <FaSignInAlt style={{ marginRight: '10px' }} />
                    Log In
                </button>
            </form>

            <div className="divider">
                <p>OR</p>
            </div>

            {/* Google Sign-In Button */}
            <button 
                onClick={handleGoogleSignIn} 
                className="google-sign-in-btn"
            >
                <FaGoogle style={{ marginRight: '10px' }} />
                Sign In with Google
            </button>
            
            {/* Link to Register */}
            <p className="mt-6 text-center text-sm">
                Don't have an account? 
                <Link to="/register" className="ml-2 text-orange-600 font-semibold hover:underline">
                    Register Here
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;