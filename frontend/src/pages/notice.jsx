import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiCalendar, FiDownload } from "react-icons/fi";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNoticeId, setOpenNoticeId] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://eyehospital-kkd8.onrender.com/api/notice");
        const noticesData = response.data.notices || [];
        const sorted = noticesData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sorted);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleNotice = (id) => {
    setOpenNoticeId(openNoticeId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-600">Loading notices...</p>
        </div>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Notices Available</h2>
          <p className="text-gray-500">Check back later for updates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Hospital <span className="text-blue-600">Notices</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Important announcements and updates from Mechi Eye & Aesthetic Hospital
          </p>
        </motion.div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice, index) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleNotice(notice._id)}
                className={`w-full text-left p-6 transition-colors duration-200 ${openNoticeId === notice._id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2" />
                      {formatDate(notice.createdAt)}
                    </div>
                  </div>
                  {openNoticeId === notice._id ? (
                    <FiChevronUp className="text-gray-500 text-xl" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openNoticeId === notice._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {notice.image && (
                        <div className="relative group">
                          <img
                            src={notice.image}
                            alt="Notice"
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                          />
                          <a
                            href={notice.image}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100"
                          >
                            <FiDownload />
                          </a>
                        </div>
                      )}
                      <p className="text-gray-700">{notice.description}</p>
                      {notice.fileUrl && (
                        <a
                          href={notice.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <FiDownload className="mr-2" />
                          Download Attachment
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticePage;