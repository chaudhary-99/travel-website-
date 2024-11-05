const express = require('express');
const { getTestimonials, postTestimonials } = require('../controllers/testimonials'); // Destructure imports
const upload = require('../middlewares/uploads')


const router = express.Router();

// Testimonial Routes
router.get('/', getTestimonials); 
router.post('/add', upload.single('image') , postTestimonials);

module.exports = router;
