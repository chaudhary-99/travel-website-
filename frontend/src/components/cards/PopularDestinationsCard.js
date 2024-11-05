import React, { useEffect, useState } from 'react';
import { MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import DestinationPopup from './DestinationPopup';

const PopularDestinationsCard = ({ destination, isAdmin, onEdit, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  return (
    <>
      <div 
        className="ml-[3vw] w-full max-w-[80vw] sm:max-w-sm bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out mx-auto my-5 rounded-lg border border-gray-200 cursor-pointer relative"
        onClick={openPopup}
      >
        <div className="relative pb-20">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <span className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 text-xs rounded-full font-semibold uppercase tracking-wide">
            Featured
          </span>
        
          <div className="p-2 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 truncate flex-1 mr-2">
                {destination.name}
              </h3>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                <span className="text-sm md:text-lg font-semibold text-orange-800">{destination.rating}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2 text-sm leading-relaxed line-clamp-3">
              {destination.description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gray-50 p-2 sm:p-4 md:p-6 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
            <span className="text-xl md:text-3xl font-bold text-gray-900 mr-1">{destination.price}</span>
            <span className="text-gray-600 text-xs md:text-sm">per person</span>
          </div>
          {isAdmin ? (
            <div className="flex space-x-1">
              <button 
                className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded-lg transition duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit size={18} />
              </button>
              <button 
                className="bg-red-500 text-white hover:bg-red-600 p-1 rounded-lg transition duration-300 ease-in-out"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <button 
              className="bg-orange-500 text-white hover:bg-orange-600 px-2 sm:px-4 py-1 rounded-lg transition duration-300 ease-in-out font-semibold text-xs sm:text-sm uppercase tracking-wider"
              onClick={(e) => {
                e.stopPropagation();
                openPopup();
              }}
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {showPopup && (
        <DestinationPopup destination={destination} onClose={closePopup} />
      )}
    </>
  );
};

export default PopularDestinationsCard;
