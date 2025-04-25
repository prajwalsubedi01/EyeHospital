import React from "react";
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import EyeCheckup from "./../assets/images/welcome.jpeg";
import { Link } from "react-router-dom";

const MechiEyeSection = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        
        {/* Left Side - Circular Image */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
            <img
              src={EyeCheckup}
              alt="Eye Checkup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center - Text Content */}
        <div className="lg:col-span-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight">
            Welcome To Mechi Eye & Aesthetic
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            🌟 Welcome to <strong>Mechi Eye & Aesthetic Hospital Pvt. Ltd.</strong> 🌟
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            Located in the heart of <strong>Birtamode-03, Sainik Mode, Jhapa</strong>, our hospital is committed to 
            providing specialized care in various fields including Eye Care, Aesthetic Treatments, 
            ENT Services, and General Physician Consultations.
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            With a strong foundation built by a dedicated team of experienced doctors, bankers, 
            and respected intellectuals from our local community, we strive to bring world-class 
            healthcare to your doorstep. 
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            We are also excited to expand our services soon, offering <strong>Dental Care</strong>, 
            <strong> Pediatric Services</strong>, and much more.
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            Your health is our priority.
          </p>
          <p className="mt-2 text-gray-600 text-base sm:text-lg leading-relaxed text-justify indent-8">
            💌 Stay connected for updates, health tips, and more by following our page!
          </p>
        </div>

        {/* Right Side - Buttons with Links */}
        <div className="lg:col-span-1 flex flex-col gap-4 w-full">
          {[
            { icon: FaUserMd, text: "Our Services", link: "/services" },
            { icon: FaMapMarkerAlt, text: "MEAH Location", link: "/location" },
          ].map(({ icon: Icon, text, link }, index) => (
            <Link
              to={link}
              key={index}
              className="flex items-center justify-between bg-blue-600 text-white text-sm sm:text-lg font-semibold px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
            >
              <span className="flex items-center">
                <Icon className="mr-3" /> {text}
              </span>
              <span>›</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechiEyeSection;
