import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { FaAngleRight, FaMapMarkerAlt, FaTag, FaCar, FaTrash, FaEdit, FaUser, FaPlusCircle, FaSpinner } from 'react-icons/fa';

import DeleteConfirmationModal from './DeleteConfirmationModal'; 


const OwnerVehicleCard = ({ vehicle, handleDeleteTrigger }) => {
    const navigate = useNavigate();

    return (
      
        <div className="owner-vehicle-row-card" data-aos="fade-up" data-aos-easing="ease-out-back">
            
           
            <div className="card-image-wrapper">
              
                <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="card-image-responsive" />
            </div>
            
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
                        onClick={() => handleDeleteTrigger(vehicle._id)} 
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
   
    const [fetchStatusMessage, setFetchStatusMessage] = useState(''); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [toast, setToast] = useState({ isOpen: false, type: '', message: '' });
   
    const fetchMyVehicles = async (email) => {
        if (!email) {
            setFetchStatusMessage('❌ User email not available to fetch vehicles.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setFetchStatusMessage('Loading your vehicles...');
        
        try {
            const response = await fetch(`https://travel-ease-server-five.vercel.app/my-products/${email}`); 
            
            if (!response.ok) {
                throw new Error('Failed to fetch data from server');
            }
            
            const data = await response.json();
            setVehicles(data);
    
            setFetchStatusMessage(''); 
        } catch (error) {
            console.error('Error fetching owner vehicles:', error);
          
            setFetchStatusMessage(`❌ Failed to load vehicles: ${error.message}. Is your backend running?`);
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
    
    // Function to show toast for a few seconds
    const showToast = (type, message) => {
        setToast({ isOpen: true, type, message });
        setTimeout(() => {
            setToast({ isOpen: false, type: '', message: '' });
        }, 3000);
    };

    // Trigger the Modal
    const handleDeleteTrigger = (vehicleId) => {
        setDeleteId(vehicleId);
        setIsModalOpen(true);
    };

    //  Deletion confirmed from Modal
    const handleConfirmDelete = async () => {
        if (!deleteId) return;

        setIsModalOpen(false); 
        
        showToast('info', 'Deleting vehicle...'); 
        
        try {
            const response = await fetch(`https://travel-ease-server-five.vercel.app/products/${deleteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(errorBody.message || 'Failed to delete the vehicle.');
            }
            
            const result = await response.json();
            
            if (result.deletedCount === 1) {
                showToast('success', 'Vehicle deleted successfully!');
            
                setVehicles(prevVehicles => prevVehicles.filter(v => v._id !== deleteId));
            } else {
                showToast('error', 'Deletion failed. Vehicle not found.');
            }

        } catch (error) {
            console.error("Delete failed:", error);
            showToast('error', `Deletion error: ${error.message}`);
        } finally {
            setDeleteId(null);
        }
    };


    return (
        <div className="all-vehicles-wrapper">
            <section className="latest-vehicles-section"> 
                 {/*  Header Title */}
                <h2 className="section-title" data-aos="fade-down" style={{ marginBottom: '20px' }}>
                     My Listed Vehicles
                </h2>
                
            
                <div className="owner-status-wrapper">
                    <p className="owner-status-info">
                        <FaUser style={{ marginRight: '5px' }} />
                        <strong>{user?.email}</strong>
                    </p>
                </div>
             
                {fetchStatusMessage && (
                    <p className={`status-message ${fetchStatusMessage.startsWith('❌') ? 'error' : 'info'}`}>
                        {fetchStatusMessage}
                    </p>
                )}
                
                {loading && <p className="loading-text"><FaSpinner className="spinner" />Loading your vehicles...</p>}
                
                {!loading && !fetchStatusMessage && vehicles.length === 0 && (
                    <div className="status-message info" style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', textAlign: 'center' }}>
                         <p>You have not listed any vehicles yet, or the owner email does not match the vehicles in the database.</p>
                         <Link to="/add-vehicle" className="submit-btn" style={{ maxWidth: '300px', margin: '15px auto', backgroundColor: '#1E40AF' }}>
                             <FaPlusCircle style={{ marginRight: '5px' }} /> Add your first vehicle!
                         </Link>
                    </div>
                )}
                
                {!loading && vehicles.length > 0 && (
                    <div className="my-vehicles-list"> 
                        {vehicles.map(vehicle => (
                            <OwnerVehicleCard 
                                key={vehicle._id} 
                                vehicle={vehicle} 
                                handleDeleteTrigger={handleDeleteTrigger} 
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* --- Confirmation Modal --- */}
            <DeleteConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                mode="confirm"
            />
            
            <DeleteConfirmationModal
                isOpen={toast.isOpen}
                onClose={() => setToast({ isOpen: false })}
                mode="status"
                statusType={toast.type}
                message={toast.message}
            />
        </div>
    );
};

export default MyVehicles;