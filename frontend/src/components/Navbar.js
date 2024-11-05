import React, { useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Create a variable for the homepage
  const isHomepage = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/signin';

  return (
    <header className={`flex justify-between items-center p-4 ${isHomepage ? 'absolute' : 'fixed'} w-full top-0 z-10 transition duration-300 ${!isHomepage ? 'bg-white' : ''}`}>
      <div className={`text-2xl font-bold transition-transform transform hover:scale-110 text-orange-600`}>
        <NavLink to="/" onClick={closeMenu}>Travel.</NavLink>
      </div>
      <nav className={`md:flex ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row md:items-center absolute md:static top-full md:top-0 left-0 w-full md:w-auto transition-all duration-500 ${!isHomepage ? 'bg-white' : 'bg-transparent backdrop-blur-md'}`}>
        <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 font-semibold text-lg md:text-base p-4 md:p-0 justify-center items-center">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/packages"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactus"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                  isActive
                    ? `${isHomepage? 'text-white' :'bg-[#FFF4EC] text-[#FF6347]'}`
                    : `${isHomepage? 'text-white' :'text-gray-600 hover:bg-[#FFF4EC] hover:text-[#FF6347]'}`
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        {isAuthenticated ? (
          <NavLink to='/profile' onClick={closeMenu}>
            <FontAwesomeIcon icon={faUserCircle} className={`${!isHomepage ? 'text-orange-500' : 'text-white'} text-3xl cursor-pointer hover:text-orange-600 transition-colors`} />
          </NavLink>
        ) : (
          <NavLink to='/signup' onClick={closeMenu}>
            <button className={`font-semibold text-base ${!isHomepage ? 'text-orange-500' : 'text-white'} border-2 border-orange-500 py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300`}>Sign Up</button>
          </NavLink>
        )}
      </div>
      <button 
        className="md:hidden flex items-center justify-center" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className={`w-6 h-6 ${isHomepage ? 'text-white' : 'text-black'}`} />
        ) : (
          <Menu className={`w-6 h-6 ${isHomepage ? 'text-white' : 'text-black'}`} />
        )}
      </button>
    </header>
  );
};

export default Navbar;