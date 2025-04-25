import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(`https://eyehospital-kkd8.onrender.com/api/services/${editingId}`, formData);
      } else {
        await axios.post("https://eyehospital-kkd8.onrender.com/api/services", formData);
      }
      fetchServices();
      setTitle("");
      setDescription("");
      setImage(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving service", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    try {
      await axios.delete(`https://eyehospital-kkd8.onrender.com/api/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting service", error);
    }
    setLoading(false);
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setEditingId(service._id);
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
          />
        </div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex justify-center items-center"
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search Services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

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
                  {service.image && (
                    <img
                      src={service.image.startsWith("http") ? service.image : `https://eyehospital-kkd8.onrender.com/uploads/${service.image}`}
                      alt="Service"
                      className="h-16 w-16 rounded-md cursor-pointer"
                      onClick={() =>
                        window.open(service.image.startsWith("http") ? service.image : `https://eyehospital-kkd8.onrender.com/uploads/${service.image}`, "_blank")
                      }
                    />
                  )}
                </td>
                <td className="border p-2 flex space-x-2">
                  <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white p-1 rounded flex items-center">
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(service._id)} className="bg-red-600 text-white p-1 rounded flex items-center">
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
            className={`px-3 py-1 rounded ${currentPage === number + 1 ? "bg-green-600 text-white" : "bg-gray-300"}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement;
