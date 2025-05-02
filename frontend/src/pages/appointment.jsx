import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaClinicMedical, 
  FaPhoneAlt, 
  FaCheck,
  FaInfoCircle
} from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Comprehensive Eye Exam',
    'Cataract Consultation',
    'LASIK Evaluation',
    'Glaucoma Screening',
    'Diabetic Eye Exam',
    'Pediatric Ophthalmology',
    'Contact Lens Fitting',
    'Emergency Eye Care'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Combine date and time
      const appointmentDateTime = `${formData.date}T${moment(formData.time, 'hh:mm A').format('HH:mm')}`;
      
      const response = await axios.post('https://eyehospital-kkd8.onrender.com/api/appointment', {
        ...formData,
        date: appointmentDateTime
      });
      
      // Show success alert
      Swal.fire({
        title: '<strong>Appointment Booked!</strong>',
        icon: 'success',
        html: `
          <div style="text-align: left; font-size: 16px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Date:</strong> ${moment(formData.date).format('MMMM D, YYYY')}</p>
            <p><strong>Time:</strong> ${formData.time}</p>
            <hr style="margin: 10px 0;">
            <p>We've sent confirmation details to <strong>${formData.email}</strong></p>
            <p>Our team will contact you if we need any additional information.</p>
          </div>
        `,
        showCloseButton: true,
        confirmButtonText: 'Got it!',
        background: '#f8f9fa',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
      
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: error.response?.data?.message || 'Failed to book appointment. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emergencyPhoneNumber = "+9779826991540";

  const handleEmergencyCall = () => {
    window.location.href = `tel:${emergencyPhoneNumber}`;
  };

  // Calculate minimum date (tomorrow)
  const minDate = moment().add(1, 'days').format('YYYY-MM-DD');
  // Calculate maximum date (3 months from now)
  const maxDate = moment().add(3, 'months').format('YYYY-MM-DD');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-2">
              <FaCalendarAlt className="text-2xl" />
              <h1 className="text-2xl md:text-3xl font-bold">Eye Care Appointment</h1>
            </div>
            <p className="text-blue-100 max-w-md">
              Book your consultation with our specialist ophthalmologists
            </p>
          </div>

          {/* Emergency Call Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmergencyCall}
            className="absolute right-4 top-4 md:right-6 md:top-6 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
            aria-label="Emergency call"
          >
            <FaPhoneAlt className="text-lg" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className=" text-gray-700 font-medium flex items-center">
                <FaUser className="mr-2 text-blue-600" /> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className=" text-gray-700 font-medium flex items-center">
                <FaPhone className="mr-2 text-blue-600" /> Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400`}
                placeholder="98XXXXXXXX"
              />
              {errors.phone && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className=" text-gray-700 font-medium flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" /> Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.email}</p>}
            </div>

            {/* Service */}
            <div className="space-y-2">
              <label htmlFor="service" className=" text-gray-700 font-medium flex items-center">
                <FaClinicMedical className="mr-2 text-blue-600" /> Service Needed *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400 bg-white`}
              >
                <option value="">Select a service...</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.service}</p>}
            </div>
          </div>

          {/* Appointment Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-2">
              <label htmlFor="date" className=" text-gray-700 font-medium flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" /> Appointment Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                className={`w-full px-4 py-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400`}
              />
              {errors.date && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.date}</p>}
              <p className="text-gray-500 text-xs mt-1">
                Available dates: {moment(minDate).format('MMM D')} - {moment(maxDate).format('MMM D, YYYY')}
              </p>
            </div>

            {/* Time Slot */}
            <div className="space-y-2">
              <label htmlFor="time" className=" text-gray-700 font-medium flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" /> Time Slot *
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-400 bg-white`}
              >
                <option value="">Select a time...</option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && <p className="text-red-500 text-sm flex items-center mt-1"><FaInfoCircle className="mr-1" /> {errors.time}</p>}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-gray-700 font-medium">
              Additional Notes
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Any special requirements, symptoms, or notes..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-bold text-lg text-white transition ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <FaCheck className="inline mr-2" />
                  Book Appointment
                </>
              )}
            </button>
          </div>

          {/* Emergency Button - Mobile */}
          <button
            type="button"
            onClick={handleEmergencyCall}
            className="md:hidden w-full py-3 mt-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            <FaPhoneAlt />
            <span>Emergency Call</span>
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Need immediate help? Call us at {' '}
            <button
              onClick={handleEmergencyCall}
              className="font-semibold text-blue-600 hover:underline flex items-center justify-center mx-auto"
            >
              <FaPhoneAlt className="mr-1" /> {emergencyPhoneNumber}
            </button>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Our clinic hours: 9AM-5PM, Everyday
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentForm;