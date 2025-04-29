// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], // Update these values to match what you want
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);