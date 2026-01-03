import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for reaching out! We will get back to you soon.");
    };

    return (
        <div className="all-vehicles-wrapper" style={{ padding: '60px 20px' }}>
            <h2 className="section-title" data-aos="fade-down">Contact Us</h2>
            <div className="details-body" style={{ gap: '40px' }}>
                {/* Contact Form */}
                <div className="info-box" style={{ flex: 1 }}>
                    <h3>Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="add-vehicle-form" style={{ boxShadow: 'none', padding: 0 }}>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Email Address" required />
                        <textarea placeholder="How can we help you?" rows="5" required></textarea>
                        <button type="submit" className="submit-btn">
                            <FaPaperPlane style={{ marginRight: '10px' }} /> Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info Sidebar */}
                <div className="details-sidebar" style={{ flex: 1 }}>
                    <div className="owner-box">
                        <FaMapMarkerAlt className="owner-icon" />
                        <h3 className="owner-name">Our Office</h3>
                        <p className="owner-email">Banani, Dhaka, Bangladesh</p>
                    </div>
                    <div className="owner-box">
                        <FaPhoneAlt className="owner-icon" />
                        <h3 className="owner-name">Call Us</h3>
                        <p className="owner-email">+880 1234-567890</p>
                    </div>
                    <div className="owner-box">
                        <FaEnvelope className="owner-icon" />
                        <h3 className="owner-name">Email Support</h3>
                        <p className="owner-email">support@travelease.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;