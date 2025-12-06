import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar'; 
import Footer from './components/footer'; 
import LoginPage from './components/LoginPage';
import AuthProvider from './context/AuthContext'; 
import ThemeProvider from './context/ThemeContext';
import Home from './components/Home';
import AddVehicle from './components/AddVehicle';
import RegisterPage from './components/RegisterPage';
import VehiclesPage from './components/Vehicles';
import PrivateRoute from './components/PrivateRoute';
import VehicleDetails from './components/VehicleDetails';
import MyVehicles from './components/MyVehicles'; 
import UpdateVehicle from './components/UpdateVehicle';
import MyBookings from './components/MyBookings';


const NotFound = () => <h2 style={{ padding: '20px', color: 'red' }}>404 - Page Not Found</h2>;


const App = () => {
  return (
 
    <AuthProvider>
     <ThemeProvider>
       <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
            <Route 
                path="/add-vehicle" 
                element={
                    <PrivateRoute>
                        <AddVehicle />
                    </PrivateRoute>
                } 
              />
              <Route 
                path="/my-vehicle" 
                element={
                    <PrivateRoute>
                        <MyVehicles /> 
                    </PrivateRoute>
                } 
              />
            
              <Route 
                path="/update-vehicle/:id" 
                element={
                    <PrivateRoute>
                        <UpdateVehicle /> 
                    </PrivateRoute>
                } 
              />
              <Route 
                path="/my-booking" 
                element={
                    <PrivateRoute>
                        <MyBookings /> 
                    </PrivateRoute>
                } 
              />
              <Route path="/my-booking" element={<MyBookings />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/vehicles/:id" 
                element={
                  <PrivateRoute>
                    <VehicleDetails />
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
     </ThemeProvider>
    </AuthProvider>
  );
};

export default App;