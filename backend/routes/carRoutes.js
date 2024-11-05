const express = require('express');
const getcars = require('../controllers/cars');

const router = express.Router();

// Car Routes
router.get('/', getcars); // Get cars

module.exports = router;
