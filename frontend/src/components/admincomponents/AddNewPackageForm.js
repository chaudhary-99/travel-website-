import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

const AddNewPackageForm = ({ onClose, onAddPackage, onUpdatePackage, editingPackage }) => {
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    longDescription: '',
    basePrice: '',
    duration: '',
    image: [''],
  });
  console.log(editingPackage)

  useEffect(() => {
    if (editingPackage) {
      setPackageData(editingPackage);
    }
  }, [editingPackage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...packageData.image];
    newImages[index] = value;
    setPackageData({ ...packageData, image: newImages });
  };

  const addImageField = () => {
    setPackageData({ ...packageData, image: [...packageData.image, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageData.name || !packageData.description || !packageData.basePrice || !packageData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const packageToSend = {
      ...packageData,
      basePrice: Number(packageData.basePrice),
    };

      delete packageToSend.__v;

    try {
      let response;
      if (editingPackage) {
        response = await axios.put(`${baseUrl}/packages/${editingPackage._id}`, packageToSend);
        if (response.status === 200) {
          alert('Package updated successfully');
          onUpdatePackage(response.data);
        }
      } else {
        response = await axios.post(`${baseUrl}/packages`, packageToSend);
        if (response.status === 201) {
          alert('Package added successfully');
          onAddPackage(response.data);
        }
      }
      onClose();
    } catch (error) {
      console.error('Error saving package:', error);
      alert(`Failed to ${editingPackage ? 'update' : 'add'} the package. Please try again.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-label="Close Form"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-orange-600">
          {editingPackage ? 'Edit Package' : 'Add New Package'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={packageData.name}
              onChange={handleChange}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea
              id="description"
              name="description"
              value={packageData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Long Description</label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={packageData.longDescription}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
            <input
              type="number"
              id="basePrice"
              name="basePrice"
              value={packageData.basePrice}
              onChange={handleChange}
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={packageData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 Days / 2 Nights"
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URLs</label>
            {packageData.image.map((url, index) => (
              <input
                key={index}
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Enter image URL"
                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add Another Image
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {editingPackage ? 'Update Package' : 'Add Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPackageForm;