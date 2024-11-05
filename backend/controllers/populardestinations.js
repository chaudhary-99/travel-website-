const popularDestination = require("../models/popularDestination");

const populardestinations = async (req,res) =>{
    try {
        const destinations = await popularDestination.find(); // Fetch destinations from MongoDB
        res.json(destinations);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching popular destinations' });
      }
}

const editDestination = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, popularityScore } = req.body;

  try {
      // Ensure only the fields allowed in the schema are updated
      const updatedDestination = await popularDestination.findByIdAndUpdate(
          id,
          { name, description, image, popularityScore },
          { new: true } // Return the updated document
      );
      
      if (!updatedDestination) {
          return res.status(404).json({ message: 'Destination not found' });
      }

      res.json(updatedDestination);
  } catch (error) {
      res.status(500).json({ message: 'Error updating destination', error });
  }
};

// Delete Destination Controller
const deleteDestination = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedDestination = await popularDestination.findByIdAndDelete(id);

      if (!deletedDestination) {
          return res.status(404).json({ message: 'Destination not found' });
      }

      res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting destination', error });
  }
};

const addDestination = async (req, res) => {
  const { name, description, image, popularityScore } = req.body;

  if (!name || !description || !image || typeof popularityScore !== 'number') {
    return res.status(400).json({ message: 'All fields are required with correct data types' });
  }

  try {
    const newDestination = new popularDestination({
      name,
      description,
      image,
      popularityScore,
    });

    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: 'Error adding destination', error });
  }
};

module.exports = {
  populardestinations,
  editDestination,
  deleteDestination,
  addDestination, 
};