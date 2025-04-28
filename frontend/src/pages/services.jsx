import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg";
    
    // If it's already a full URL (Cloudinary)
    if (imagePath.startsWith("http")) {
      // Add Cloudinary transformations if needed
      return imagePath.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill/"
      );
    }
    
    // If it's a local path (fallback)
    return `https://eyehospital-kkd8.onrender.com/uploads/${imagePath}`;
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/services");
        console.log("Fetched services:", res.data); // Debug log
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          🩺 Our Services
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No services available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-blue-600">
                <img
  src={`https://res.cloudinary.com/dkd42jpgx/image/upload/w_300,h_300,c_fill/${service.image}`}
  alt={service.title}
  className="w-32 h-32 object-cover rounded-full border-4 border-blue-600"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/placeholder.jpg";
  }}
/>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {service.description}
                </p>

                <Link
                  to="/appointment"
                  className="bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
                >
                  Get Appointment
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;