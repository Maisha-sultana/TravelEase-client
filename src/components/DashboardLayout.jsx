import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaChartPie, FaCar, FaPlusCircle, FaCalendarAlt, FaUserCircle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
    const { user, logOut } = useAuth();

    return (
        <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
            <aside className="dashboard-sidebar" style={{ width: '260px', background: '#1a1a2e', color: 'white', padding: '20px' }}>
                <h2 style={{ color: '#F97316', marginBottom: '30px' }}>Dashboard</h2>
                <nav className="nav-links nav-open" style={{ position: 'static', background: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column' }}>
                    <Link to="/dashboard" className="nav-item"><FaChartPie /> Overview</Link>
                    <Link to="/dashboard/add-vehicle" className="nav-item"><FaPlusCircle /> Add Vehicle</Link>
                    <Link to="/dashboard/my-vehicles" className="nav-item"><FaCar /> My Vehicles</Link>
                    <Link to="/dashboard/my-booking" className="nav-item"><FaCalendarAlt /> My Bookings</Link>
                    <Link to="/dashboard/profile" className="nav-item"><FaUserCircle /> My Profile</Link>
                    <hr style={{ margin: '20px 0', borderColor: '#444' }} />
                    <Link to="/" className="nav-item"><FaHome /> Exit to Home</Link>
                    <button onClick={logOut} className="logout-btn-dropdown" style={{ marginTop: '10px', width: '100%' }}>
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '40px', backgroundColor: 'var(--background-color)', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;