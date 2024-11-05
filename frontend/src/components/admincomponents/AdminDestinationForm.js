import React, { useState, useEffect } from 'react';

const AdminDestinationForm = ({ destination, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: [''], // Initialize with one empty string for image URL
        popularityScore: 0,
    });

    useEffect(() => {
        if (destination) {
            setFormData({
                name: destination.name,
                description: destination.description,
                image: destination.image || [], // Use the destination's images or an empty array
                popularityScore: destination.popularityScore || 0,
                id:destination._id,
            });
        }
    }, [destination]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.image];
        updatedImages[index] = value; // Update the image at the specified index
        setFormData(prevData => ({
            ...prevData,
            image: updatedImages,
        }));
    };

    const handleAddImage = () => {
        setFormData(prevData => ({
            ...prevData,
            image: [...prevData.image, ''], // Add an empty string for a new image input
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.image.filter((_, i) => i !== index); // Remove the image at the specified index
        setFormData(prevData => ({
            ...prevData,
            image: updatedImages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4">
                    {destination ? 'Edit Destination' : 'Add New Destination'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                        {formData.image.map((image, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Image URL"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="ml-2 bg-red-500 text-white hover:bg-red-600 px-2 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="mt-2 bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
                        >
                            Add Image
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="popularityScore">
                            Popularity Score
                        </label>
                        <input
                            type="number"
                            id="popularityScore"
                            name="popularityScore"
                            value={formData.popularityScore}
                            onChange={handleChange}
                            min="0"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {destination ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDestinationForm;
