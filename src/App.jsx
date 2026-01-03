import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

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
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import MyVehicles from './components/MyVehicles'; 
import UpdateVehicle from './components/UpdateVehicle';
import MyBookings from './components/MyBookings';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import NotFound from './components/NotFound';

const MainLayout = () => (
  <>
    <div style={{ flex: 1 }}>
      <Outlet />
    </div>
    <Footer />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
            <Navbar />
            
            <main className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
               
                <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                  <Route index element={<DashboardHome />} />
                  <Route path="my-vehicles" element={<MyVehicles />} />
                  <Route path="add-vehicle" element={<AddVehicle />} />
                  <Route path="update-vehicle/:id" element={<UpdateVehicle />} />
                  <Route path="my-booking" element={<MyBookings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicles" element={<VehiclesPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
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
                </Route>

                <Route path="*" element={<NotFound />} /> 
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;