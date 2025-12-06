import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { 
    FaHome, 
    FaCar, 
    FaPlusCircle, 
    FaSignInAlt, 
    FaUserCircle, 
    FaSignOutAlt, 
    FaSun, 
    FaMoon, 
    FaBars, 
    FaCalendarAlt 
} from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext'; 
import { useTheme } from '../context/ThemeContext'; 

const Navbar = () => {
  const { user, logOut } = useAuth(); 
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Toggle function for the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  const navLinks = [
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'All Vehicles', path: '/vehicles', icon: FaCar },
    { name: 'Add Vehicle', path: '/add-vehicle', icon: FaPlusCircle, protected: true }, 
 
    { name: 'My Vehicles', path: '/my-vehicle', icon: FaCar, protected: true }, 
    { name: 'My Bookings', path: '/my-booking', icon: FaCalendarAlt, protected: true }, 
  ];
  
  const handleLogOut = () => {
    logOut().catch((error) => console.error('Logout Error:', error));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
   
        <Link to="/" className="navbar-logo">
          TravelEase
        </Link>
        
        {/* Mobile Menu Button (Hamburger) */}
        <button className="menu-toggle-btn" onClick={toggleMenu}>
            <FaBars size={20} />
        </button>

        <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            (user || !link.protected) && (
              <Link 
                key={link.name} 
                to={link.path} 
                className="nav-item nav-item-with-icon"
                onClick={() => setMenuOpen(false)} // Close menu on link click
              >
                <link.icon style={{ marginRight: '5px' }} />
                {link.name}
              </Link>
            )
          ))}
        
        <div className="nav-mobile-actions">
             <button onClick={toggleTheme} className="theme-toggle-btn-mobile">
                {theme === 'light' ? 
                    <><FaMoon style={{ marginRight: '5px' }} /> Switch to Dark Mode</> : 
                    <><FaSun style={{ marginRight: '5px', color: '#F97316' }} /> Switch to Light Mode</>
                }
            </button>
            
            {user ? (
                <button onClick={handleLogOut} className="logout-btn-mobile">
                    <FaSignOutAlt style={{ marginRight: '5px' }} />
                    LogOut ({user.displayName || user.email})
                </button>
            ) : (
                <>
                    <Link to="/login" className="login-btn-mobile" onClick={() => setMenuOpen(false)}>
                        <FaSignInAlt style={{ marginRight: '5px' }} />
                        Login
                    </Link>
                    <Link to="/register" className="register-btn-mobile" onClick={() => setMenuOpen(false)}>
                        Register
                    </Link>
                </>
            )}
        </div>
        </div>

        {/* Desktop Right Actions (Hidden on mobile) */}
        <div className="nav-right-actions nav-desktop-actions"> 
  
            <button onClick={toggleTheme} className="theme-toggle-btn">
                {theme === 'light' ? 
                    <FaMoon size={20} title="Switch to Dark Mode" /> : 
                    <FaSun size={20} title="Switch to Light Mode" style={{ color: '#F97316' }} />
                }
            </button>
            
            {user ? (
            <div className="user-profile-menu"> 
              <div 
                className="user-photo-wrapper"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="user-photo" />
                ) : (
                  <FaUserCircle className="user-icon" size={36} />
                )}
              </div>
           
              <div className="dropdown-content">
                <span className="user-display-name">
                    {user.displayName || user.email} 
                </span>
                <button onClick={handleLogOut} className="logout-btn-dropdown">
                    <FaSignOutAlt style={{ marginRight: '5px' }} />
                    LogOut
                </button>
              </div>
            </div>
          ) : (
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