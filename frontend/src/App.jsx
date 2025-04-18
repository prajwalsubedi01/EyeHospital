
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import components
import PublicLayout from "./components/PublicLayout"; 
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NoticeManagement from "./pages/admin/NoticeManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import AppointmentMangement from "./pages/admin/AppointmentMangement";
import NotFound from "./pages/NotFound"; // Optional 404 page

const App = () => {
  const isAuthenticated = localStorage.getItem("adminToken"); // Check for token in localStorage

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />

        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />}>
          <Route path="notice" element={isAuthenticated ? <NoticeManagement /> : <Navigate to="/admin-login" />} />
          <Route path="gallery" element={isAuthenticated ? <GalleryManagement /> : <Navigate to="/admin-login" />} />
          <Route path="team" element={isAuthenticated ? <TeamManagement /> : <Navigate to="/admin-login" />} />
          <Route path="services" element={isAuthenticated ? <ServicesManagement /> : <Navigate to="/admin-login" />} />
          <Route path="users" element={isAuthenticated ? <UsersManagement /> : <Navigate to="/admin-login" />} />
          <Route path="appointments" element={isAuthenticated ? <AppointmentMangement /> : <Navigate to="/admin-login" />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
