import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null); // Track which notice is expanded

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/notice");
        const sortedNotices = res.data.notices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotices(sortedNotices);
      } catch (err) {
        console.error("Failed to fetch notices", err);
        setError("Failed to load notices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Latest Notices
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : notices.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No notices available</div>
        ) : (
          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice._id}
                onClick={() => toggleExpand(notice._id)}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-shadow hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">{notice.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <AnimatePresence>
                  {expandedId === notice._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <p
                        className="text-gray-700 text-base mb-4"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {notice.description}
                      </p>

                      {notice.image && (
                        <div className="w-full max-w-md mx-auto">
                          <img
                            src={notice.image}
                            alt="Notice"
                            className="w-full h-auto rounded-lg shadow"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticePage;
