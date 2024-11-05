import React, { useState, forwardRef, useEffect } from 'react';
import PackageCard from '../components/cards/PackageCard';
import CustomPackageForm from '../components/cards/CustomPackageForm';
import FixedPkgPopup from '../components/cards/FixedPkgPopup';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { FaCar , FaPlus} from 'react-icons/fa';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
// import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';
import AddNewPackageForm from '../components/admincomponents/AddNewPackageForm';


const baseUrl = process.env.REACT_APP_API_URL;

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div className="relative w-full sm:w-64">
    <input
      type="text"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      aria-label="Select Travel Date"
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-700"
      placeholder="Select Travel Date"
    />
    <CalendarIcon
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
));


const PackagesPage = ({isAdmin}) => {
  console.log(isAdmin)
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [carType, setCarType] = useState('');
  const [allcars, setAllcars] = useState([]);
  const [travelDate, setTravelDate] = useState(null);
  const [tab, setTab] = useState('fixed');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allpackages, setAllPackages] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  console.log(baseUrl)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${baseUrl}/packages`);
        const data = await response.json();
        setAllPackages(data);
        console.log(data)
      } catch (error) {
        console.log('error in fetching packages', error);
      }
    };

    const fetchcars = async () => {
      try {
        const response = await fetch(`${baseUrl}/cars`);
        const data = await response.json();
        setAllcars(data);
      } catch (error) {
        console.log('error in fetching packages', error);
      }
    };

    fetchcars();
    fetchPackages();
  }, []);

  const carPrices = {
    hatchback: 0,
    sedan: 500,
    suv: 1000,
  };

  const calculatePrice = (basePrice) => {
    const carPrice = carPrices[carType] || 0;
    return basePrice + carPrice;
  };

  const handleDeletePackage = async (packageId) => {
    try {
      await fetch(`${baseUrl}/packages/${packageId}`, {
        method: 'DELETE',
      });
      setAllPackages(allpackages.filter(pkg => pkg._id !== packageId));
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowAddPackageForm(true);
  };

  const handleUpdatePackage = (updatedPackage) => {

      setAllPackages(allpackages.map(pkg => pkg._id === updatedPackage._id ? updatedPackage : pkg));
      setEditingPackage(null);
      setShowAddPackageForm(false);
  };

  const handleAddNewPackage = (newPackage) => {
    setAllPackages([...allpackages, newPackage]);
    setShowAddPackageForm(false);
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowPopup(true);
  };

  const handleGetQuote = (customPackage) => {
    setLoading(true);
    setTimeout(() => {
      alert('Quote generated for your custom package!');
      setLoading(false);
    }, 2000);
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '48px',
      borderColor: errors.carType ? '#f87171' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(251,113,133,0.5)' : provided.boxShadow,
      '&:hover': {
        borderColor: errors.carType ? '#f87171' : '#f97316',
      },
      paddingLeft: '40px', // To accommodate the icon
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#f97316',
      '&:hover': {
        color: '#f97316',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 text-orange-700">
          Our Exclusive Packages
        </h1>

        <div className="w-full mb-8">
          {/* Tab Selection */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex rounded-full bg-orange-100 p-0.5 sm:p-1 shadow-md">
              <button
                className={`inline-flex items-center justify-center rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-sm sm:text-base md:text-lg font-semibold transition-all ${
                  tab === 'fixed'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('fixed')}
                aria-pressed={tab === 'fixed'}
              >
                Fixed Packages
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 text-sm sm:text-base md:text-lg font-semibold transition-all ${
                  tab === 'custom'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
                onClick={() => setTab('custom')}
                aria-pressed={tab === 'custom'}
              >
                Custom Packages
              </button>
            </div>
          </div>

          {tab === 'fixed' && (
            <>
              {/* Enhanced Date and Car Selection */}
              <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <DatePicker
                  selected={travelDate}
                  onChange={(date) => setTravelDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat="dd MMMM yyyy"
                  minDate={new Date()}
                  aria-label="Travel Date"
                />

                <div className="w-full sm:w-64">
                  <div className="relative">
                    <Select
                      options={allcars}
                      value={allcars.find((option) => option.value === carType)}
                      onChange={(selectedOption) => setCarType(selectedOption ? selectedOption.value : '')}
                      styles={customStyles}
                      placeholder="Select car type"
                      isClearable
                      aria-label="Select Car Type"
                    />
                    <span className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-orange-500">
                      <FaCar size={20} />
                    </span>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className="mb-8 flex justify-center">
                  <button
                    onClick={() => setShowAddPackageForm(true)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <FaPlus className="mr-2" />
                    Add New Package
                  </button>
                </div>
              )}

              {/* Package Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allpackages.map((pkg) => (
                  <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  carType={carType}
                  travelDate={travelDate}
                  calculatePrice={calculatePrice}
                  handleBookNow={handlePackageClick}
                  isAdmin={isAdmin}
                  onDeletePackage={handleDeletePackage}
                  onEditPackage={handleEditPackage}
                />
                ))}
              </div>
            </>
          )}

          {tab === 'custom' && (
            <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl border border-orange-200 p-6">
              <div className="p-3 sm:p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Create Your Custom Package
                </h2>
              </div>
              <div className="">
                <CustomPackageForm
                  selectedPlaces={selectedPlaces}
                  setSelectedPlaces={setSelectedPlaces}
                  carType={carType}
                  setCarType={setCarType}
                  travelDate={travelDate}
                  setTravelDate={setTravelDate}
                  handleGetQuote={handleGetQuote}
                  isAdmin={isAdmin}
                />
                {loading && (
                  <div className="mt-4 flex justify-center">
                    <ClipLoader color="#F97316" loading={loading} size={35} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Package Popup */}
      {showPopup && selectedPackage && (
        <FixedPkgPopup
          onClose={() => setShowPopup(false)}
          destination={selectedPackage}
          calculatePrice={calculatePrice}
          carType={carType}
          travelDate={travelDate}
        />
      )}

      {/* Add/Edit Package Form Popup */}
      {showAddPackageForm && (
        <AddNewPackageForm
          onClose={() => {
            setShowAddPackageForm(false);
            setEditingPackage(null);
          }}
          onAddPackage={handleAddNewPackage}
          onUpdatePackage={handleUpdatePackage}
          editingPackage={editingPackage}
        />
      )}
    </div>
  );
};

export default PackagesPage;


