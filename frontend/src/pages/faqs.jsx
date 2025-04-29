// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

// const FAQ = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

  

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
       

//         {/* Additional Help */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="mt-16 bg-blue-100 rounded-xl p-6 text-center"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-3">
//             Still have questions?
//           </h3>
//           <p className="text-gray-700 mb-4">
//             Our team is ready to help with any additional inquiries you may have.
//           </p>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
//             Contact Us
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiPhone, FiFacebook, FiMessageSquare, FiX } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactLinks, setContactLinks] = useState({
    phone: '1234567890',
    facebook: 'https://facebook.com/yourhospital',
    whatsapp: 'https://wa.me/1234567890'
  });
  const [editMode, setEditMode] = useState(false);
  const [tempLinks, setTempLinks] = useState({...contactLinks});

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleEditClick = () => {
    setTempLinks({...contactLinks});
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setContactLinks({...tempLinks});
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleLinkChange = (e, field) => {
    setTempLinks({
      ...tempLinks,
      [field]: e.target.value
    });
  };

  const faqs = [
    { 
      question: 'What services do you provide?', 
      answer: 'We offer comprehensive eye care services including routine eye exams, cataract surgery, LASIK and other laser vision correction procedures, glaucoma treatment, retinal care, pediatric ophthalmology, and cosmetic eye treatments.' 
    },
    { 
      question: 'Do you accept insurance?', 
      answer: 'Yes, we accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Please contact our billing department to verify your specific coverage.' 
    },
    { 
      question: 'How can I book an appointment?', 
      answer: 'You can conveniently book an appointment through our website using the online scheduling system, by calling our office at (123) 456-7890, or by visiting our clinic during business hours.' 
    },
    { 
      question: 'Is your staff qualified?', 
      answer: 'Our team consists of board-certified ophthalmologists, licensed optometrists, and highly trained ophthalmic technicians. All medical staff maintain current certifications and participate in ongoing professional education.' 
    },
    { 
      question: 'What should I bring to my appointment?', 
      answer: 'For your first visit, please bring: 1) Photo ID, 2) Insurance card, 3) List of current medications, 4) Any previous eye health records, and 5) Your current eyeglasses or contact lenses.' 
    },
    { 
      question: 'How long will my appointment take?', 
      answer: 'Appointment durations vary: Comprehensive exams take 60-90 minutes, routine check-ups about 30 minutes, and surgical consultations typically 45-60 minutes. We recommend arriving 15 minutes early for paperwork.' 
    },
    { 
      question: 'Are walk-in appointments available?', 
      answer: 'We accommodate walk-ins for urgent eye care needs based on availability, though scheduled appointments are preferred. For emergencies like eye injuries or sudden vision changes, we prioritize immediate care.' 
    },
    { 
      question: 'What are your operating hours?', 
      answer: 'Our regular hours are Monday-Friday 8:30 AM to 5:30 PM, with extended hours until 7:00 PM on Tuesdays. Saturday hours are 9:00 AM to 2:00 PM. Were closed on Sundays and major holidays.' 
    },
    { 
      question: 'Do you provide pediatric eye care?', 
      answer: 'Yes, we have specialists in pediatric ophthalmology who provide comprehensive eye care for children including vision screenings, treatment for lazy eye (amblyopia), crossed eyes (strabismus), and other childhood eye conditions.' 
    },
    { 
      question: 'How do I prepare for eye surgery?', 
      answer: 'Preparation varies by procedure but generally includes: 1) Pre-operative testing, 2) Discontinuing certain medications (as advised), 3) Arranging transportation (as you cannot drive after most eye surgeries), and 4) Fasting if required. Detailed instructions will be provided during your surgical consultation.' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our services and procedures
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className={`w-full text-left p-6 transition-colors duration-200 flex justify-between items-center ${activeIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h2>
                {activeIndex === index ? (
                  <FiChevronUp className="text-blue-600 text-xl flex-shrink-0" />
                ) : (
                  <FiChevronDown className="text-gray-500 text-xl flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-blue-100 rounded-xl p-6 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-4">
            Our team is ready to help with any additional inquiries you may have.
          </p>
          <button 
            onClick={handleContactClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Contact Us</h3>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={tempLinks.phone}
                      onChange={(e) => handleLinkChange(e, 'phone')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Facebook Link</label>
                    <input
                      type="text"
                      value={tempLinks.facebook}
                      onChange={(e) => handleLinkChange(e, 'facebook')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Enter Facebook URL"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">WhatsApp Link</label>
                    <input
                      type="text"
                      value={tempLinks.whatsapp}
                      onChange={(e) => handleLinkChange(e, 'whatsapp')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      placeholder="Enter WhatsApp URL"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <button
                      onClick={handleCancelClick}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveClick}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FiPhone className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Phone</h4>
                        <a 
                          href={`tel:${contactLinks.phone}`} 
                          className="text-blue-600 hover:underline"
                        >
                          {contactLinks.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FiFacebook className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Facebook</h4>
                        <a 
                          href={contactLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Visit our Facebook page
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <FiMessageSquare className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">WhatsApp</h4>
                        <a 
                          href={contactLinks.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Chat with us on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;