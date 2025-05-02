import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaQuoteLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AboutImg from "./../../assets/images/car3.jpg";
import ChairmanImg from "./../../assets/images/chairman.jpg";

const Introduction = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/appointment");
  };

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

  const features = [
    {
      title: "Expert Doctors",
      description: "Our board-certified ophthalmologists bring years of specialized training and experience."
    },
    {
      title: "Advanced Technology",
      description: "Cutting-edge diagnostic and surgical equipment for precise treatments."
    },
    {
      title: "Compassionate Care",
      description: "Patient-centered approach with personalized treatment plans."
    },
    {
      title: "Comprehensive Services",
      description: "From routine exams to complex surgeries - all under one roof."
    },
    {
      title: "Modern Facilities",
      description: "State-of-the-art clinic designed for patient comfort and safety."
    },
    {
      title: "Affordable Options",
      description: "We work with most insurance providers and offer payment plans."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-blue-700 text-white py-20 md:py-28 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Welcome to <span className="text-blue-300">Mechi Eye & Aesthetic</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-blue-100"
          >
            Excellence in eye care with cutting-edge technology and compassionate service
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <button 
              onClick={handleAppointmentClick}
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Appointment
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-blue-300"></div>
      </motion.section>

      {/* Introduction Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          <motion.div 
            variants={item}
            className="w-full lg:w-1/2 relative"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={AboutImg}
                alt="Modern Eye Clinic"
                className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
              <div className="text-blue-700 font-bold text-2xl">1+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About Our <span className="text-blue-600">Hospital</span>
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Mechi Eye & Aesthetic is a premier eye care center dedicated to providing 
              world-class ophthalmic services. Founded in 2008, we've grown to become 
              a trusted name in eye health with over 50,000 successful procedures.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our 10,000 sq.ft facility houses the latest diagnostic and surgical 
              equipment, operated by a team of highly skilled specialists. We combine 
              medical excellence with personalized care for optimal patient outcomes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">Certified Specialists</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">24/7 Emergency Care</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">Multilingual Staff</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-700">Free Parking</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Chairman's Message */}
      <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-700 p-8 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <img
                    src={ChairmanImg}
                    alt="Himal Subedi"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 shadow-md">
                    <FaQuoteLeft className="text-xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Mr. Himal Subedi</h3>
                <p className="text-blue-200">Chairman & Founder</p>
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Message from the <span className="text-blue-600">Chairman</span>
                </h2>
                <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                  <p>
                    "Our vision at Mechi Eye & Aesthetic has always been to combine 
                    medical excellence with genuine compassion. Since our founding, 
                    we've remained committed to making advanced eye care accessible 
                    to all."
                  </p>
                  <p>
                    "What sets us apart is our team's dedication to not just treating 
                    eyes, but caring for people. Every innovation we adopt, every 
                    specialist we train, and every piece of equipment we install 
                    serves this fundamental purpose."
                  </p>
                  <p>
                    "We're proud to have served over 50,000 patients and look forward 
                    to continuing our mission of delivering exceptional eye care with 
                    integrity and compassion."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">Mechi Eye?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our eye care services exceptional
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-blue-600 mb-4">
                  <FaCheckCircle className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to experience exceptional eye care?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule your appointment today and take the first step toward better vision.
            </p>
            <button 
              onClick={handleAppointmentClick}
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Book an Appointment
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;