const express = require('express');
const {getfixedpackages,addPackage, deletePackage,updatePackage} = require('../controllers/packages');

const router = express.Router();

// Package Routes
router.get('/', getfixedpackages); // Get fixed packages 
router.post('/', addPackage);  
router.put('/:id', updatePackage);
router.delete('/:id',  deletePackage);

module.exports = router;
