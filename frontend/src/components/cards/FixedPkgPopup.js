import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const FixedPkgPopup = ({ destination, onClose, calculatePrice, carType, travelDate }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const scrollPhotos = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!destination) {
    return null;
  }

  const totalPrice = calculatePrice(destination.basePrice);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-xl md:text-2xl text-gray-600 hover:text-gray-800 focus:outline-none z-10"
          aria-label="Close Popup"
        >
          <FaTimes />
        </button>

        {/* Popup Content Container */}
        <div className="p-3 md:p-6 flex flex-col h-full">
          {/* Popup Header */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-orange-600 pr-8">
            {destination.name}
          </h2>

          {/* Image Carousel */}
          <div className="relative mb-4 md:mb-6">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto no-scrollbar space-x-4 snap-x snap-mandatory"
            >
              {destination.image?.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${destination.name} - Photo ${index + 1}`}
                  className="w-full h-48 md:h-64 object-cover flex-shrink-0 rounded-md snap-start"
                />
              ))}
            </div>
            {/* Scroll Buttons - Hidden on mobile, shown on larger screens */}
            <button
              onClick={() => scrollPhotos('left')}
              className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 focus:outline-none"
              aria-label="Scroll Left"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scrollPhotos('right')}
              className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 bg-opacity-75 text-white p-2 rounded-full hover:bg-opacity-100 focus:outline-none"
              aria-label="Scroll Right"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Destination Details */}
          <div className="mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-semibold mb-2">About {destination.name}</h3>
            <p className="text-gray-700 text-sm md:text-base">
              {destination.longDescription || destination.description}
            </p>
          </div>

          {/* Additional Information */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm md:text-base">
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-semibold">Duration:</span>
              <span className="ml-1">{destination.duration}</span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-semibold">Car Type:</span>
              <span className="ml-1">
                {carType ? carType.charAt(0).toUpperCase() + carType.slice(1) : 'N/A'}
              </span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-semibold">Travel Date:</span>
              <span className="ml-1">
                {travelDate ? travelDate.toLocaleDateString() : 'N/A'}
              </span>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-semibold">Total Price:</span>
              <span className="ml-1 text-orange-600 font-bold">₹{totalPrice}</span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base mt-auto"
            onClick={() => {
              alert('Booking Confirmed!');
              onClose();
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedPkgPopup;