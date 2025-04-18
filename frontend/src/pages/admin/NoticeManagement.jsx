import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/notice");
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
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
        await axios.put(`http://localhost:5000/api/notice/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/notice", formData);
      }
      fetchNotices();
      setTitle("");
      setDescription("");
      setImage(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving notice", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/notice/${id}`);
      setNotices(notices.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error("Error deleting notice", error);
    }
    setLoading(false);
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setDescription(notice.description);
    setEditingId(notice._id);
  };

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.filter((n) => n.title.toLowerCase().includes(search.toLowerCase())).slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Notices</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <input type="text" placeholder="Notice Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded mb-2" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mb-2" />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded mb-4" />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex justify-center items-center">
          {loading ? <FaSpinner className="animate-spin mr-2" /> : editingId ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      <input type="text" placeholder="Search Notices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border rounded mb-4" />

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
          {currentNotices.map((notice) => (
            <tr key={notice._id} className="border">
              <td className="border p-2">{notice.title}</td>
              <td className="border p-2">{notice.description}</td>
              <td className="border p-2">
                {notice.image && (
                  <img
  src={notice.image.startsWith("http") ? notice.image : `http://localhost:5000/uploads/${notice.image}`}
  alt="Notice"
  className="h-16 w-16 rounded-md cursor-pointer"
  onClick={() =>
    window.open(
      notice.image.startsWith("http") ? notice.image : `http://localhost:5000/uploads/${notice.image}`,
      "_blank"
    )
  }
/>
// <img src={`http://localhost:5000/uploads/${notice.image}`} alt="Notice" className="h-16 w-16 rounded-md cursor-pointer" onClick={() => window.open(`http://localhost:5000/uploads/${notice.image}`, "_blank")} />
                )}
              </td>
              <td className="border p-2 flex space-x-2">
                <button onClick={() => handleEdit(notice)} className="bg-yellow-500 text-white p-1 rounded flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button onClick={() => handleDelete(notice._id)} className="bg-red-600 text-white p-1 rounded flex items-center">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(Math.ceil(notices.length / noticesPerPage)).keys()].map((number) => (
          <button key={number} onClick={() => setCurrentPage(number + 1)} className={`px-3 py-1 rounded ${currentPage === number + 1 ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeManagement;