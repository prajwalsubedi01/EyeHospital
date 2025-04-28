import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://eyehospital-kkd8.onrender.com/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
      alert("Failed to load services. Check console for details.");
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        await axios.put(
          `https://eyehospital-kkd8.onrender.com/api/services/${editingId}`,
          data,
          config
        );
      } else {
        await axios.post(
          "https://eyehospital-kkd8.onrender.com/api/services",
          data,
          config
        );
      }

      fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null
    });
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
    setFormData({
      title: service.title,
      description: service.description,
      image: null
    });
    setImagePreview(service.image);
    setEditingId(service._id);
  };

  // Pagination logic
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Services</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="title"
            placeholder="Service Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full sm:w-1/2 p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
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
                src={imagePreview.startsWith('http') ? imagePreview : URL.createObjectURL(imagePreview)}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded flex justify-center items-center ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
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
    </div>
  );
};

export default ServiceManagement;