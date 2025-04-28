import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const PublicLayout = () => {
  const location = useLocation();

  // Animation trigger for first visit
  const [firstVisit, setFirstVisit] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstVisit(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={firstVisit ? { opacity: 0 } : {}}
      animate={firstVisit ? { opacity: 1, transition: { duration: 1 } } : {}}
      className="min-h-screen flex flex-col"
    >
      <Topnav />
      <Navbar />
      
      <div className="pt-12 flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Carousel />
                </motion.div>
              } 
            />
            <Route 
              path="/about/introduction" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Introduction />
                </motion.div>
              } 
            />
            <Route 
              path="/about/our-team" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <OurTeam />
                </motion.div>
              } 
            />
            <Route 
              path="/about/gallery" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Gallery />
                </motion.div>
              } 
            />
            <Route 
              path="/services" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Services />
                </motion.div>
              } 
            />
            <Route 
              path="/notice" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Notice />
                </motion.div>
              } 
            />
            <Route 
              path="/appointment" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Appointment />
                </motion.div>
              } 
            />
            <Route 
              path="/faqs" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <FaQs />
                </motion.div>
              } 
            />
          </Routes>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default PublicLayout;