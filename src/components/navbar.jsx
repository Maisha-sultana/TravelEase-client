import React from 'react';
import { Link } from 'react-router-dom';
// FaSignOutAlt, FaUserCircle আমদানি করা হয়েছে
import { FaHome, FaCar, FaPlusCircle, FaSignInAlt, FaUserCircle, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'; // <-- FaSun, FaMoon ADDED
import { useAuth } from '../context/AuthContext'; 
import { useTheme } from '../context/ThemeContext'; // <-- NEW IMPORT

const Navbar = () => {
  const { user, logOut } = useAuth(); 
  const { theme, toggleTheme } = useTheme(); // <-- NEW CONTEXT

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'All Vehicles', path: '/vehicles', icon: FaCar },
    { name: 'Add Vehicle', path: '/add-vehicle', icon: FaPlusCircle },
    // Protected links: only visible if user is logged in
    { name: 'My Vehicles', path: '/my-vehicle', icon: FaCar, protected: true }, 
    { name: 'My Bookings', path: '/my-booking', icon: FaPlusCircle, protected: true }, 
  ];
  
  const handleLogOut = () => {
    // লগআউট সফল না হলে এরর দেখাবে
    logOut().catch((error) => console.error('Logout Error:', error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LEFT: Website Name/Logo */}
        <Link to="/" className="navbar-logo">
          **TravelEase**
        </Link>

        {/* CENTER: Navigation Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            // User লগইন করা থাকলে বা লিংকটি Protected না হলে দেখাবে
            (user || !link.protected) && (
              <Link key={link.name} to={link.path} className="nav-item nav-item-with-icon">
                <link.icon style={{ marginRight: '5px' }} />
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* RIGHT: Conditional Login/User Section */}
        <div className="nav-right-actions"> {/* <-- NEW WRAPPER */}
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle-btn">
                {theme === 'light' ? 
                    <FaMoon size={20} title="Switch to Dark Mode" /> : 
                    <FaSun size={20} title="Switch to Light Mode" style={{ color: '#F97316' }} />
                }
            </button>
            
            {user ? (
            // --- লগইন করা থাকলে: প্রোফাইল পিকচার এবং হোভার মেনু ---
            <div className="user-profile-menu"> 
              <div 
                className="user-photo-wrapper"
              >
                {/* User Photo URL থাকলে ছবি দেখাবে, না হলে আইকন দেখাবে */}
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="user-photo" />
                ) : (
                  <FaUserCircle className="user-icon" size={36} />
                )}
              </div>
              
              {/* ড্রপডাউন মেনু (CSS দিয়ে হোভার ইফেক্ট করা হবে) */}
              <div className="dropdown-content">
                <span className="user-display-name">
                    {/* ইউজারনেম না থাকলে ইমেইল দেখাবে */}
                    {user.displayName || user.email} 
                </span>
                <button onClick={handleLogOut} className="logout-btn-dropdown">
                    <FaSignOutAlt style={{ marginRight: '5px' }} />
                    LogOut
                </button>
              </div>
            </div>
          ) : (
            // --- লগইন না করা থাকলে: Login এবং Register বাটন ---
            <div className="auth-buttons">
              <Link to="/login" className="login-btn login-btn-with-icon">
                <FaSignInAlt style={{ marginRight: '5px' }} />
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;