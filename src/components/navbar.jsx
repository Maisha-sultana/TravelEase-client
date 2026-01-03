import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { 
    FaHome, FaCar, FaSignInAlt, FaUserCircle, 
    FaSignOutAlt, FaSun, FaMoon, FaBars, FaChartPie,
    FaInfoCircle, FaEnvelope , FaShieldAlt, FaUserPlus
} from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext'; 
import { useTheme } from '../context/ThemeContext'; 

const Navbar = () => {
  const { user, logOut } = useAuth(); 
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'All Vehicles', path: '/vehicles', icon: FaCar },
    { name: 'About', path: '/about', icon: FaInfoCircle }, 
    { name: 'Contact', path: '/contact', icon: FaEnvelope }, 
    { name: 'Privacy', path: '/privacy', icon: FaShieldAlt }, 
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">TravelEase</Link>
        
        <button className="menu-toggle-btn" onClick={toggleMenu}>
            <FaBars size={20} />
        </button>

        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="nav-item nav-item-with-icon"
              onClick={() => setMenuOpen(false)}
            >
              <link.icon style={{ marginRight: '5px' }} />
              {link.name}
            </Link>
          ))}
        
          <div className="nav-mobile-actions">
            {user ? (
                <>
                    <Link to="/dashboard" className="login-btn-mobile" onClick={() => setMenuOpen(false)}>
                        <FaChartPie style={{ marginRight: '5px' }} /> Dashboard
                    </Link>
                    <button onClick={logOut} className="logout-btn-mobile">
                        <FaSignOutAlt style={{ marginRight: '5px' }} /> LogOut
                    </button>
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/login" className="login-btn-mobile" onClick={() => setMenuOpen(false)}>
                        <FaSignInAlt style={{ marginRight: '5px' }} /> Login
                    </Link>
                  
                    <Link to="/register" className="register-btn-mobile" style={{ textAlign: 'center', color: 'white', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
                        <FaUserPlus style={{ marginRight: '5px' }} /> Register
                    </Link>
                </div>
            )}
          </div>
        </div>

        <div className="nav-right-actions nav-desktop-actions"> 
            <button onClick={toggleTheme} className="theme-toggle-btn">
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} style={{ color: '#F97316' }} />}
            </button>
            
            {user ? (
            <div className="user-profile-menu"> 
              <div className="user-photo-wrapper">
                {user.photoURL ? <img src={user.photoURL} alt="User" className="user-photo" /> : <FaUserCircle size={36} />}
              </div>
           
              <div className="dropdown-content">
                <span className="user-display-name">{user.displayName || user.email}</span>
                <Link to="/dashboard" className="nav-item" style={{ color: 'var(--text-color)', padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <FaChartPie style={{ marginRight: '10px' }} /> Dashboard
                </Link>
                <button onClick={logOut} className="logout-btn-dropdown">
                    <FaSignOutAlt style={{ marginRight: '5px' }} /> LogOut
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to="/login" className="login-btn login-btn-with-icon">
                    <FaSignInAlt style={{ marginRight: '5px' }} /> Login
                </Link>
           
                <Link to="/register" className="nav-item" style={{ display: 'flex', textDecoration: 'none', fontWeight: '600' }}>
                    <FaUserPlus className='mr-2 mt-1'/> Register
                </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;