import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize } from 'react-icons/fi';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('https://eyehospital-kkd8.onrender.com/api/gallery');
        setPhotos(res.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const openPreview = (index) => {
    setCurrentIndex(index);
    setIsPreviewOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePreview();
      if (e.key === 'ArrowLeft') goLeft();
      if (e.key === 'ArrowRight') goRight();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen, currentIndex]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Our <span className="text-blue-600">Gallery</span>
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore moments from our hospital, events, and the care we provide to our patients.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={() => openPreview(index)}
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={photo.imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium truncate">
                    {photo.caption || `Image ${index + 1}`}
                  </span>
                </div>
                <div className="absolute top-3 right-3 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiMaximize className="text-white text-lg" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && photos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No photos available yet. Check back soon!</p>
          </div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {isPreviewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closePreview}
            >
              <button 
                onClick={closePreview}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close"
              >
                <FiX className="text-3xl" />
              </button>

              <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img
                    src={photos[currentIndex].imageUrl}
                    alt="Full Preview"
                    className="max-w-full max-h-[80vh] mx-auto rounded-lg shadow-xl object-contain"
                  />
                  {photos[currentIndex].caption && (
                    <div className="text-center mt-4 text-white">
                      {photos[currentIndex].caption}
                    </div>
                  )}
                </motion.div>

                <button
                  onClick={(e) => { e.stopPropagation(); goLeft(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Previous"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); goRight(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                  aria-label="Next"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
              </div>

              <div className="absolute bottom-6 left-0 right-0 text-center text-white text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryPage;