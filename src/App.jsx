import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar'; 
import Footer from './components/footer'; 
import LoginPage from './components/LoginPage';
// 💥 FIX 1: Import the AuthProvider
import AuthProvider from './context/AuthContext'; 
import Home from './components/Home';
import AddVehicle from './components/AddVehicle';
import RegisterPage from './components/RegisterPage';

// Dummy components (add these if they were missing)

const Vehicles = () => <h2 style={{ padding: '20px' }}>🚗 All Vehicles</h2>;

const MyVehicles = () => <h2 style={{ padding: '20px' }}>🔑 My Vehicles (Protected)</h2>;
const MyBookings = () => <h2 style={{ padding: '20px' }}>🗓️ My Bookings (Protected)</h2>;
const NotFound = () => <h2 style={{ padding: '20px', color: 'red' }}>404 - Page Not Found</h2>;


const App = () => {
  return (
    // 💥 FIX 2: Wrap the Router (and the whole app) with AuthProvider
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
              <Route path="/my-vehicle" element={<MyVehicles />} />
              <Route path="/my-booking" element={<MyBookings />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;