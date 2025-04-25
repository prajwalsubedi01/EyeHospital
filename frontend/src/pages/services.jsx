import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          🩺Our Services
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
              >
                {service.image && (
                  <div className="w-32 h-32 mb-4">
                    <img
                      src={
                        service.image.startsWith("http")
                          ? service.image
                          : `https://eyehospital-kkd8.onrender.com/uploads/${service.image}`
                      }
                      alt={service.title}
                      className="w-32 h-32 object-cover rounded-full border-4 border-blue-600 mx-auto"
                    />
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6">
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
