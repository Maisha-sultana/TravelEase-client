import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaUser, FaTag, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaInfoCircle } from 'react-icons/fa';

// Component to display individual booking cards
const BookingCard = ({ booking }) => {
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'pending';
            case 'Confirmed':
                return 'confirmed';
            case 'Cancelled':
                return 'cancelled';
            default:
                return 'info';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed':
                return <FaCheckCircle style={{ color: 'green', marginRight: '5px' }} />;
            case 'Cancelled':
                return <FaTimesCircle style={{ color: 'red', marginRight: '5px' }} />;
            case 'Pending':
                return <FaHourglassHalf style={{ color: 'orange', marginRight: '5px' }} />;
            default:
                return <FaInfoCircle style={{ color: 'blue', marginRight: '5px' }} />;
        }
    };
    
    const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="booking-card-row" data-aos="fade-up">
            <div className="booking-content-area">
                <h3 className="booking-title">
                    <FaCar style={{ marginRight: '10px' }} />
                    {booking.vehicleName}
                </h3>
                
                <p className="booking-detail">
                    <FaTag style={{ marginRight: '5px' }} />
                    Category: <strong>{booking.category || 'N/A'}</strong>
                </p>
                
                <p className="booking-detail">
                    <FaUser style={{ marginRight: '5px' }} />
                    Owner Contact: <strong>{booking.ownerEmail}</strong>
                </p>
                
                <p className="booking-detail">
                    <FaCalendarAlt style={{ marginRight: '5px' }} />
                    Requested On: <strong>{bookingDate}</strong>
                </p>
                
                <p className="booking-price">
                    Daily Price: <strong>Tk {booking.pricePerDay}</strong>
                </p>
            </div>

            <div className={`booking-status-badge ${getStatusClass(booking.status)}`}>
                {getStatusIcon(booking.status)}
                Status: {booking.status}
            </div>
            
        </div>
    );
};


const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');

    // Function to fetch bookings by renter email
    const fetchMyBookings = async (email) => {
        if (!email) {
            setStatusMessage('❌ User email not available to fetch bookings.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setStatusMessage('Loading your booking requests...');
        
        try {
            // New endpoint targeting bookings by email
            const response = await fetch(`http://localhost:3000/my-bookings/${email}`); 
            
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            
            const data = await response.json();
            setBookings(data);
            setStatusMessage('');
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            setStatusMessage(`❌ Failed to load bookings: ${error.message}. Is your backend running?`);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Initial fetch
    useEffect(() => {
        if (user?.email) {
            fetchMyBookings(user.email);
        }
    }, [user]);


    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                <h2 className="section-title" data-aos="fade-down" style={{ marginBottom: '20px' }}>
                
                     My Booking Requests
                </h2>
                
                <div className="owner-status-wrapper">
                    <p className="owner-status-info">
                        <FaUser style={{ marginRight: '5px' }} />
                         <strong>{user?.email}</strong>
                    </p>
                </div>
                
                {statusMessage && statusMessage.startsWith('❌') && (
                    <p className="status-message error">
                        {statusMessage}
                    </p>
                )}
                
                {loading && <p className="loading-text">Loading your bookings...</p>}
                
                {!loading && bookings.length === 0 && !statusMessage.startsWith('❌') && (
                    <div className="status-message info" style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', textAlign: 'center' }}>
                         <p>You have not placed any booking requests yet.</p>
                    </div>
                )}
                
                {!loading && bookings.length > 0 && (
                    <div className="my-bookings-list">
                        {bookings.map(booking => (
                            <BookingCard 
                                key={booking._id} 
                                booking={booking} 
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyBookings;