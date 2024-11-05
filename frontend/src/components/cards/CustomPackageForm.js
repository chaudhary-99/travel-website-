import React, { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaTrash } from 'react-icons/fa';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { toast } from 'react-toastify';

const baseUrl = process.env.REACT_APP_API_URL;

const CustomPackageForm = ({
  selectedPlaces,
  setSelectedPlaces,
  carType,
  setCarType,
  travelDate,
  setTravelDate,
  handleGetQuote,
  isAdmin,
}) => {
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});
  const [allcars, setAllcars] = useState([]);
  const [newPlace, setNewPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPlaces();
    fetchCars();
  }, []);

  // ... keeping all the fetch and handle functions the same ...
  const fetchPlaces = async () => {
    try {
      const response = await fetch(`${baseUrl}/places`);
      if (!response.ok) throw new Error('Failed to fetch places');
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
      toast.error('Failed to load places. Please try again later.');
    }
  };

  const fetchCars = async () => {
    try {
      const response = await fetch(`${baseUrl}/cars`);
      const data = await response.json();
      setAllcars(data);
    } catch (error) {
      console.log('error in fetching packages', error);
    }
  };

  const handlePlaceSelection = (place) => {
    setSelectedPlaces((prev) => 
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  const handleAddPlace = async () => {
    if (!newPlace.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPlace }),
      });
      if (!response.ok) throw new Error('Failed to add place');
      const addedPlace = await response.json();
      setPlaces([...places, addedPlace]);
      setNewPlace('');
      toast.success('New place added successfully!');
    } catch (error) {
      console.error('Error adding place:', error);
      toast.error('Failed to add new place. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePlace = async (placeId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/places/${placeId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete place');
      setPlaces(places.filter(p => p._id !== placeId));
      setSelectedPlaces(selectedPlaces.filter(p => p._id !== placeId));
      toast.success('Place deleted successfully!');
    } catch (error) {
      console.error('Error deleting place:', error);
      toast.error('Failed to delete place. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (selectedPlaces.length === 0) newErrors.places = 'Please select at least one place.';
    if (!carType) newErrors.carType = 'Please select a car type.';
    if (!travelDate) newErrors.travelDate = 'Please select a travel date.';
    if (!duration || duration <= 0) newErrors.duration = 'Please enter a valid duration.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleGetQuote({ selectedPlaces, carType, travelDate, duration });
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '40px',
      minHeight: '40px',
      borderColor: errors.carType ? '#f87171' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(251,113,133,0.5)' : provided.boxShadow,
      '&:hover': {
        borderColor: errors.carType ? '#f87171' : '#f97316',
      },
      paddingLeft: '32px',
      '@media (min-width: 640px)': {
        height: '48px',
        minHeight: '48px',
        paddingLeft: '40px',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
      '@media (min-width: 640px)': {
        fontSize: '1rem',
      },
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
      '@media (min-width: 640px)': {
        fontSize: '1rem',
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '8px',
      color: '#f97316',
      '@media (min-width: 640px)': {
        padding: '12px',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <form className="space-y-4 sm:space-y-6 p-3 sm:p-6 bg-white rounded-lg shadow-sm" onSubmit={onSubmit}>
      {/* Select Places */}
      <div className="space-y-2">
        <label className="text-sm sm:text-base font-semibold text-gray-800 block">
          Select Places:
        </label>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {places.map((place) => (
            <div key={place._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={place._id}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-orange-500"
                  onChange={() => handlePlaceSelection(place)}
                  checked={selectedPlaces.includes(place)}
                />
                <label htmlFor={place._id} className="ml-2 text-xs sm:text-sm text-gray-700">
                  {place.name}
                </label>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleDeletePlace(place._id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  disabled={isLoading}
                >
                  <FaTrash className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.places && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.places}</p>}
      </div>

      {/* Add New Place (Admin only) */}
      {isAdmin && (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
            placeholder="New place name"
            className="flex-grow h-8 sm:h-10 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddPlace}
            className="h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
            disabled={isLoading}
          >
            <FaPlus className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}

      {/* Travel Date */}
      <div className="space-y-2">
        <label className="text-sm sm:text-base font-semibold text-gray-800 block">
          Travel Date:
        </label>
        <div className="relative">
          <DatePicker
            selected={travelDate}
            onChange={(date) => setTravelDate(date)}
            className={`block w-full h-8 sm:h-10 pl-8 sm:pl-10 pr-4 rounded-lg border ${
              errors.travelDate ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <span className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none text-orange-500">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>
        {errors.travelDate && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.travelDate}</p>}
      </div>

      {/* Select Car */}
      <div className="space-y-2">
        <label className="text-sm sm:text-base font-semibold text-gray-800 block">
          Select Car:
        </label>
        <div className="relative">
          <Select
            options={allcars}
            value={allcars.find((option) => option.value === carType)}
            onChange={(selectedOption) => setCarType(selectedOption ? selectedOption.value : '')}
            styles={customStyles}
            placeholder="Select car type"
            isClearable
          />
          <span className="absolute inset-y-0 left-2 sm:left-3 flex items-center pointer-events-none text-orange-500">
            <FaCar className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
        </div>
        {errors.carType && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.carType}</p>}
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm sm:text-base font-semibold text-gray-800 block">
          Duration (Days):
        </label>
        <input
          type="number"
          className={`block w-full h-8 sm:h-10 px-3 rounded-lg border ${
            errors.duration ? 'border-red-500' : 'border-gray-300'
          } focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm`}
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
        />
        {errors.duration && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.duration}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-10 sm:h-12 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Get Quote
      </button>
    </form>
  );
};

export default CustomPackageForm;