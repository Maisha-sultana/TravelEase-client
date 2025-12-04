import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Added FaTrash and FaEdit icons for actions
import { FaAngleRight, FaMapMarkerAlt, FaTag, FaCar, FaTrash, FaEdit, FaUser } from 'react-icons/fa';

// Reusable Vehicle Card Component for the owner view
const OwnerVehicleCard = ({ vehicle, handleDelete }) => {
    const navigate = useNavigate();

    return (
        // Changed class to implement horizontal (row) layout
        <div className="owner-vehicle-row-card" data-aos="fade-up" data-aos-easing="ease-out-back">
            
            {/* 1. Left Side: Image */}
            <div className="card-image-wrapper">
                {/* New class for responsive image handling (object-fit: cover) */}
                <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image-responsive" />
            </div>
            
            {/* 2. Right Side: Details and Actions */}
            <div className="card-content-side">
                {/* Smaller title for the side content area */}
                <h3 className="card-title-small">{vehicle.vehicleName}</h3>
                
                <p className="card-category">
                    <FaTag style={{ marginRight: '5px' }} />
                    {vehicle.category}
                </p>
                
                <p className="card-location">
                    <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                    {vehicle.location}
                </p>
                
                <p className="card-price">
                    Daily Rent: Tk {vehicle.pricePerDay}
                </p>
                
                {/* Status Badge */}
                <p className={`status-badge ${vehicle.availability === 'Available' ? 'available' : 'booked'}`}>
                    {vehicle.availability}
                </p>
                
                {/* Action Buttons */}
                <div className="owner-actions-row">
                    <Link to={`/vehicles/${vehicle._id}`} className="owner-action-btn view-btn">
                        <FaAngleRight /> View Details
                    </Link>
                    <button 
                        onClick={() => navigate(`/update-vehicle/${vehicle._id}`)} 
                        className="owner-action-btn edit-btn"
                    >
                        <FaEdit /> Update
                    </button>
                    <button 
                        onClick={() => handleDelete(vehicle._id)} 
                        className="owner-action-btn delete-btn"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};


const MyVehicles = () => {
    const { user } = useAuth();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');

    // Function to fetch vehicles by owner email
    const fetchMyVehicles = async (email) => {
        if (!email) {
            setStatusMessage('❌ User email not available to fetch vehicles.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setStatusMessage('Loading your vehicles...');
        
        try {
            const response = await fetch(`http://localhost:3000/my-products/${email}`); 
            
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            
            const data = await response.json();
            setVehicles(data);
            setStatusMessage(data.length === 0 ? 'You have not listed any vehicles yet.' : '');
        } catch (error) {
            console.error('Error fetching owner vehicles:', error);
            setStatusMessage(`❌ Failed to load vehicles: ${error.message}. Is your backend running?`);
            setVehicles([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Initial fetch
    useEffect(() => {
        if (user?.email) {
            fetchMyVehicles(user.email);
        }
    }, [user]);

    // Delete handler
    const handleDelete = async (vehicleId) => {
        if (!window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
            return;
        }

        setStatusMessage('Deleting vehicle...');

        try {
            const response = await fetch(`http://localhost:3000/products/${vehicleId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the vehicle from the database.');
            }
            
            const result = await response.json();
            
            if (result.deletedCount === 1) {
                setStatusMessage('✅ Vehicle deleted successfully!');
                // Update the state to remove the deleted vehicle
                setVehicles(prevVehicles => prevVehicles.filter(v => v._id !== vehicleId));
            } else {
                setStatusMessage('❌ Deletion failed. Vehicle not found.');
            }

        } catch (error) {
            console.error("Delete failed:", error);
            setStatusMessage(`❌ Deletion error: ${error.message}`);
        }
    };


    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                 {/* 1. Header Title */}
                <h2 className="section-title" data-aos="fade-down" style={{ marginBottom: '20px' }}>
                    
                     My Listed Vehicles
                </h2>
                
                {/* 2. Owner Status Info (New Wrapper for width and centering) */}
                <div className="owner-status-wrapper">
                    <p className="owner-status-info">
                        <FaUser style={{ marginRight: '5px' }} />
                        <strong>{user?.email}</strong>
                    </p>
                </div>
                
                {statusMessage && (
                    <p className={`status-message ${statusMessage.startsWith('✅') ? 'success' : statusMessage.startsWith('❌') ? 'error' : 'info'}`}>
                        {statusMessage}
                    </p>
                )}
                
                {loading && <p className="loading-text">Loading your vehicles...</p>}
                
                {/* The grid now acts as a vertical stack for the new row cards */}
                {!loading && vehicles.length > 0 && (
                    <div className="latest-vehicles-grid">
                        {vehicles.map(vehicle => (
                            <OwnerVehicleCard 
                                key={vehicle._id} 
                                vehicle={vehicle} 
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyVehicles;