// routes/placeRoutes.js
const express = require('express');
const router = express.Router();
const {getAllPlaces,addPlace,deletePlace} = require('../controllers/places'); 
// const { isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllPlaces);
router.post('/', addPlace);
router.delete('/:id', deletePlace);

module.exports = router;
