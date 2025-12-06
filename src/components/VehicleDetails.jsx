import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaMapMarkerAlt, FaTag, FaUserCircle, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
const VehicleDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
    
    const features = [
        { name: 'Air Conditioning', icon: FaCar },
        { name: 'GPS Navigation', icon: FaMapMarkerAlt },
        { name: 'Bluetooth Audio', icon: FaTag },
        { name: 'Unlimited Mileage', icon: FaCheckCircle },
        { name: 'Free Cancellation', icon: FaTimesCircle },
    ];

    useEffect(() => {
        setLoading(true);
        setStatusMessage('');
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Vehicle not found or server error');
                }
                return res.json();
            })
            .then(data => {
                setVehicle(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setStatusMessage(`❌ Error: ${error.message}. Invalid ID or Vehicle Not Found.`);
                setLoading(false);
            });
    }, [id]);

    const handleBookNow = async () => {
        if (!user) {
            setStatusMessage(' You must be logged in to book a vehicle.');
            return navigate('/login', { state: { from: location } });
        }
        
        setStatusMessage('Submitting booking request...');

        const bookingData = {
            vehicleId: vehicle._id,
            vehicleName: vehicle.vehicleName,
            renterEmail: user.email,
            renterName: user.displayName || 'Guest User',
            ownerEmail: vehicle.userEmail,
            pricePerDay: vehicle.pricePerDay,
            bookingDate: new Date().toISOString(),
            status: 'Pending', 
        };

        try {
            const response = await fetch('http://localhost:3000/bookings', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (result.insertedId) {
                setStatusMessage('✅ Request successfully sent! The owner will contact you soon.');
                
            } else {
                setStatusMessage('❌ Failed to save booking request to database.');
            }

        } catch (error) {
            console.error("Booking post failed:", error);
            setStatusMessage(`❌ Network error: ${error.message}`);
        }
    };


    if (loading) {
       return (
             <div className="vehicle-details-wrapper" style={{ padding: '40px', textAlign: 'center' }}>
                <p className="loading-text">
                    <FaSpinner className="spinner" /> Loading vehicle details...
                </p>
            </div>
        );
    }

    if (!vehicle) {
        return <div className="vehicle-details-container"><p className="status-message error">{statusMessage}</p></div>;
    }


    return (
        <div className="vehicle-details-wrapper">
            <div className="details-card">
                
                {/*  Header and Image */}
                <div className="details-header">
                    <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="details-image" />
                    <div className="header-content">
                        <h1 className="details-title">{vehicle.vehicleName}</h1>
                        <p className="details-price">
                            Tk {vehicle.pricePerDay} <span className="per-day-text">/ day</span>
                        </p>
                    </div>
                </div>

                {/* Main Info and Booking Panel */}
                <div className="details-body">
                    
                    <div className="details-info-panel">
                        <div className="info-box">
                            <h2>Description</h2>
                            <p className="description-text">{vehicle.description || "A wonderful vehicle ready for your next adventure. Contact the owner for more details."}</p>
                        </div>
                        
                        <div className="info-box features-section">
                            <h2>Key Features</h2>
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <feature.icon style={{ marginRight: '10px', color: '#F97316' }} />
                                        <span>{feature.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="details-sidebar">
                        
                        {/* Owner Info */}
                        <div className="owner-box">
                            <FaUserCircle className="owner-icon" />
                            <h3 className="owner-name">Listed by: {vehicle.owner}</h3>
                            <p className="owner-email">Contact: {vehicle.userEmail}</p>
                          <p className="owner-joined">
                                <FaCalendarAlt style={{ marginRight: '5px' }} />
                               
                                Listed on: {format(new Date(vehicle.createdAt), 'MMM d, yyyy')}
                            </p>
                        </div>

                        {/* Booking Section */}
                        <div className="booking-box">
                            <h3>Ready to Ride?</h3>
                            
                            <p className="status-message">
                                {statusMessage}
                            </p>

                            <button 
                                onClick={handleBookNow} 
                                className="book-now-btn"
                                disabled={statusMessage.startsWith('✅')}
                            >
                                <FaCar style={{ marginRight: '10px' }} />
                                {statusMessage.includes('Submitting') ? 'Processing...' : 'Book Now / Request Ride'}
                            </button>

                            <p className="booking-note">
                                *This is a booking request only. Final confirmation will come from the owner via email.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;