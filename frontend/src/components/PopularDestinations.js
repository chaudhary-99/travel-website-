import React, { useEffect, useRef, useState } from 'react';
import PopularDestinationsCard from './cards/PopularDestinationsCard';
import AdminDestinationForm from '../components/admincomponents/AdminDestinationForm';

const baseUrl = process.env.REACT_APP_API_URL;

const PopularDestinations = ({ isAdmin }) => {
    const scrollContainerRef = useRef(null);
    const [destinations, setDestinations] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingDestination, setEditingDestination] = useState(null);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch(`${baseUrl}/popular-destinations`);
            const data = await response.json();
            console.log(data)
            setDestinations(data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    const handleAdd = async (newDestination) => {
        console.log(newDestination)
        try {
            const response = await fetch(`${baseUrl}/popular-destinations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDestination),
            });
            if (response.ok) {
                fetchDestinations();
                setShowAddForm(false);
            }
        } catch (error) {
            console.error("Error adding destination:", error);
        }
    };

    const handleEdit = async (updatedDestination) => {
        console.log(updatedDestination);
        const { id, ...destinationWithoutId } = updatedDestination;
    
        try {
            const response = await fetch(`${baseUrl}/popular-destinations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(destinationWithoutId), // Send data without id
            });
            if (response.ok) {
                fetchDestinations();
                setEditingDestination(null);
            }
        } catch (error) {
            console.error("Error updating destination:", error);
        }
    };
    

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this destination?")) {
            try {
                const response = await fetch(`${baseUrl}/popular-destinations/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchDestinations();
                }
            } catch (error) {
                console.error("Error deleting destination:", error);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft } = scrollContainerRef.current;
            const scrollAmount = 350;
            scrollContainerRef.current.scrollTo({
                left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className=" mb-20">
            <div className=" sm:px-5 flex justify-between items-center">
                <div>
                    <div className="pl-[3.1vw] text-2xl md:text-3xl lg:text-4xl font-bold">
                        Popular Destinations
                    </div>
                    <div className="pl-[3.1vw] text-sm md:text-base lg:text-lg text-gray-500">
                        From historical cities to natural spectaculars, come see the best of the world!
                    </div>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Add New Destination
                    </button>
                )}
            </div>

            <div className="w-full overflow-x-scroll no-scrollbar" ref={scrollContainerRef}>
                <div className="flex mt-10 w-max">
                    {destinations.map(dest => (
                        <PopularDestinationsCard
                            key={dest._id}
                            destination={dest}
                            isAdmin={isAdmin}
                            onEdit={() => setEditingDestination(dest)}
                            onDelete={() => handleDelete(dest._id)}
                        />
                    ))}
                </div>
            </div>

            {showAddForm && (
                <AdminDestinationForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {editingDestination && (
                <AdminDestinationForm
                    destination={editingDestination}
                    onSubmit={handleEdit}
                    onCancel={() => setEditingDestination(null)}
                />
            )}
        </div>
    );
};

export default PopularDestinations;
