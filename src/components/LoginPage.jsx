import React, { useState } from 'react'; 
import { Navigate, useLocation, Link } from 'react-router-dom'; 
import { FaGoogle, FaSignInAlt, FaLock, FaEnvelope, FaUserShield, FaUser } from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext'; 

const LoginPage = () => {
   
    const { user, googleSignIn, emailPasswordSignIn } = useAuth(); 
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleDemoLogin = (role) => {
        if (role === 'admin') {
            setEmail('admin@travelease.com');
            setPassword('Admin1234');
        } else {
            setEmail('user@demo.com');
            setPassword('User1234');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            await emailPasswordSignIn(email, password); 
        } catch (err) {
            let errorMessage = 'Login failed. Please check your credentials.';
            
            if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address format.';
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } 

            console.error('Login Error:', err);
            setError(errorMessage); 
        }
    };
 

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log('Signed in user:', loggedUser);
            })
            .catch(error => {
                console.error('Google Sign-In Error:', error.message);
                setError('Google Sign-In failed. Please try again.');
            });
    };

    if (user) {
        return <Navigate to={from} replace />;
    }

    return (
        <div className="login-page-container">
            <h2 className="login-title">
                <FaSignInAlt style={{ marginRight: '10px' }} />
                Log In to TravelEase
            </h2>
            
            {/* error message */}
            {error && <p className="status-message error">{error}</p>}

            {/* Demo Login Buttons Section */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                <button 
                    onClick={() => handleDemoLogin('admin')} 
                    className="submit-btn" 
                    style={{ backgroundColor: '#333', fontSize: '0.8em', padding: '8px' }}
                >
                    <FaUserShield style={{ marginRight: '5px' }} /> Demo Admin
                </button>
                <button 
                    onClick={() => handleDemoLogin('user')} 
                    className="submit-btn" 
                    style={{ backgroundColor: '#555', fontSize: '0.8em', padding: '8px' }}
                >
                    <FaUser style={{ marginRight: '5px' }} /> Demo User
                </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
                
                {/* Email Field */}
                <div className="input-group">
                    <FaEnvelope className="login-input-icon" />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off" 
                    />
                </div>

                {/* Password Field */}
                <div className="input-group">
                    <FaLock className="login-input-icon" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                
                {/* Forget Password Link */}
                <div className="flex forget-password-link">
                    <Link to="/reset-password" style={{ fontSize: '0.85em', color: '#666' }}>
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