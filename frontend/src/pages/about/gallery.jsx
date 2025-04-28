import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get('https://eyehospital-kkd8.onrender.com/api/gallery');
        setPhotos(res.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
      }
    };
    fetchPhotos();
  }, []);

  const openPreview = (index) => {
    setCurrentIndex(index);
    setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  const goLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-700 mb-8">
        📸 Our Photo Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo._id}
            onClick={() => openPreview(index)}
            className="rounded-xl overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img
              src={photo.imageUrl}
              alt={`Gallery ${index + 1}`}
              className="w-full h-56 object-cover"
            />
          </div>
        ))}
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button onClick={closePreview} className="absolute top-5 right-8 text-4xl text-white">✖</button>
          <button onClick={goLeft} className="absolute left-5 text-4xl text-white">←</button>
          <img
            src={photos[currentIndex].imageUrl}
            alt="Full Preview"
            className="max-w-[90%] max-h-[80%] rounded-lg shadow-lg"
          />
          <button onClick={goRight} className="absolute right-5 text-4xl text-white">→</button>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
