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

  // Check if route is active (including nested routes)
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // Custom Link component with active state and scroll to top
  const NavLink = ({ to, children, className, activeClassName, onClick }) => (
    <Link
      to={to}
      className={`${className} ${
        isActive(to) ? activeClassName : ""
      }`}
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
        <NavLink 
          to="/" 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          activeClassName=""
        >
          <img src={Mainlogo} alt="Logo" className="h-14 w-auto" />
          <span className="text-lg font-semibold text-blue-700">
            Mechi Eye & Aesthetic
          </span>
        </NavLink>

        {/* Middle Section - Nav Links */}
        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className="py-2 px-1 text-blue-700 hover:text-orange-500 transition relative"
            activeClassName="text-orange-500 font-medium"
          >
            Home
            {isActive('/') && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
            )}
          </NavLink>
          
          <div className="relative">
            <button
              className={`py-2 px-1 flex items-center gap-2 ${
                isActive('/about') 
                  ? "text-orange-500 font-medium" 
                  : "text-blue-700 hover:text-orange-500"
              } transition relative`}
              onClick={() => setAboutDropdown(!aboutDropdown)}
            >
              About Us
              <FaChevronDown
                className={`${
                  aboutDropdown ? "rotate-180" : ""
                } transition-transform`}
              />
              {isActive('/about') && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
              )}
            </button>
            {aboutDropdown && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50 border border-gray-200">
                <NavLink
                  to="/about/introduction"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  activeClassName="text-orange-500 bg-gray-50 font-medium"
                >
                  Introduction
                </NavLink>
                <NavLink
                  to="/about/our-team"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  activeClassName="text-orange-500 bg-gray-50 font-medium"
                >
                  Our Team
                </NavLink>
                <NavLink
                  to="/about/gallery"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  activeClassName="text-orange-500 bg-gray-50 font-medium"
                >
                  Gallery
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/services"
            className="py-2 px-1 text-blue-700 hover:text-orange-500 transition relative"
            activeClassName="text-orange-500 font-medium"
          >
            Hospital Services
            {isActive('/services') && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
            )}
          </NavLink>

          <NavLink
            to="/notice"
            className="py-2 px-1 text-blue-700 hover:text-orange-500 transition relative"
            activeClassName="text-orange-500 font-medium"
          >
            Notice
            {isActive('/notice') && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
            )}
          </NavLink>

          <NavLink
            to="/faqs"
            className="py-2 px-1 text-blue-700 hover:text-orange-500 transition relative"
            activeClassName="text-orange-500 font-medium"
          >
            FAQs
            {isActive('/faqs') && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></span>
            )}
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
            activeClassName="bg-blue-800"
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
              className={`w-full text-center py-2 text-lg ${
                isActive('/') 
                  ? "text-orange-500 font-medium bg-gray-50" 
                  : "text-blue-700 hover:text-orange-500"
              } transition`}
            >
              Home
            </NavLink>
            
            <div className="w-full flex flex-col items-center">
              <button
                className={`w-full text-center py-2 text-lg flex items-center justify-center gap-2 ${
                  isActive('/about') 
                    ? "text-orange-500 font-medium bg-gray-50" 
                    : "text-blue-700 hover:text-orange-500"
                } transition`}
                onClick={() => setMobileAboutDropdown(!mobileAboutDropdown)}
              >
                About Us
                <FaChevronDown
                  className={`${
                    mobileAboutDropdown ? "rotate-180" : ""
                  } transition-transform`}
                />
              </button>
              {mobileAboutDropdown && (
                <div className="w-full bg-gray-50 flex flex-col">
                  <NavLink
                    to="/about/introduction"
                    className={`py-2 px-4 ${
                      isActive('/about/introduction') 
                        ? "text-orange-500 font-medium" 
                        : "text-blue-700 hover:text-orange-500"
                    } transition`}
                  >
                    Introduction
                  </NavLink>
                  <NavLink
                    to="/about/our-team"
                    className={`py-2 px-4 ${
                      isActive('/about/our-team') 
                        ? "text-orange-500 font-medium" 
                        : "text-blue-700 hover:text-orange-500"
                    } transition`}
                  >
                    Our Team
                  </NavLink>
                  <NavLink
                    to="/about/gallery"
                    className={`py-2 px-4 ${
                      isActive('/about/gallery') 
                        ? "text-orange-500 font-medium" 
                        : "text-blue-700 hover:text-orange-500"
                    } transition`}
                  >
                    Gallery
                  </NavLink>
                </div>
              )}
            </div>
            
            <NavLink
              to="/services"
              className={`w-full text-center py-2 text-lg ${
                isActive('/services') 
                  ? "text-orange-500 font-medium bg-gray-50" 
                  : "text-blue-700 hover:text-orange-500"
              } transition`}
            >
              Hospital Services
            </NavLink>
            
            <NavLink
              to="/notice"
              className={`w-full text-center py-2 text-lg ${
                isActive('/notice') 
                  ? "text-orange-500 font-medium bg-gray-50" 
                  : "text-blue-700 hover:text-orange-500"
              } transition`}
            >
              Notice
            </NavLink>
            
            <NavLink
              to="/faqs"
              className={`w-full text-center py-2 text-lg ${
                isActive('/faqs') 
                  ? "text-orange-500 font-medium bg-gray-50" 
                  : "text-blue-700 hover:text-orange-500"
              } transition`}
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