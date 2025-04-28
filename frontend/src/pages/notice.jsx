// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const NoticePage = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openNoticeId, setOpenNoticeId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://eyehospital-kkd8.onrender.com/api/notice")
//       .then((response) => {
//         // Access the 'notices' array from the response data
//         const noticesData = response.data.notices || [];
        
//         // Sort notices based on creation date
//         const sorted = noticesData.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
        
//         // Set the notices data
//         setNotices(sorted);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching notices:", error);
//         setLoading(false);
//       });
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
//   };

//   const toggleNotice = (id) => {
//     setOpenNoticeId(openNoticeId === id ? null : id);
//   };

//   if (loading) {
//     return <div className="text-center text-lg mt-10">Loading notices...</div>;
//   }

//   if (notices.length === 0) {
//     return <div className="text-center text-lg mt-10">No notices available</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-10">
//         📢 Latest Notices
//       </h1>

//       <div className="space-y-5">
//         {notices.map((notice, index) => (
//           <div
//             key={notice._id}
//             className="border border-gray-300 rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
//           >
//             <button
//               onClick={() => toggleNotice(notice._id)}
//               className="w-full text-left px-4 sm:px-6 py-4 bg-gray-100 hover:bg-gray-200 font-medium sm:font-semibold text-base sm:text-lg"
//             >
//               {index + 1}. {notice.title}
//             </button>

//             {openNoticeId === notice._id && (
//               <div className="px-4 sm:px-6 py-4 bg-white space-y-3">
//                 {notice.image && (
//                   <a
//                     href={notice.image}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <img
//                       src={notice.image}
//                       alt="Notice"
//                       className="w-full max-h-64 object-cover rounded-md shadow-sm transition hover:opacity-90"
//                     />
//                   </a>
//                 )}
//                 <p className="text-gray-700 text-sm sm:text-base">{notice.description}</p>
//                 <p className="text-sm text-gray-500 text-right">
//                   🗓 Published: {formatDate(notice.createdAt)}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoticePage;
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
        const noticesData = response.data.notices || [];
        const sorted = noticesData.sort(
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

  if (notices.length === 0) {
    return <div className="text-center text-lg mt-10">No notices available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-10">
        📢 Latest Notices
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice, index) => (
          <div
            key={notice._id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <button
              onClick={() => toggleNotice(notice._id)}
              className="w-full text-left px-6 py-4 bg-blue-100 hover:bg-blue-200 font-semibold text-lg text-gray-700 focus:outline-none"
            >
              <h3 className="text-xl font-semibold">{notice.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Published: {formatDate(notice.createdAt)}
              </p>
            </button>

            {openNoticeId === notice._id && (
              <div className="px-6 py-4 bg-white space-y-4">
                {notice.image && (
                  <a
                    href={notice.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center"
                  >
                    <img
                      src={notice.image}
                      alt="Notice"
                      className="w-full h-60 object-cover rounded-md shadow-md transition-all duration-300 hover:opacity-90"
                    />
                  </a>
                )}
                <p className="text-gray-700 text-base">{notice.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
