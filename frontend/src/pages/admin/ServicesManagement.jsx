import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSpinner, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://eyehospital-kkd8.onrender.com/api/services';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', image: null });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, image } = formData;
    if (!title || !description || (!editingId && !image)) {
      toast.error('Please fill all required fields!');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      if (image) {
        data.append('image', image);
      }

      const token = localStorage.getItem('token');

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        toast.success('Service updated successfully!');
      } else {
        await axios.post(API_URL, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        toast.success('Service created successfully!');
      }

      resetForm();
      fetchServices();
    } catch (err) {
      console.error('Error submitting service:', err.response?.data || err.message);
      toast.error('Failed to submit service');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description, image: null });
    setImagePreview(service.image);
    setEditingId(service._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      setServices((prev) => prev.filter((service) => service._id !== id));
      toast.success('Service deleted successfully');
    } catch (err) {
      console.error('Error deleting service:', err.response?.data || err.message);
      toast.error('Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Form */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Service' : 'Add Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Service Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block mb-2"
              required={!editingId}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded" />
            )}
          </div>

          <div className="flex justify-end space-x-3">
            {editingId && (
              <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-400 rounded text-white">
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 rounded text-white">
              {loading ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" /> Processing...
                </span>
              ) : editingId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
        </div>

        {loading && !services.length ? (
          <div className="text-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-200">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service) => (
                  <tr key={service._id} className="border-b">
                    <td className="p-4">
                      <img src={service.image} alt={service.title} className="h-12 w-12 object-cover rounded" />
                    </td>
                    <td className="p-4">{service.title}</td>
                    <td className="p-4">{service.description}</td>
                    <td className="p-4 space-x-3">
                      <button onClick={() => handleEdit(service)} className="text-blue-600 hover:underline">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:underline">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded bg-gray-200"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 border rounded bg-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManagement;
