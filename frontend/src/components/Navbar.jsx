import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaCalendarCheck, FaChevronDown } from "react-icons/fa";
import Mainlogo from "./../assets/images/mainlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [mobileAboutDropdown, setMobileAboutDropdown] = useState(false);
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setAboutDropdown(false);
    setMobileAboutDropdown(false);
  }, [location.pathname]);

  // Custom Link component that scrolls to top
  const NavLink = ({ to, children, className, onClick }) => (
    <Link
      to={to}
      className={className}
      onClick={() => {
        window.scrollTo(0, 0);
        if (onClick) onClick();
      }}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3">
          <NavLink to="/">
            <img src={Mainlogo} alt="Logo" className="h-14 w-auto" />
          </NavLink>
          <NavLink to="/" className="text-lg font-semibold text-blue-700">
            Mechi Eye & Aesthetic
          </NavLink>
        </div>

        {/* Middle Section - Nav Links */}
        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Home
          </NavLink>
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
                <NavLink
                  to="/about/introduction"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Introduction
                </NavLink>
                <NavLink
                  to="/about/our-team"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Our Team
                </NavLink>
                <NavLink
                  to="/about/gallery"
                  className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  onClick={() => setAboutDropdown(false)}
                >
                  Gallery
                </NavLink>
              </div>
            )}
          </div>
          <NavLink
            to="/services"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Hospital Services
          </NavLink>
          <NavLink
            to="/notice"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            Notice
          </NavLink>
          <NavLink
            to="/faqs"
            className="text-blue-700 hover:text-orange-500 transition"
          >
            FAQs
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <img
            src={Mainlogo}
            alt="Logo"
            className="h-14 w-auto hidden lg:block"
          />
          <NavLink
            to="/appointment"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800 transition"
          >
            <FaCalendarCheck /> <span>Appointment</span>
          </NavLink>
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
            <NavLink
              to="/"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
            >
              Home
            </NavLink>
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
                  <NavLink
                    to="/about/introduction"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  >
                    Introduction
                  </NavLink>
                  <NavLink
                    to="/about/our-team"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  >
                    Our Team
                  </NavLink>
                  <NavLink
                    to="/about/gallery"
                    className="block px-4 py-2 text-blue-700 hover:bg-gray-200"
                  >
                    Gallery
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/services"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
            >
              Hospital Services
            </NavLink>
            <NavLink
              to="/notice"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
            >
              Notice
            </NavLink>
            <NavLink
              to="/faqs"
              className="text-blue-700 hover:text-orange-500 transition text-lg"
            >
              FAQs
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;