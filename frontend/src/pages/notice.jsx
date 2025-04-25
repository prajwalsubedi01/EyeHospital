import React, { useEffect, useState } from "react";
import axios from "axios";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://eyehospital-kkd8.onrender.com/api/notice")
      .then((response) => {
        setNotices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading notices...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">📢 Latest Notices</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-white shadow-lg rounded-xl p-6 transition duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            {notice.image && (
              <a href={`https://eyehospital-kkd8.onrender.com/uploads/${notice.image}`} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://eyehospital-kkd8.onrender.com/uploads/${notice.image}`}
                  alt="Notice"
                  className="h-60 w-full object-cover rounded-xl shadow-md hover:opacity-90 transition"
                />
              </a>
            )}
            <h2 className="text-2xl font-semibold mt-4 text-gray-900">{notice.title}</h2>
            <p className="text-gray-700 mt-2">{notice.description}</p>
            <p className="text-gray-500 text-sm mt-4 text-right">🗓 Published: {formatDate(notice.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
