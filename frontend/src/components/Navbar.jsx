// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes, FaCalendarCheck, FaChevronDown } from "react-icons/fa";
// import Mainlogo from "./../assets/images/mainlogo.jpg";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutDropdown, setAboutDropdown] = useState(false);
//   const [mobileAboutDropdown, setMobileAboutDropdown] = useState(false);

//   return (
//     <nav className="bg-white shadow-md w-full relative">
//       <div className="container mx-auto flex justify-between items-center px-4 py-3">
//         {/* Left Section - Logo */}
//         <div className="flex items-center gap-3">
//           <img src={Mainlogo} alt="Logo" className="h-12 w-auto" />
//           <h1 className="text-lg font-semibold text-blue-700">
//             Mechi Eye & Aesthetic
//           </h1>
//         </div>

//         {/* Middle Section - Nav Links */}
//         <div className="hidden md:flex gap-6">
//           <Link to="/" className="text-blue-700 hover:text-orange-500 transition">
//             Home
//           </Link>
//           <div className="relative">
//             <button
//               className="text-blue-700 hover:text-orange-500 transition flex items-center gap-2"
//               onClick={() => setAboutDropdown(!aboutDropdown)}
//             >
//               About Us <FaChevronDown className={`${aboutDropdown ? "rotate-180" : ""} transition-transform`} />
//             </button>
//             {aboutDropdown && (
//               <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50 border border-gray-200">
//                 <Link
//                   to="/about/introduction"
//                   className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
//                   onClick={() => setAboutDropdown(false)}
//                 >
//                   Introduction
//                 </Link>
//                 <Link
//                   to="/about/our-team"
//                   className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
//                   onClick={() => setAboutDropdown(false)}
//                 >
//                   Our Team
//                 </Link>
//                 <Link
//                   to="/about/gallery"
//                   className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
//                   onClick={() => setAboutDropdown(false)}
//                 >
//                   Gallery
//                 </Link>
//               </div>
//             )}
//           </div>
//           <Link to="/services" className="text-blue-700 hover:text-orange-500 transition">
//             Hospital Services
//           </Link>
//           <Link to="/notice" className="text-blue-700 hover:text-orange-500 transition">
//             Notice
//           </Link>
//           <Link to="/faqs" className="text-blue-700 hover:text-orange-500 transition">
//             FAQs
//           </Link>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           <img src={Mainlogo} alt="Logo" className="h-10 w-auto hidden lg:block" />
//           <Link
//             to="/appointment"
//             className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition"
//           >
//             <FaCalendarCheck /> <span>Appointment</span>
//           </Link>
//           <button
//             className="md:hidden text-blue-700 text-2xl"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t transition-all duration-300 py-3">
//           <div className="flex flex-col items-center space-y-3">
//             <Link to="/" className="text-blue-700 hover:text-orange-500 transition text-lg" onClick={() => setIsOpen(false)}>
//               Home
//             </Link>
//             <div className="w-full flex flex-col items-center">
//               <button
//                 className="text-blue-700 hover:text-orange-500 transition text-lg flex items-center gap-2"
//                 onClick={() => setMobileAboutDropdown(!mobileAboutDropdown)}
//               >
//                 About Us <FaChevronDown className={`${mobileAboutDropdown ? "rotate-180" : ""} transition-transform`} />
//               </button>
//               {mobileAboutDropdown && (
//                 <div className="bg-white shadow-lg w-48 z-50 border border-gray-200 rounded-lg mt-1 flex flex-col">
//                   <Link to="/about/introduction" className="block px-4 py-2 text-blue-700 hover:bg-gray-200" onClick={() => { setIsOpen(false); setMobileAboutDropdown(false); }}>
//                     Introduction
//                   </Link>
//                   <Link to="/about/our-team" className="block px-4 py-2 text-blue-700 hover:bg-gray-200" onClick={() => { setIsOpen(false); setMobileAboutDropdown(false); }}>
//                     Our Team
//                   </Link>
//                   <Link to="/about/gallery" className="block px-4 py-2 text-blue-700 hover:bg-gray-200" onClick={() => { setIsOpen(false); setMobileAboutDropdown(false); }}>
//                     Gallery
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <Link to="/services" className="text-blue-700 hover:text-orange-500 transition text-lg" onClick={() => setIsOpen(false)}>
//               Hospital Services
//             </Link>
//             <Link to="/notice" className="text-blue-700 hover:text-orange-500 transition text-lg" onClick={() => setIsOpen(false)}>
//               Notice
//             </Link>
//             <Link to="/faqs" className="text-blue-700 hover:text-orange-500 transition text-lg" onClick={() => setIsOpen(false)}>
//               FAQs
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaChevronDown,
} from "react-icons/fa";
import Mainlogo from "./../assets/images/mainlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mobileAboutDropdown, setMobileAboutDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          <img src={Mainlogo} alt="Logo" className="h-14 w-auto" />
          <h1 className="text-lg font-semibold text-blue-700">
            Mechi Eye & Aesthetic
          </h1>
        </div>

        {/* Middle Section - Nav Links */}
        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Home
          </Link>
          <div className="relative">
            <button
              className="text-blue-700 hover:text-orange-500 transition flex items-center gap-2"
              onClick={() => setAboutDropdown(!aboutDropdown)}
            >
              About Us{" "}
              <FaChevronDown
                className={`${
                  aboutDropdown ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
            {aboutDropdown && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50 border border-gray-200">
                <Link
                  to="/about/introduction"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Introduction
                </Link>
                <Link
                  to="/about/our-team"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Our Team
                </Link>
                <Link
                  to="/about/gallery"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Gallery
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/services"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Hospital Services
          </Link>
          <Link
            to="/notice"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Notice
          </Link>
          <Link
            to="/faqs"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            FAQs
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <img
            src={Mainlogo}
            alt="Logo"
            className="h-14 w-auto hidden lg:block"
          />
          <Link
            to="/appointment"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition"
          >
            <FaCalendarCheck /> <span>Appointment</span>
          </Link>
          <button
            className="md:hidden text-blue-700 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t transition-all duration-300 py-3">
          <div className="flex flex-col items-center space-y-3">
            <Link
              to="/"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="w-full flex flex-col items-center">
              <button
                className="text-blue-700 hover:text-orange-500 transition text-lg flex items-center gap-2"
                onClick={() => setMobileAboutDropdown(!mobileAboutDropdown)}
              >
                About Us{" "}
                <FaChevronDown
                  className={`${
                    mobileAboutDropdown ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {mobileAboutDropdown && (
                <div className="bg-white shadow-lg w-48 z-50 border border-gray-200 rounded-lg mt-1 flex flex-col">
                  <Link
                    to="/about/introduction"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileAboutDropdown(false);
                    }}
                  >
                    Introduction
                  </Link>
                  <Link
                    to="/about/our-team"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileAboutDropdown(false);
                    }}
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/about/gallery"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileAboutDropdown(false);
                    }}
                  >
                    Gallery
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/services"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
              onClick={() => setIsOpen(false)}
            >
              Hospital Services
            </Link>
            <Link
              to="/notice"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
              onClick={() => setIsOpen(false)}
            >
              Notice
            </Link>
            <Link
              to="/faqs"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
              onClick={() => setIsOpen(false)}
            >
              FAQs
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
