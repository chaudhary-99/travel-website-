import React from 'react';
import { FaCar, FaTimes, FaEdit } from 'react-icons/fa';
import { Calendar } from 'lucide-react';

const PackageCard = ({
  pkg,
  carType,
  travelDate,
  calculatePrice,
  handleBookNow,
  isAdmin,
  onDeletePackage,
  onEditPackage,
}) => {
  const truncateText = (text, limit) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB') : 'Not selected';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this package?')) {
      onDeletePackage(pkg._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEditPackage(pkg);
  };

  return (
    <div className="relative rounded-lg border border-orange-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-full max-w-sm mx-auto">
      {isAdmin && (
        <div className="absolute top-1 right-1 z-10 flex space-x-1 sm:top-2 sm:right-2 sm:space-x-2">
          <button
            className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={handleEdit}
            aria-label="Edit package"
          >
            <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            className="p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            onClick={handleDelete}
            aria-label="Delete package"
          >
            <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      )}
      <div
        className="cursor-pointer"
        onClick={() => handleBookNow(pkg)}
        aria-label={`View details for ${pkg.name}`}
      >
        <img
          src={pkg.image[0]}
          alt={`${pkg.name} Image`}
          className="w-full h-32 sm:h-48 object-cover"
          loading="lazy"
        />
        <div className="p-2 sm:p-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
          <h3 className="text-lg sm:text-xl font-semibold truncate">
            {pkg.name}
          </h3>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <p className="text-lg sm:text-xl font-bold text-orange-600">
            ₹{calculatePrice(pkg.basePrice)}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 bg-orange-100 px-2 py-0.5 rounded-full">
            {pkg.duration}
          </p>
        </div>

        <div className="mb-2 sm:mb-4">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Description:</h4>
          <p className="text-xs sm:text-sm text-gray-700">
            {truncateText(pkg.description, window.innerWidth < 640 ? 80 : 100)}
          </p>
        </div>

        <div className="mb-3 sm:mb-4">
          <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Selected Options:</h4>
          <div className="flex items-center mb-1 sm:mb-2">
            <FaCar className="text-orange-500 mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm text-gray-700">
              {carType ? carType.charAt(0).toUpperCase() + carType.slice(1) : 'Not selected'}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="text-orange-500 mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm text-gray-700">{formatDate(travelDate)}</span>
          </div>
        </div>

        <button
          className={`w-full h-10 sm:h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 text-xs sm:text-sm ${
            !carType || !travelDate ? 'opacity-50 cursor-not-allowed' : ''
          } focus:outline-none focus:ring-2 focus:ring-orange-500`}
          onClick={(e) => {
            e.stopPropagation();
            handleBookNow(pkg);
          }}
          disabled={!carType || !travelDate}
          aria-label="Book Now"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;