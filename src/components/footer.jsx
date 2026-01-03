import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebook, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedin, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaMapMarkerAlt,
    FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const websiteName = 'TravelEase';

  return (
    <footer className="footer-main">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-brand-sec">
          <h2 className="footer-logo">{websiteName}</h2>
          <p className="footer-desc">
            Your premier platform for seamless vehicle rentals. Connecting local owners with adventurers and travelers worldwide.
          </p>
          <div className="footer-social-wrapper">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links with Hover Effect */}
        <div className="footer-links-sec">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-ul">
            <li><Link to="/" className="footer-link"><FaArrowRight className="link-icon" /> Home</Link></li>
            <li><Link to="/vehicles" className="footer-link"><FaArrowRight className="link-icon" /> All Vehicles</Link></li>
            <li><Link to="/add-vehicle" className="footer-link"><FaArrowRight className="link-icon" /> List Your Ride</Link></li>
            <li><Link to="/my-booking" className="footer-link"><FaArrowRight className="link-icon" /> My Bookings</Link></li>
          </ul>
        </div>

        {/* Contact Info with Style */}
        <div className="footer-contact-sec">
          <h4 className="footer-heading">Contact Us</h4>
          <div className="contact-item">
            <div className="contact-icon-box"><FaEnvelope /></div>
            <span>support@travelease.com</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box"><FaPhoneAlt /></div>
            <span>+880 1234-567890</span>
          </div>
          <div className="contact-item">
            <div className="contact-icon-box"><FaMapMarkerAlt /></div>
            <span>Banani, Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} <strong>{websiteName}</strong>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;