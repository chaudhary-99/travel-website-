const Package = require("../models/packages");
const mongoose = require('mongoose');

// Get all fixed packages
const getfixedpackages = async (req, res) => {
    try {
        const allpackages = await Package.find();
        res.json(allpackages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages' });
    }
}

// Add a new package
const addPackage = async (req, res) => {
    const { name, duration, basePrice, description, longDescription, image } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!name || !duration || !basePrice || !description || !image || image.length === 0) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    try {
        const newPackage = new Package({
            name,
            duration,
            basePrice,
            description,
            longDescription,
            image
        });

        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate key error. A package with the same name already exists.' });
        } else {
            res.status(500).json({ message: 'Server Error', error });
        }
    }
};


// Update a package
const updatePackage = async (req, res) => {
    try {
        const packageId = req.params.id;

        // Check if packageId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(400).json({ message: 'Invalid package ID' });
        }

        // Convert packageId to ObjectId
        const objectId = new mongoose.Types.ObjectId(packageId);
        const updatedPackage = await Package.findOneAndUpdate({ _id: objectId }, req.body, { new: true }); // Change to findOneAndUpdate
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: 'Error updating package', error: error.message });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const packageId = req.params.id;

        // Check if packageId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return res.status(400).json({ message: 'Invalid package ID' });
        }

        // Convert packageId to ObjectId
        const objectId = new mongoose.Types.ObjectId(packageId);

        // Delete the package
        const deletedPackage = await Package.findOneAndDelete({ _id: objectId });

        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }

        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting package', error: error.message });
    }
};

module.exports = { getfixedpackages, addPackage, updatePackage, deletePackage };
