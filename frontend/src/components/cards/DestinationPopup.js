import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, Star, Users, Clock, Calendar, DollarSign, Camera, Utensils, Wifi, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';

const DestinationPopup = ({ destination, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollToImage = (index) => {
    if (scrollContainerRef.current) {
      const scrollAmount = index * scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const imageWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / imageWidth);
      setCurrentImageIndex(newIndex);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % destination.image.length;
    setCurrentImageIndex(newIndex);
    scrollToImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + destination.image.length) % destination.image.length;
    setCurrentImageIndex(newIndex);
    scrollToImage(newIndex);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="relative h-[300px] overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {destination.image.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-center">
                  <img 
                    src={img} 
                    alt={`${destination.name} - Image ${index + 1}`} 
                    className="w-full h-[300px] object-cover"
                  />
                </div>
              ))}
            </div>
            {destination.image.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </>
            )}
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{destination.name}</h2>
            {destination.rating && (
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <Star className="w-6 h-6 text-orange-500 fill-current" />
                <span className="ml-2 text-xl font-semibold text-orange-800">{destination.rating}</span>
              </div>
            )}
          </div>

          {destination.location && (
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-6 h-6 mr-2 text-orange-500" />
              <span className="text-lg">{destination.location}</span>
            </div>
          )}

          {destination.description && (
            <p className="text-gray-700 mb-8 leading-relaxed">{destination.description}</p>
          )}

          <div className="grid grid-cols-2 gap-6 mb-8">
            {destination.duration && (
              <div className="flex items-center">
                <Clock className="w-6 h-6 mr-3 text-orange-500" />
                <span className="text-gray-700">Duration: {destination.duration}</span>
              </div>
            )}
            {destination.groupSize && (
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-3 text-orange-500" />
                <span className="text-gray-700">Group Size: {destination.groupSize}</span>
              </div>
            )}
            {destination.bestTime && (
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-orange-500" />
                <span className="text-gray-700">Best Time: {destination.bestTime}</span>
              </div>
            )}
            {destination.price && (
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 mr-3 text-orange-500" />
                <span className="text-gray-700">Price: ${destination.price} per person</span>
              </div>
            )}
          </div>

          {destination.highlights && destination.highlights.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Highlights</h3>
              <ul className="grid grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Camera className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h3>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Wifi className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">Free WiFi</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Utensils className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">Restaurant</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Coffee className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">Coffee Shop</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-orange-500 text-white hover:bg-orange-600 py-3 rounded-lg transition duration-300 ease-in-out font-semibold text-lg uppercase tracking-wider">
            Book This Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationPopup;
