import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
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
        {/* Admin Login (must be before catch-alls) */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Dashboard + Protected Routes */}
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
          <Route path="/admin/*" element={<Navigate to="/admin-login" replace />} />
        )}

        {/* Public Routes */}
        <Route path="/*" element={<PublicLayout />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
