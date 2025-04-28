import React from "react";
import { FaUserMd, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import EyeCheckup from "./../assets/images/welcome.jpeg";
import { Link } from "react-router-dom";

const MechiEyeSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonItem = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="max-w-screen-xl mx-auto px-4 py-16 md:py-20"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
        {/* Left Side - Circular Image */}
        <motion.div 
          className="lg:col-span-1 flex justify-center"
          variants={item}
        >
          <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl group">
            <img
              src={EyeCheckup}
              alt="Eye Checkup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </motion.div>

        {/* Center - Text Content */}
        <motion.div 
          className="lg:col-span-1 text-center md:text-left space-y-6"
          variants={item}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
            Welcome To <span className="text-blue-600">Mechi Eye & Aesthetic</span>
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-justify">
              <span className="text-blue-500 font-medium">🌟 Welcome to Mechi Eye & Aesthetic Hospital Pvt. Ltd. 🌟</span>
            </p>
            <p className="text-justify">
              Located in the heart of <span className="font-semibold text-gray-800">Birtamode-03, Sainik Mode, Jhapa</span>, our hospital is committed to providing specialized care in various fields including Eye Care, Aesthetic Treatments, ENT Services, and General Physician Consultations.
            </p>
            <p className="text-justify">
              With a strong foundation built by a dedicated team of experienced doctors, bankers, and respected intellectuals from our local community, we strive to bring world-class healthcare to your doorstep.
            </p>
            <p className="text-justify">
              We are also excited to expand our services soon, offering <span className="font-semibold text-gray-800">Dental Care</span>, <span className="font-semibold text-gray-800">Pediatric Services</span>, and much more.
            </p>
            <p className="text-justify italic text-blue-600">
              Your health is our priority.
            </p>
          </div>
        </motion.div>

        {/* Right Side - Buttons with Links */}
        <motion.div 
          className="lg:col-span-1 flex flex-col gap-6 w-full"
          variants={container}
        >
          {[
            { icon: FaUserMd, text: "Our Services", link: "/services" },
            { icon: FaMapMarkerAlt, text: "MEAH Location", link: "/location" },
          ].map(({ icon: Icon, text, link }, index) => (
            <motion.div
              key={index}
              variants={buttonItem}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={link}
                className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full group"
              >
                <span className="flex items-center space-x-4">
                  <Icon className="text-xl" />
                  <span>{text}</span>
                </span>
                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MechiEyeSection;