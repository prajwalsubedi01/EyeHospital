import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUsers,
  FaCalendarCheck,
  FaCog,
  FaSignOutAlt,
  FaImages,
  FaClipboardList,
  FaHospital,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login"); // Use react-router instead of full page reload
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed h-screen bg-blue-900 p-5 pt-8 duration-300 ${isOpen ? "w-64" : "w-16"}`}>
        <FaBars
          className="text-white text-2xl absolute top-6 right-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="flex flex-col gap-6 mt-10">
          <SidebarItem icon={<FaUsers />} title="Users" isOpen={isOpen} path="/admin/users" />
          <SidebarItem icon={<FaClipboardList />} title="Notice" isOpen={isOpen} path="/admin/notice" />
          <SidebarItem icon={<FaImages />} title="Gallery" isOpen={isOpen} path="/admin/gallery" />
          <SidebarItem icon={<FaHospital />} title="Hospital Services" isOpen={isOpen} path="/admin/services" />
          <SidebarItem icon={<FaUsers />} title="Our Team" isOpen={isOpen} path="/admin/team" />
          <SidebarItem icon={<FaCalendarCheck />} title="Appointments" isOpen={isOpen} path="/admin/appointments" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-2 text-white hover:bg-red-600 rounded-md cursor-pointer"
          >
            <FaSignOutAlt className="text-xl" />
            <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-gray-700">Mechi Eye & Aesthetic</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Dynamic Page Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// SidebarItem Component
const SidebarItem = ({ icon, title, isOpen, path }) => (
  <Link
    to={path}
    className="flex items-center gap-4 p-2 hover:bg-blue-800 text-white rounded-md cursor-pointer"
  >
    <span className="text-xl">{icon}</span>
    <span className={`${isOpen ? "block" : "hidden"}`}>{title}</span>
  </Link>
);

export default AdminDashboard;
