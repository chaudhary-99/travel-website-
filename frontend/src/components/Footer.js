import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-3">About Us</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We are passionate about creating unforgettable travel experiences. Our expert team is dedicated to helping you explore the world with ease and excitement.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Destinations', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors duration-300">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-2 text-orange-500" /> 123 Travel Street, City, Country
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-2 text-orange-500" /> +1 (123) 456-7890
              </li>
              <li className="text-sm text-gray-600 ml-6"> {/* Added left margin to align without the icon */}
                +1 (987) 654-3210
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-2 text-orange-500" /> info@travelwebsite.com
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Your Travel Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
