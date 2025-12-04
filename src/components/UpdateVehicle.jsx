import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

const UpdateVehicle = () => {
    const { id } = useParams();

    return (
        <div className="add-vehicle-container"> {/* Reusing the layout class */}
            <h2 className="add-vehicle-title">
                <FaEdit style={{ marginRight: '10px' }} />
                Update Vehicle Details
            </h2>
            
            <div className="status-message info" style={{ marginBottom: '30px' }}>
                <p>Functionality for updating vehicle **{id}** goes here.</p>
                <p>You can now fetch the vehicle data using this ID and populate the form.</p>
            </div>

            <Link to="/my-vehicle" className="submit-btn" style={{ backgroundColor: '#1E40AF' }}>
                <FaArrowLeft style={{ marginRight: '10px' }} />
                Go back to My Vehicles
            </Link>
        </div>
    );
};

export default UpdateVehicle;