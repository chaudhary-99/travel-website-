import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Calendar, Car, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';

// Custom styled components
const CustomCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CustomCardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CustomCardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const CustomAlert = ({ children, variant = "default" }) => (
  <div className={`p-4 rounded-lg flex items-center space-x-2 ${
    variant === "destructive" ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
  }`}>
    {children}
  </div>
);

const TripDetails = ({ bookingData }) => (
  <CustomCard>
    <CustomCardHeader>
      <h2 className="text-xl font-semibold">Trip Details</h2>
    </CustomCardHeader>
    <CustomCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoRow icon={MapPin} label="Pickup Location" value={bookingData?.from} />
        <InfoRow icon={MapPin} label="Drop-off Location" value={bookingData?.to} />
        <InfoRow icon={Calendar} label="Departure Date" value={bookingData?.date?.toLocaleDateString()} />
        <InfoRow icon={Car} label="Vehicle Category" value={bookingData?.selectedCar} />
      </div>
    </CustomCardContent>
  </CustomCard>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0">
      <Icon className="text-orange-600 h-5 w-5" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

const CustomerDetails = ({ customerDetails, handleInputChange, errors }) => (
  <CustomCard>
    <CustomCardHeader>
      <h2 className="text-xl font-semibold">Customer Information</h2>
    </CustomCardHeader>
    <CustomCardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          value={customerDetails.name}
          onChange={handleInputChange}
          error={errors?.name}
          required
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={customerDetails.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
        />
        <PhoneField
          label="Primary Contact"
          name="primaryPhone"
          value={customerDetails.primaryPhone}
          onChange={handleInputChange}
          error={errors?.primaryPhone}
          required
        />
        <PhoneField
          label="Alternative Contact"
          name="secondaryPhone"
          value={customerDetails.secondaryPhone}
          onChange={handleInputChange}
          optional
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
          <textarea
            name="specialRequests"
            value={customerDetails.specialRequests}
            onChange={handleInputChange}
            placeholder="Any specific requirements or preferences..."
            className="mt-1.5 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
          />
        </div>
      </div>
    </CustomCardContent>
  </CustomCard>
);

const PaymentDetails = ({ bookingData, paymentMethod, setPaymentMethod }) => (
  <CustomCard>
    <CustomCardHeader>
      <h2 className="text-xl font-semibold">Payment Information</h2>
    </CustomCardHeader>
    <CustomCardContent>
      <div className="space-y-6">
        <PriceSummary bookingData={bookingData} />
        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>
    </CustomCardContent>
  </CustomCard>
);

const PriceSummary = ({ bookingData }) => (
  <div className="rounded-lg bg-gray-50 p-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-900">Total Amount</h3>
        <p className="text-sm text-gray-600">Including taxes and fees</p>
      </div>
      <div className="text-2xl font-semibold text-orange-600">
        {bookingData?.estimatedPrice}
      </div>
    </div>
  </div>
);

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }) => (
  <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
    <div className="space-y-2">
      <PaymentOption
        value="credit_card"
        label="Credit Card"
        icon={CreditCard}
        description="Secure payment with credit card"
        checked={paymentMethod === 'credit_card'}
        onChange={() => setPaymentMethod('credit_card')}
      />
      <PaymentOption
        value="debit_card"
        label="Debit Card"
        icon={CreditCard}
        description="Direct payment from your bank account"
        checked={paymentMethod === 'debit_card'}
        onChange={() => setPaymentMethod('debit_card')}
      />
      <PaymentOption
        value="net_banking"
        label="Net Banking"
        icon={CreditCard}
        description="Pay through your bank's online portal"
        checked={paymentMethod === 'net_banking'}
        onChange={() => setPaymentMethod('net_banking')}
      />
    </div>
  </div>
);

const PaymentOption = ({ value, label, icon: Icon, description, checked, onChange }) => (
  <label className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
    <input
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
    />
    <div className="flex items-center space-x-3 flex-1">
      <Icon className="h-5 w-5 text-gray-600" />
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </label>
);

const FormField = ({ label, name, value, onChange, type = "text", error, required, optional }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      {optional && <span className="text-sm text-gray-500 ml-1">(Optional)</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}
  </div>
);

const PhoneField = ({ label, name, value, onChange, error, required, optional }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      {optional && <span className="text-sm text-gray-500 ml-1">(Optional)</span>}
    </label>
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <input
        id={name}
        name={name}
        type="tel"
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        required={required}
      />
    </div>
    {error && (
      <p className="text-sm text-red-600">{error}</p>
    )}
  </div>
);

const SubmitButton = ({ isProcessing }) => (
  <button
    type="submit"
    disabled={isProcessing}
    className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isProcessing ? (
      <span className="flex items-center justify-center space-x-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>Processing...</span>
      </span>
    ) : (
      "Confirm Booking"
    )}
  </button>
);

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    primaryPhone: '',
    secondaryPhone: '',
    specialRequests: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!customerDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!customerDetails.primaryPhone.trim()) {
      newErrors.primaryPhone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(customerDetails.primaryPhone)) {
      newErrors.primaryPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate('/booking-confirmation', {
        state: {
          ...bookingData,
          customerDetails,
          paymentMethod,
          bookingId: `BK${Date.now().toString(36).toUpperCase()}`,
        },
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to process booking. Please try again.'
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-20">
        <CustomAlert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Booking information not found. Please start a new booking.</span>
        </CustomAlert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-1">Please review and fill in the required information</p>
        </div>

        {errors.submit && (
          <CustomAlert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.submit}</span>
          </CustomAlert>
        )}

        <TripDetails bookingData={bookingData} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerDetails
            customerDetails={customerDetails}
            handleInputChange={handleInputChange}
            errors={errors}
          />
          
          <PaymentDetails
            bookingData={bookingData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <SubmitButton isProcessing={isProcessing} />
        </form>
      </div>
    </div>
  );
};

export default BookingPage;