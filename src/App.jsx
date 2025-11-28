import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar'; 
import Footer from './components/footer'; 
// ... (Dummy components remain the same) ...

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        {/* Use the main-content class for padding and flex growth */}
        <main className="main-content">
          <Routes>
            {/* ... Your Routes ... */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;