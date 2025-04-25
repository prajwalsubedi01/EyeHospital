import React from "react";
import { Routes, Route } from "react-router-dom";

import Topnav from "../components/Topnav";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Carousel from "../components/Caurosel";

import Introduction from "../pages/about/introduction";
import OurTeam from "../pages/about/ourteam";
import Gallery from "../pages/about/gallery";
import Services from "../pages/services";
import Notice from "../pages/notice";
import FaQs from './../pages/faqs.jsx';
import Appointment from './../pages/appointment.jsx';
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/about/introduction" element={<Introduction />} />
        <Route path="/about/our-team" element={<OurTeam />} />
        <Route path="/about/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/faqs" element={<FaQs />} />
      </Routes>
      <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
