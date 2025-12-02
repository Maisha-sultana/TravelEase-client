import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUpload, FaCar, FaPlusCircle } from 'react-icons/fa';

// Firebase Storage এর ফাংশনগুলো আমদানি
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// storage ইনস্ট্যান্স আমদানি
import { storage } from '../firebase/firebase.init'; 

const AddVehicle = () => {
    const { user } = useAuth();
    const [vehicleData, setVehicleData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    // স্টেটে ইনপুট ভ্যালু সেভ করা
    const handleChange = (e) => {
        setVehicleData({
            ...vehicleData,
            [e.target.name]: e.target.value,
        });
    };

    // ফাইল ইনপুট হ্যান্ডেল করা
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // --- মূল ইমেজ আপলোড লজিক ---
    const uploadImage = async (file) => {
        if (!file) return null;

        const storageRef = ref(storage, `vehicles/${file.name + Date.now()}`);
        
        try {
            setUploading(true);
            setStatusMessage('Image uploading...');

            // আপলোড শুরু
            const snapshot = await uploadBytes(storageRef, file);
            
            // ডাউনলোড URL পাওয়া
            const url = await getDownloadURL(snapshot.ref);
            
            setUploading(false);
            setStatusMessage('Image upload complete!');
            return url;

        } catch (error) {
            console.error("Image upload failed:", error);
            setUploading(false);
            setStatusMessage(`Image upload failed: ${error.message}`);
            return null;
        }
    };
    // ----------------------------

    // ফর্ম সাবমিট হ্যান্ডেল করা
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ১. ইমেজ আপলোড করে URL টি পাওয়া
        const coverImageUrl = await uploadImage(imageFile);

        if (!coverImageUrl) {
            setStatusMessage('Failed to get cover image URL. Submission cancelled.');
            return;
        }

        // ২. MongoDB-তে ডেটা পোস্ট করা
        const fullVehicleData = {
            ...vehicleData,
            coverImage: coverImageUrl, // Firebase থেকে পাওয়া URL
            owner: user.displayName || user.email,
            userEmail: user.email,
            createdAt: new Date().toISOString(),
        };

        setStatusMessage('Saving vehicle data...');
        
        try {
            const response = await fetch('http://localhost:3000/products', { // আপনার ব্যাকএন্ড URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullVehicleData),
            });
            
            const result = await response.json();
            
            if (result.insertedId) {
                setStatusMessage('✅ Vehicle added successfully!');
                // ফর্ম রিসেট
                setVehicleData({});
                setImageFile(null);
                e.target.reset();
            } else {
                setStatusMessage('❌ Failed to add vehicle to database.');
            }

        } catch (error) {
            console.error("Vehicle post failed:", error);
            setStatusMessage(`❌ Network error: ${error.message}`);
        }
    };


    return (
        <div className="add-vehicle-container">
            <h2 className="add-vehicle-title">
                <FaPlusCircle style={{ marginRight: '10px' }} />
                Add a New Vehicle
            </h2>

            <form onSubmit={handleSubmit} className="add-vehicle-form">
                {/* 1. Vehicle Name */}
                <input 
                    type="text" 
                    name="vehicleName" 
                    placeholder="Vehicle Name (e.g., Toyota Hiace Minibus)"
                    onChange={handleChange}
                    required 
                />

                {/* 2. Category & Price */}
                <div className="form-row">
                    <input 
                        type="text" 
                        name="category" 
                        placeholder="Category (e.g., Van, Sedan)"
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="number" 
                        name="pricePerDay" 
                        placeholder="Price per Day ($)"
                        onChange={handleChange}
                        required 
                    />
                </div>

                {/* 3. Location */}
                <input 
                    type="text" 
                    name="location" 
                    placeholder="Location (e.g., Dhaka, Bangladesh)"
                    onChange={handleChange}
                    required 
                />

                {/* 4. Description */}
                <textarea 
                    name="description" 
                    placeholder="Description"
                    onChange={handleChange}
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
                    {statusMessage}
                </p>
                
                <button type="submit" disabled={uploading} className="submit-btn">
                    <FaCar style={{ marginRight: '10px' }} />
                    {uploading ? `Uploading... (${uploadProgress}%)` : 'Add Vehicle'}
                </button>
            </form>
        </div>
    );
};

export default AddVehicle;