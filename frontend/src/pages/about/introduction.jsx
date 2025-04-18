import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import AboutImg from './../../assets/images/car3.jpg';
const Introduction = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-blue-700 text-white text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold">Welcome to Mechi Eye & Aesthetic</h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
          Providing world-class eye care services with a compassionate approach.
        </p>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row items-center gap-12">
          <div className="w-full sm:w-1/2">
            <img
              src={AboutImg}
              alt="Eye Care"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">About Our Hospital</h2>
            <p className="text-lg text-gray-700">
              At Mechi Eye & Aesthetic, we are dedicated to providing high-quality, personalized eye
              care. Our team of expert ophthalmologists and skilled professionals are here to offer a
              full range of services to help you maintain or regain optimal vision.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              With state-of-the-art equipment and advanced techniques, we focus on treating each patient
              with the utmost care. Our hospital also provides aesthetic services to enhance your overall well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-blue-700">Expert Doctors</h3>
              <p className="text-gray-700 mt-2">Our ophthalmologists are experienced and certified, ensuring top-quality care.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-blue-700">Advanced Technology</h3>
              <p className="text-gray-700 mt-2">We use the latest technology for diagnosing and treating eye conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-blue-700">Compassionate Care</h3>
              <p className="text-gray-700 mt-2">We treat every patient with empathy, understanding, and respect.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Introduction;
