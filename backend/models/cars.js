const mongoose = require('mongoose');

// Define the CarOption schema
const carOptionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0 
  }
}, {
  timestamps: true 
});

// Create the CarOption model
const CarOption = mongoose.model('CarOption', carOptionSchema);

module.exports = CarOption;
