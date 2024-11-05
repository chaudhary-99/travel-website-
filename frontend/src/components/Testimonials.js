import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import axios from 'axios';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    location: '',
    image: '',
    rating: 0,
    content: ''
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/testimonials`);
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.log('Error in fetching testimonials', error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewTestimonial({ ...newTestimonial, [name]: reader.result });
      };
      
      reader.readAsDataURL(file);
    } else {
      setNewTestimonial({ ...newTestimonial, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newTestimonial.name.slice(0, 100));
    formData.append('location', newTestimonial.location.slice(0, 100));
    if (newTestimonial.image) {
      formData.append('image', newTestimonial.image);
    }
    formData.append('rating', newTestimonial.rating.toString());
    formData.append('content', newTestimonial.content.slice(0, 1000));
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/testimonials/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setTestimonials([...testimonials, response.data]);
      setNewTestimonial({ name: '', location: '', image: '', rating: 0, content: '' });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      if (error.response) {
        alert(error.response.data.message || 'An error occurred while submitting the testimonial');
      } else if (error.request) {
        alert('No response received from the server. Please try again later.');
      } else {
        alert('An error occurred while submitting the testimonial. Please try again.');
      }
    }
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto sm:px-6 lg:px-8 py-6">
        {/* Testimonials Display Section - Unchanged */}
        <div className="my-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">What Our Clients Say</h2>
          <div className="flex overflow-x-auto pb-6 pt-6 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="ml-5 min-w-[250px] max-w-[250px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <h3 className="font-semibold text-md text-white">{testimonial.name}</h3>
                    <p className="text-xs text-gray-300">{testimonial.location}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Quote size={20} className="text-orange-400 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Responsive Testimonial Form Section with Reduced Heights */}
        <div className="my-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Share Your Experience</h2>
          <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6"
            encType="multipart/form-data"
          >
            <div className="space-y-4">
              {/* Name and Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newTestimonial.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="image">
                  Upload Your Photo (optional)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="rating">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`text-xl sm:text-2xl transition-colors duration-200 ${
                        newTestimonial.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingChange(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="space-y-1">
                <label className="block text-gray-700 text-sm font-medium" htmlFor="content">
                  Your Experience
                </label>
                <textarea
                  name="content"
                  value={newTestimonial.content}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 min-h-[100px]"
                  rows={3}
                  placeholder="Share your experience"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-5 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Submit Testimonial
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;