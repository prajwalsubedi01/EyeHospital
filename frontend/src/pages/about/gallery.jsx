import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [columns, setColumns] = useState(3);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery');
        setPhotos(res.data);
      } catch (err) {
        console.error('Error fetching photos:', err);
      }
    };
    fetchPhotos();
  }, []);

  // Responsive grid columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) setColumns(1);
      else if (width < 768) setColumns(2);
      else if (width < 1024) setColumns(3);
      else setColumns(4);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener('resize', handleResize);
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '20px',
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Photo Gallery</h2>

      <div style={gridStyle}>
        {photos.map((photo, index) => (
          <div key={photo._id} style={styles.card} onClick={() => openPreview(index)}>
            <img src={photo.url} alt="Gallery" style={styles.image} />
          </div>
        ))}
      </div>

      {isPreviewOpen && (
        <div style={styles.overlay}>
          <button style={styles.closeBtn} onClick={closePreview}>✖</button>
          <button style={styles.leftBtn} onClick={goLeft}>←</button>
          <img
            src={photos[currentIndex].url}
            alt="Full"
            style={styles.fullImage}
          />
          <button style={styles.rightBtn} onClick={goRight}>→</button>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  card: {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullImage: {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px',
  },
  closeBtn: {
    position: 'fixed',
    top: '20px',
    right: '30px',
    fontSize: '2rem',
    color: '#fff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  leftBtn: {
    position: 'absolute',
    left: '30px',
    fontSize: '2rem',
    color: '#fff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  rightBtn: {
    position: 'absolute',
    right: '30px',
    fontSize: '2rem',
    color: '#fff',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
};

export default GalleryPage;
