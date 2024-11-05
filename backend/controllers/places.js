const Place = require('../models/places');

const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places', error: error.message });
  }
};

const addPlace = async (req, res) => {
  try {
    const newPlace = new Place({ name: req.body.name });
    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(400).json({ message: 'Error adding place', error: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting place', error: error.message });
  }
};

module.exports = {getAllPlaces,addPlace,deletePlace}