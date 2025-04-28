import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // For user feedback
import "react-toastify/dist/ReactToastify.css";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize toast
  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://eyehospital-kkd8.onrender.com/api/gallery"
      );
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images", err);
      notify("Failed to load images", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      notify("Only JPG, JPEG, and PNG files are allowed", "error");
      return;
    }

    if (file.size > maxSize) {
      notify("File size should be less than 5MB", "error");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
  
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://eyehospital-kkd8.onrender.com/api/gallery/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000 // 30s timeout
        }
      );
  
      console.log("Full response:", response);
      alert("Upload successful!");
      fetchImages();
  
    } catch (err) {
      console.error("Detailed upload error:", {
        config: err.config,
        response: err.response,
        stack: err.stack
      });
      
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      setIsLoading(true);
      await axios.delete(
        `https://eyehospital-kkd8.onrender.com/api/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      notify("Image deleted successfully!");
      fetchImages();
    } catch (err) {
      console.error("Failed to delete image", err.response?.data || err.message);
      notify(
        err.response?.data?.message || "Failed to delete image",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Gallery Management</h1>

      {/* Upload Section */}
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="relative w-full sm:w-auto">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Choose Image (JPG/PNG, max 5MB)
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            disabled={isLoading}
          />
        </div>

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded shadow border"
            />
            <button
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
          className={`px-4 py-2 rounded transition flex items-center justify-center min-w-24 ${
            !selectedFile || isLoading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading && uploadProgress > 0 ? (
            `${uploadProgress}%`
          ) : (
            "Upload"
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Gallery Grid */}
      {isLoading && !images.length ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No images found in gallery
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={img.imageUrl}
                alt="Gallery"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <button
                  onClick={() => handleDelete(img._id)}
                  disabled={isLoading}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;