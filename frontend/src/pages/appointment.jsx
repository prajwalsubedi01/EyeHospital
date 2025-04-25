import React, { useState } from 'react';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
  });

  const services = [
    'Eye Checkup',
    'Cataract Surgery',
    'Laser Treatment',
    'Glasses Prescription',
    'Follow-up Visit',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Data:', formData);
    // Later you can connect this to your backend API.
    alert('Appointment request submitted successfully!');
    setFormData({ name: '', phone: '', email: '', service: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🗓 Book Your Appointment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="98XXXXXXXX"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Type of Service</label>
            <select
              name="service"
              value={formData.service}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
