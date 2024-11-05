import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage.js';
import Footer from './components/Footer';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import PackagesPage from './pages/Packages';
import ContactUs from './pages/Contactus';
import AboutUs from './pages/Aboutus';
import BookingPage from './pages/BookingPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
  }, []);

  const location = useLocation();

  return (
    <div className=''>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage isAdmin={isAdmin}/>} />
        <Route path="/home" element={<HomePage isAdmin={isAdmin} />} />
        <Route path="/packages" element={<PackagesPage isAdmin={isAdmin} />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin}/>} />
      </Routes>
      {location.pathname !== '/signup' && location.pathname !== '/signin' && location.pathname !== '/booking' && <Footer />}

    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
