import React from "react";
import { FaEye, FaUserMd, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import EyeCheckup from "./../assets/images/car2.jpg";

const MechiEyeSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="lg:col-span-1 flex justify-center">
          <img
            src={EyeCheckup}
            alt="Eye Checkup"
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Center - Text Content */}
        <div className="lg:col-span-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            Welcome To Mechi Eye & Aesthetic
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            On November 15, 2024, Mechi Eye & Aesthetic celebrated its 28th
            anniversary of dedicated community ophthalmic service in the region.
            This significant milestone marks a glorious year, allowing us to
            reflect on and appreciate the achievements made over the past
            twenty-eight years.
          </p>
        </div>

        {/* Right Side - Buttons */}
        <div className="lg:col-span-1 flex flex-col gap-4 w-full">
          {[
            { icon: FaEye, text: "Eye Donation Form" },
            { icon: FaUserMd, text: "Our Services" },
            { icon: FaMapMarkerAlt, text: "PECC Locations" },
            { icon: FaTimes, text: "Public Holidays" },
          ].map(({ icon: Icon, text }, index) => (
            <button
              key={index}
              className="flex items-center justify-between bg-blue-600 text-white text-sm sm:text-lg font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
            >
              <Icon className="mr-3" /> {text} <span>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechiEyeSection;
