import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  // Helper function to get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg";
    
    // If it's already a full URL (Cloudinary)
    if (imagePath.startsWith("http")) {
      // Add Cloudinary transformations if needed
      return imagePath.replace(
        "/upload/",
        "/upload/w_200,h_200,c_fill/"
      );
    }
    
    // If it's a local path (fallback)
    return `https://eyehospital-kkd8.onrender.com/uploads/${imagePath}`;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/services");
      console.log("Fetched services:", res.data); // Debug log
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
      alert("Failed to load services. Check console for details.");
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Only JPG, JPEG, and PNG files are allowed");
        return;
      }

      if (file.size > maxSize) {
        alert("File size should be less than 5MB");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (editingId) {
        response = await axios.put(
          `https://eyehospital-kkd8.onrender.com/api/services/${editingId}`,
          formData,
          config
        );
      } else {
        response = await axios.post(
          "https://eyehospital-kkd8.onrender.com/api/services",
          formData,
          config
        );
      }

      console.log("Server response:", response.data);
      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Full error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    try {
      await axios.delete(`https://eyehospital-kkd8.onrender.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setServices(services.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting service", error);
      alert("Failed to delete service");
    }
    setLoading(false);
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setImagePreview(service.image);
    setEditingId(service._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = services
    .filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Services</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full sm:w-1/2 p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full sm:w-1/2 p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Service Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {imagePreview && (
            <div className="mt-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded flex justify-center items-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {loading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : editingId ? (
            "Update Service"
          ) : (
            "Add Service"
          )}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {loading && services.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No services found</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-md shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service) => (
                  <tr key={service._id} className="border">
                    <td className="border p-2">{service.title}</td>
                    <td className="border p-2">{service.description}</td>
                    <td className="border p-2">
                      <div className="h-16 w-16 mx-auto">
                        <img
                          src={getImageUrl(service.image)}
                          alt="Service"
                          className="h-full w-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.jpg";
                          }}
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="border p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(service)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center"
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded flex items-center"
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(Math.ceil(services.length / servicesPerPage)).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === number + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceManagement;