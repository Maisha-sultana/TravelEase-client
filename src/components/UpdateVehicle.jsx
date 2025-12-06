import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUpload, FaCar, FaEdit, FaSave, FaSpinner, FaArrowLeft } from 'react-icons/fa';

const IMGBB_API_KEY = "13cca8a4dab765b31c52f70f5a09a05f"; 
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;


const UpdateVehicle = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [initialFetchError, setInitialFetchError] = useState('');


    useEffect(() => {
        if (!id) {
            setInitialFetchError('❌ No vehicle ID provided for update.');
            setLoading(false);
            return;
        }

        fetch(`https://travel-ease-server-five.vercel.app/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Vehicle data not found or access denied');
                }
                return res.json();
            })
            .then(data => {
                // Pre-fill state with fetched data
                setVehicleData({
                    ...data,
                  
                    pricePerDay: data.pricePerDay.toString(), 
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Initial Fetch Error:', error);
                setInitialFetchError(`❌ Failed to load vehicle data: ${error.message}`);
                setLoading(false);
            });
    }, [id]);


    //  Form Changes
    const handleChange = (e) => {
        setVehicleData({
            ...vehicleData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].size > 5 * 1024 * 1024) { 
                 setStatusMessage('❌ Image file size must be under 5MB for upload.');
                 setImageFile(null);
                 return;
            }
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file) => {
        if (!file) return vehicleData.coverImage; 
        
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            setUploading(true);
            setStatusMessage('Image uploading to ImgBB...');
            
            const response = await fetch(IMGBB_UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });
            
            const result = await response.json();
            
            if (result.success) {
                setUploading(false);
                setStatusMessage('Image upload complete! Preparing to save data...');
                return result.data.url;
            } else {
                throw new Error(`ImgBB API Error: ${result.status_code || response.status} - ${result.error?.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("❌ ImgBB Upload Failed:", error);
            setUploading(false);
            setStatusMessage(`❌ Image upload failed: ${error.message}.`);
            return null; 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('Starting update process...');

        if (!user || user.email !== vehicleData.userEmail) {
            setStatusMessage('❌ Security Error: You do not have permission to edit this vehicle.');
            return;
        }

      
        const coverImageUrl = await uploadImage(imageFile);

        if (!coverImageUrl) {
            setStatusMessage('❌ Image processing failed. Update cancelled.');
            return;
        }

        const updatedVehicleData = {
            ...vehicleData,
            pricePerDay: parseFloat(vehicleData.pricePerDay), 
            coverImage: coverImageUrl, 
        };
  
        delete updatedVehicleData._id; 

        setStatusMessage('Saving updated vehicle data to MongoDB...');
        
        try {
            // request to the backend
            const response = await fetch(`https://travel-ease-server-five.vercel.app/products/${id}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedVehicleData),
            });
            
            if (!response.ok) {
                 const errorText = await response.text();
                 throw new Error(`Server returned status ${response.status}: ${errorText}`);
            }
            
            setStatusMessage('✅ Vehicle updated successfully!');
        
        } catch (error) {
            console.error("❌ MongoDB/API Put Failed:", error);
            setStatusMessage(`❌ Update failed: ${error.message}.`);
        }
    };


    if (loading) {
        return (
            <div className="add-vehicle-container" style={{ textAlign: 'center' }}>
                <p className="loading-text">
                   <FaSpinner className="spinner" />
                    Loading vehicle data...
                </p>
              
            </div>
        );
    }
    
    if (initialFetchError) {
        return (
            <div className="add-vehicle-container">
                <p className="status-message error">{initialFetchError}</p>
                 <button onClick={() => navigate('/my-vehicle')} className="submit-btn" style={{ backgroundColor: '#333' }}>
                    <FaArrowLeft style={{ marginRight: '10px' }} />
                    Go back to My Vehicles
                </button>
            </div>
        );
    }

    if (user.email !== vehicleData.userEmail) {
        return (
            <div className="add-vehicle-container">
                <p className="status-message error">❌ Access Denied: You are not the owner of this vehicle.</p>
            </div>
        );
    }


    return (
        <div className="add-vehicle-container">
            <h2 className="add-vehicle-title">
                <FaEdit style={{ marginRight: '10px' }} />
                Update Vehicle Details ({vehicleData.vehicleName})
            </h2>
            
            <div className="status-message info" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <p>Owner: **{vehicleData.owner || 'N/A'}**</p>
                <p>Email: **{vehicleData.userEmail || 'N/A'}**</p>
            </div>


            <form onSubmit={handleSubmit} className="add-vehicle-form">
                
                {/* Current Image Preview */}
                 <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <img 
                        src={imageFile ? URL.createObjectURL(imageFile) : vehicleData.coverImage} 
                        alt="Current Cover" 
                        style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                    <p style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
                        {imageFile ? `New file selected: ${imageFile.name}` : `Current Image URL`}
                    </p>
                </div>


                {/*  Vehicle Name */}
                <input 
                    type="text" 
                    name="vehicleName" 
                    placeholder="Vehicle Name"
                    onChange={handleChange}
                    value={vehicleData.vehicleName || ''} 
                    required 
                />
                
                {/* Category & Price */}
                <div className="form-row">
                    {/* Category Dropdown */}
                    <select 
                        name="category" 
                        onChange={handleChange}
                        required 
                        value={vehicleData.category} 
                        className="form-select" 
                    >
                        <option value="" disabled>Select Vehicle Category</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Electric">Electric</option>
                        <option value="Van">Van / Minibus</option>
                        <option value="Truck">Truck / Hauler</option>
                        <option value="Motorcycle">Motorcycle</option>
                    </select>

                    <input 
                        type="number" 
                        name="pricePerDay" 
                        placeholder="Price per Day (Tk)"
                        onChange={handleChange}
                        value={vehicleData.pricePerDay || ''} 
                        required 
                    />
                </div>

                {/*  Location & Availability */}
                <div className="form-row">
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Location"
                        onChange={handleChange}
                        value={vehicleData.location || ''} 
                        required 
                    />
                     {/* Availability Dropdown */}
                    <select 
                        name="availability" 
                        onChange={handleChange}
                        required 
                        value={vehicleData.availability} 
                        className="form-select" 
                    >
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                    </select>
                </div>


                {/*  Description */}
                <textarea 
                    name="description" 
                    placeholder="Description"
                    onChange={handleChange}
                    value={vehicleData.description || ''} 
                    rows="4"
                    required
                ></textarea>

                {/* Cover Image Upload  */}
                <div className="file-input-wrapper">
                    <label htmlFor="coverImage" className="file-label">
                        <FaUpload style={{ marginRight: '10px' }} />
                        {imageFile ? `Replace with: ${imageFile.name}` : "Select New Image (Optional)"}
                    </label>
                    <input 
                        type="file" 
                        id="coverImage" 
                        name="coverImage" 
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                
            
                <p className={`status-message ${statusMessage.startsWith('✅') ? 'success' : statusMessage.startsWith('❌') ? 'error' : 'info'}`}>
                    {statusMessage || `Ready to update vehicle: ${vehicleData.vehicleName}`}
                </p>
                
                <button 
                    type="submit" 
                    disabled={uploading || statusMessage.includes('Saving')} 
                    className="submit-btn"
                >
                    <FaSave style={{ marginRight: '10px' }} />
                    {uploading ? `Uploading Image...` : statusMessage.includes('Saving') ? 'Saving Updates...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default UpdateVehicle;