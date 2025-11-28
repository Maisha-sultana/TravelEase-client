import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaPlusCircle, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'All Vehicles', path: '/vehicles', icon: FaCar },
    { name: 'Add Vehicle', path: '/add-vehicle', icon: FaPlusCircle },
    { name: 'My Vehicle', path: '/my-vehicle', icon: FaCar },
    { name: 'My Bookings', path: '/my-booking', icon: FaPlusCircle },
  ];

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
            <Link key={link.name} to={link.path} className="nav-item nav-item-with-icon">
              <link.icon style={{ marginRight: '5px' }} />
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: Login Button */}
        <div>
          <Link to="/login" className="login-btn login-btn-with-icon">
            <FaSignInAlt style={{ marginRight: '5px' }} />
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;