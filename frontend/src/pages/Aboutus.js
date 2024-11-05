import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Map, Star, Quote } from 'lucide-react';
import axios from 'axios';
import Testimonials from '../components/Testimonials';

const stats = [
  { icon: <Users size={24} />, title: 'Happy Clients', value: '10,000+' },
  { icon: <Briefcase size={24} />, title: 'Tours Completed', value: '500+' },
  { icon: <Map size={24} />, title: 'Destinations', value: '50+' },
  { icon: <Star size={24} />, title: 'Years Experience', value: '15+' },
];

const adventures = [
  {
    images: [
      'https://images.pexels.com/photos/19296851/pexels-photo-19296851/free-photo-of-an-old-man-with-a-long-beard-and-orange-turban.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/169188/pexels-photo-169188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9119105/pexels-photo-9119105.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    ],
    alt: 'Adventure 1',
  },
  {
    images: [
      'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/28610172/pexels-photo-28610172/free-photo-of-dynamic-off-road-motorcycle-racing-action.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
    ],
    alt: 'Adventure 2',
  },
  {
    images: [
      'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/147050/pexels-photo-147050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    alt: 'Adventure 3',
  },
];

const baseUrl = process.env.REACT_APP_API_URL;

const AdventureCard = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);



  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={alt}
            className="w-full h-64 object-cover flex-shrink-0"
            style={{ width: '100%' }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-lg font-semibold">Discover More</p>
      </div>
    </div>
  );
};

const AboutUs = () => {
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
        const response = await fetch(`${baseUrl}/testimonials`);
        const data = await response.json();
        setTestimonials(data);
        console.log(data);
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
        setNewTestimonial({ ...newTestimonial, [name]: reader.result }); // Store the image URL
      };
      
      reader.readAsDataURL(file); // Read the file as a data URL
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
      const response = await axios.post(`${baseUrl}/testimonials/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setTestimonials([...testimonials, response.data]);
      setNewTestimonial({ name: '', location: '', image: null, rating: 0, content: '' });
      // Show success message to user
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
    <div className="bg-gradient-to-b from-white to-orange-50 mt-10">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Wanderlust Adventures</h1>
          <p className="text-lg text-gray-600 mb-8">
            At Wanderlust Adventures, we're passionate about creating unforgettable travel experiences. Founded in 2008, we've been helping travelers explore the world's most breathtaking destinations for over a decade. Our team of expert guides and travel enthusiasts work tirelessly to craft unique, immersive journeys that go beyond the typical tourist experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Our Previous Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adventures.map((adventure, index) => (
              <AdventureCard key={index} images={adventure.images} alt={adventure.alt} />
            ))}
          </div>
        </div>

        {<Testimonials />}

        

        <div className="my-16 text-center">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ready for Your Next Adventure?</h2>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors duration-300">
            Plan Your Trip Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
