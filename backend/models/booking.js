const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  isTraveled: { type: Boolean, default: false },
});

module.exports = mongoose.model('Booking', BookingSchema);
