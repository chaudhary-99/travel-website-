const express = require('express');
const {
  handleCreateBookingById,
  handleDeleteBookingById,
} = require('../controllers/authBooking');
const { restrictedToLoggedinUsersOnly } = require('../middlewares/auth');

const router = express.Router();

// Booking Routes
router.post('/:id/booknow', restrictedToLoggedinUsersOnly, handleCreateBookingById); // Create booking
router.delete('/:id/booknow/:bookingId', restrictedToLoggedinUsersOnly, handleDeleteBookingById); // Delete booking

module.exports = router;
