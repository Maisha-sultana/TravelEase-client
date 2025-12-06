import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaSignInAlt, FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const passwordRegex = {
    uppercase: /(?=.*[A-Z])/, 
    lowercase: /(?=.*[a-z])/, 
    length: /.{6,}/, 
};

// Error messages
const passwordErrorMessages = {
    uppercase: "Must have an Uppercase letter.",
    lowercase: "Must have a Lowercase letter.",
    length: "Length must be at least 6 characters.",
};

const RegisterPage = () => {
   
    const { registerUser, googleSignIn } = useAuth(); 
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
 
    const [passwordValidity, setPasswordValidity] = useState({
        uppercase: true, 
        lowercase: true,
        length: true
    });

 
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        
        setPasswordValidity({
            uppercase: passwordRegex.uppercase.test(newPassword),
            lowercase: passwordRegex.lowercase.test(newPassword),
            length: passwordRegex.length.test(newPassword),
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all required fields (Name, Email, Password).');
            return;
        }

        if (!passwordValidity.uppercase || !passwordValidity.lowercase || !passwordValidity.length) {
            setError('Please fix the password errors below before submitting.');
            return;
        }

        try {
         
            await registerUser(email, password, name, photoURL);
            
            navigate('/'); 

        } catch (err) {
            let errorMessage = 'Registration failed.';
            
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'This email address is already in use.';
            } else if (err.code === 'auth/weak-password') {
             
                errorMessage = 'Password is too weak. Please use a stronger one.'; 
            } else {
                errorMessage = `Registration failed: ${err.message}`;
            }

            console.error('Registration Error:', err);
            setError(errorMessage);
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Google Sign-In Error:', error.message);
                setError('Google Sign-In failed. Please try again.');
            });
    };

    return (
        <div className="login-page-container"> 
            <h2 className="login-title">
                <FaUser style={{ marginRight: '10px' }} />
                Register for TravelEase
            </h2>
         
            {error && <p className="status-message error">{error}</p>}
            
            <form onSubmit={handleRegistration} className="login-form">
                
                {/* Name Field */}
                <div className="input-group">
                    <FaUser className="login-input-icon" />
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/*  Email Field */}
                <div className="input-group">
                    <FaEnvelope className="login-input-icon" />
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                 {/* Photo URL Field */}
                <div className="input-group">
                    <FaImage className="login-input-icon" />
                    <input 
                        type="text" 
                        placeholder="Photo URL (Optional)" 
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                </div>

                {/*  Password Field */}
                <div className="input-group">
                    <FaLock className="login-input-icon" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                {/* Password Validation Feedback */}
                <ul className="password-feedback">
                    <li className={passwordValidity.uppercase ? 'valid' : 'invalid'}>
                        {passwordErrorMessages.uppercase}
                    </li>
                    <li className={passwordValidity.lowercase ? 'valid' : 'invalid'}>
                        {passwordErrorMessages.lowercase}
                    </li>
                    <li className={passwordValidity.length ? 'valid' : 'invalid'}>
                        {passwordErrorMessages.length}
                    </li>
                </ul>
                
                
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={
                        !passwordValidity.uppercase || 
                        !passwordValidity.lowercase || 
                        !passwordValidity.length
                    }
                >
                    <FaSignInAlt style={{ marginRight: '10px' }} />
                    Register
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
            
            {/* Link to Login */}
            <p className="mt-6 text-center text-sm">
                Already have an account? 
                <Link to="/login" className="ml-2 text-orange-600 font-semibold hover:underline">
                    Login Here
                </Link>
            </p>
        </div>
    );
};

export default RegisterPage;