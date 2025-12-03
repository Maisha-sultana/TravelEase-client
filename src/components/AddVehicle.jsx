import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
// শুধুমাত্র Fa আইকনগুলো আমদানি করা হলো
import { FaUpload, FaCar, FaPlusCircle } from 'react-icons/fa'; 

// ✅ FIX: আপনার সরবরাহ করা সঠিক ImgBB API Key
const IMGBB_API_KEY = "13cca8a4dab765b31c52f70f5a09a05f"; 
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;


const AddVehicle = () => {
    const { user } = useAuth();
    const [vehicleData, setVehicleData] = useState({
        vehicleName: '',
        category: '', 
        pricePerDay: '',
        location: '',
        availability: 'Available', 
        description: '',
    });
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

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

    // --- 1. ImgBB API দ্বারা ছবি আপলোড ---
    const uploadImage = async (file) => {
        if (!file) return null;
        
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
                const url = result.data.url;
                setStatusMessage('Image upload complete! Preparing to save data...');
                return url;
            } else {
                 // যদি ImgBB 400 দেয়, তবে এটি সম্ভবত Key না হয় File Format এর সমস্যা
                throw new Error(`ImgBB API Error: ${result.status_code || response.status} - ${result.error?.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("❌ ImgBB Upload Failed:", error);
            setUploading(false);
            setStatusMessage(`❌ Image upload failed: ${error.message}.`);
            return null;
        }
    };
    // ----------------------------------------------------

    // --- 2. Form Submission and MongoDB Data Saving Logic ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
             setStatusMessage('❌ You must be logged in to add a vehicle.');
             return;
        }
        
        if (!vehicleData.category || !vehicleData.pricePerDay || !vehicleData.location || !imageFile) {
            setStatusMessage('❌ Please fill all required fields and select an image.');
            return;
        }

        setStatusMessage('Starting upload and submission...');
        
        const coverImageUrl = await uploadImage(imageFile);

        if (!coverImageUrl) {
            setStatusMessage('❌ Image upload failed. Submission cancelled.');
            return;
        }

        // Prepare Data (MongoDB Structure)
        const fullVehicleData = {
            vehicleName: vehicleData.vehicleName || '',
            owner: user.displayName || user.email, 
            category: vehicleData.category,
            pricePerDay: parseFloat(vehicleData.pricePerDay) || 0, 
            location: vehicleData.location || '',
            availability: vehicleData.availability, 
            description: vehicleData.description || '',
            coverImage: coverImageUrl, // ImgBB থেকে পাওয়া URL
            userEmail: user.email, 
            createdAt: new Date().toISOString(),
            categories: vehicleData.category, 
        };

        setStatusMessage('Saving vehicle data to MongoDB...');
        
        try {
            const response = await fetch('http://localhost:3000/products', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fullVehicleData),
            });
            
            if (!response.ok) {
                 const errorText = await response.text();
                 throw new Error(`Server returned status ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            
            if (result.insertedId) {
                // ✅ SUCCESS TOAST
                setStatusMessage('✅ Vehicle added successfully! Data stored in MongoDB.');
                // Form Reset
                setVehicleData({ 
                    availability: 'Available', 
                    category: '', 
                    vehicleName: '',
                    pricePerDay: '',
                    location: '',
                    description: '',
                });
                setImageFile(null);
                e.target.reset();
            } else {
                setStatusMessage('❌ Failed to add vehicle to database. No ID returned.');
            }

        } catch (error) {
            console.error("❌ MongoDB/API Post Failed:", error);
            setStatusMessage(`❌ Database or Network error: ${error.message}. Is your backend server running on port 3000?`);
        }
    };


    return (
        <div className="add-vehicle-container">
            <h2 className="add-vehicle-title">
                <FaPlusCircle style={{ marginRight: '10px' }} />
                Add a New Vehicle
            </h2>
            
            <div className="status-message info" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <p>Owner: **{user?.displayName || 'N/A'}**</p>
                <p>Email: **{user?.email || 'N/A'}**</p>
            </div>


            <form onSubmit={handleSubmit} className="add-vehicle-form">
                {/* 1. Vehicle Name */}
                <input 
                    type="text" 
                    name="vehicleName" 
                    placeholder="Vehicle Name (e.g., Toyota Hiace Minibus)"
                    onChange={handleChange}
                    value={vehicleData.vehicleName || ''} 
                    required 
                />
                
                {/* 2. Category & Price */}
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
                        placeholder="Price per Day ($)"
                        onChange={handleChange}
                        value={vehicleData.pricePerDay || ''} 
                        required 
                    />
                </div>

                {/* 3. Location & Availability */}
                <div className="form-row">
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Location (e.g., Dhaka, Bangladesh)"
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


                {/* 4. Description */}
                <textarea 
                    name="description" 
                    placeholder="Description"
                    onChange={handleChange}
                    value={vehicleData.description || ''} 
                    rows="4"
                    required
                ></textarea>

                {/* 5. Cover Image Upload */}
                <div className="file-input-wrapper">
                    <label htmlFor="coverImage" className="file-label">
                        <FaUpload style={{ marginRight: '10px' }} />
                        {imageFile ? imageFile.name : "Select Cover Image"}
                    </label>
                    <input 
                        type="file" 
                        id="coverImage" 
                        name="coverImage" 
                        onChange={handleFileChange}
                        accept="image/*"
                        required 
                    />
                </div>
                
                {/* Status Message & Button */}
                <p className={`status-message ${statusMessage.startsWith('✅') ? 'success' : statusMessage.startsWith('❌') ? 'error' : 'info'}`}>
                    {statusMessage || 'Fill in the details to add your vehicle.'}
                </p>
                
                <button 
                    type="submit" 
                    disabled={uploading || statusMessage.includes('Saving') || statusMessage.startsWith('✅') || !user} 
                    className="submit-btn"
                >
                    <FaCar style={{ marginRight: '10px' }} />
                    {uploading ? `Uploading Image...` : statusMessage.includes('Saving') ? 'Saving Data...' : 'Add Vehicle'}
                </button>
            </form>
        </div>
    );
};

export default AddVehicle;