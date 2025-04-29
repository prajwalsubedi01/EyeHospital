import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const TeamPage = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("https://eyehospital-kkd8.onrender.com/api/team");
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Expert Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of healthcare professionals committed to providing exceptional eye care and aesthetic services.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member._id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 flex flex-col items-center">
                {/* Profile Image */}
                <div className="relative mb-6">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                  )}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-blue-400 transition-all duration-300"></div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.post}</p>

                  {/* Social Links */}
                  {(member.phone || member.facebook || member.whatsapp || member.instagram) && (
                    <div className="flex justify-center space-x-4 mt-3">
                      {member.phone && (
                        <a 
                          href={`tel:${member.phone}`} 
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                          aria-label="Phone"
                        >
                          <FaPhone className="text-lg" />
                        </a>
                      )}
                      {member.facebook && (
                        <a 
                          href={member.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600 transition-colors"
                          aria-label="Facebook"
                        >
                          <FaFacebook className="text-lg" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a 
                          href={`https://wa.me/${member.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-green-600 transition-colors"
                          aria-label="WhatsApp"
                        >
                          <FaWhatsapp className="text-lg" />
                        </a>
                      )}
                      {member.instagram && (
                        <a 
                          href={member.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-pink-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <FaInstagram className="text-lg" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {team.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">Our team members will be listed here soon.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;