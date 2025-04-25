import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layouts and Pages
import PublicLayout from "./components/PublicLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NoticeManagement from "./pages/admin/NoticeManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import ServicesManagement from "./pages/admin/ServicesManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import AppointmentMangement from "./pages/admin/AppointmentMangement";
import NotFound from "./pages/NotFound";

const App = () => {
  const isAuthenticated = localStorage.getItem("adminToken");

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/*" element={<PublicLayout />} />

        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Area */}
        {isAuthenticated ? (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="notice" element={<NoticeManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="appointments" element={<AppointmentMangement />} />
          </Route>
        ) : (
          // If not authenticated, redirect any /admin route to login
          <Route path="/admin/*" element={<Navigate to="/admin-login" replace />} />
        )}

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
