import React, { useState, useEffect } from "react";
import axios from "axios";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("https://eyehospital-kkd8.onrender.com/api/gallery", formData);
      setSelectedFile(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      console.error("Upload failed", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log("Trying to delete:", id);
    try {
      await axios.delete(`https://eyehospital-kkd8.onrender.com/api/gallery/${id}`);
      fetchImages();
    } catch (err) {
      console.error("Failed to delete image", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gallery Management</h1>

      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded w-full sm:w-auto"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-24 object-cover rounded shadow"
          />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={img.url || img.imageUrl}
              alt="Gallery"
              className="w-full h-48 object-cover rounded shadow-md"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm opacity-80 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManagement;
