const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Stores image URL
      required: false, // Make it optional (use false for optional)
      default: '', // Optional: Set a default (empty string or a placeholder image)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
