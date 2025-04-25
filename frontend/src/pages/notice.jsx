import React, { useEffect, useState } from "react";
import axios from "axios";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNoticeId, setOpenNoticeId] = useState(null);

  useEffect(() => {
    axios
      .get("https://eyehospital-kkd8.onrender.com/api/notice")
      .then((response) => {
        const sorted = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sorted);
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

  const toggleNotice = (id) => {
    setOpenNoticeId(openNoticeId === id ? null : id);
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading notices...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-10">
        📢 Latest Notices
      </h1>

      <div className="space-y-5">
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            className="border border-gray-300 rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
          >
            <button
              onClick={() => toggleNotice(notice._id)}
              className="w-full text-left px-4 sm:px-6 py-4 bg-gray-100 hover:bg-gray-200 font-medium sm:font-semibold text-base sm:text-lg"
            >
              {index + 1}. {notice.title}
            </button>

            {openNoticeId === notice._id && (
              <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
                {notice.image && (
                  <a
                    href={`https://eyehospital-kkd8.onrender.com/uploads/${notice.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://eyehospital-kkd8.onrender.com/uploads/${notice.image}`}
                      alt="Notice"
                      className="w-full max-h-64 object-cover rounded-md shadow-sm transition hover:opacity-90"
                    />
                  </a>
                )}
                <p className="text-gray-700 text-sm sm:text-base">{notice.description}</p>
                <p className="text-sm text-gray-500 text-right">
                  🗓 Published: {formatDate(notice.createdAt)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
