const Testimonial = require("../models/testimonials");

const getTestimonials = async (req, res) => {
    try {
        const allTestimonials = await Testimonial.find();
        res.status(200).json(allTestimonials); // Return a 200 status code explicitly
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
};

const postTestimonials = async (req, res) => {
    try {
        console.log(req);
        const { name, location, rating, content,image } = req.body;
    
        const newTestimonial = new Testimonial({
          name,
          location,
          rating: Number(rating),
          content,
          image// Store the image path in the database
        });
    
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
      } catch (error) {
        console.error('Error saving testimonial:', error);
        res.status(500).json({ message: 'Error saving testimonial' });
      }
};

module.exports = { getTestimonials, postTestimonials };
