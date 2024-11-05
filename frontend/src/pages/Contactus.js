import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem submitting the form.");
    }
  };

  return (
    <div className="bg-gray-50 py-16 px-4 lg:px-24 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-12">
          We'd love to hear from you! Reach out to us for any inquiries, bookings, or support.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-xl rounded-lg p-8 transform transition duration-300 hover:shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full border border-gray-300 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full border border-gray-300 p-4 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white shadow-xl rounded-lg p-8 flex flex-col justify-center space-y-6 transform transition duration-300 hover:shadow-2xl">
            {/* Email */}
            <div className="flex items-center">
              <FaEnvelope className="text-orange-600 text-2xl mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@tourtravel.com</p>
              </div>
            </div>
            {/* Phone */}
            <div className="flex items-center">
              <FaPhone className="text-orange-600 text-2xl mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+123 456 7890</p>
              </div>
            </div>
            {/* Address */}
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-orange-600 text-2xl mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 Travel Street, City, Country</p>
              </div>
            </div>
            {/* Office Hours */}
            <div className="flex items-center">
              <FaClock className="text-orange-600 text-2xl mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-800">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        
        <div className="mt-16">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.6161176086543!2d77.68504527627965!3d27.574421976259114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736f19f36b215f%3A0x2586840a6d711298!2sLaxman%20tour%20and%20travels!5e0!3m2!1sen!2sin!4v1728404146443!5m2!1sen!2sin"
            width="100%"
            height="450"
            className="rounded-lg shadow-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
