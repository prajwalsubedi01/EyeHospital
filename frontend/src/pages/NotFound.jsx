import React from 'react';
import { FaHome, FaEye, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // or use Next.js Link if applicable

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center">
      {/* Animated Eye Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-white border-8 border-blue-200 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white animate-pulse"></div>
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-4xl">👁️</div>
      </div>

      {/* Message */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-poppins">404</h1>
      <h2 className="text-2xl md:text-3xl text-gray-700 mb-6 font-poppins">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-8 font-open-sans">
        The page you’re looking for doesn’t exist or has been moved. 
        Let’s guide you back to clarity.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
        >
          <FaHome /> Return Home
        </Link>
        <Link
          to="/services"
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
        >
          <FaEye /> Our Services
        </Link>
        <a
          href="tel:+9779802331993"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
        >
          <FaPhoneAlt /> Emergency Call
        </a>
      </div>

      {/* Subtle Footer Note */}
      <p className="mt-12 text-sm text-gray-500">
        Still lost? Email us at{" "}
        <a href="mailto:help@mechieye.np" className="text-blue-600 underline">
          help@mechieye.np
        </a>
      </p>
    </div>
  );
};

export default NotFound;