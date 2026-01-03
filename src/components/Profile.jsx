import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="info-box" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h2>User Profile</h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img src={user?.photoURL} alt="Profile" style={{ width: '120px', borderRadius: '50%', border: '4px solid #F97316' }} />
            </div>
            <div className="input-group">
                <label>Name: </label>
                <input type="text" value={user?.displayName} readOnly className="filter-text-input" />
            </div>
            <div className="input-group">
                <label>Email: </label>
                <input type="text" value={user?.email} readOnly className="filter-text-input" />
            </div>
            <button className="submit-btn" style={{ marginTop: '20px' }}>Update Profile</button>
        </div>
    );
};

export default Profile;