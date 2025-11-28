import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const websiteName = 'TravelEase';

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Copyright Text */}
        <p className="copyright-text">
          &copy; {currentYear} **{websiteName}**. All Rights Reserved.
        </p>
        
        {/* Social Links */}
        <div className="social-links">
          <a href="#" className="social-icon" title="Facebook"><FaFacebook size={20} /></a>
          <a href="#" className="social-icon" title="Twitter"><FaTwitter size={20} /></a>
          <a href="#" className="social-icon" title="Instagram"><FaInstagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;