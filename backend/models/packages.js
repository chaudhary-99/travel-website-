const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  image: {
    type: [String],
    required: true,
  },
}, { versionKey: false });

const Package = mongoose.model('fixedPackages', PackageSchema);

module.exports = Package;
