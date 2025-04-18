import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);
  const [formData, setFormData] = useState({ name: "", post: "", image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/team");
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("post", formData.post);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/team/${editingId}`, formDataObj);
      } else {
        await axios.post("http://localhost:5000/api/team", formDataObj);
      }
      setFormData({ name: "", post: "", image: null });
      setEditingId(null);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleEdit = (member) => {
    setFormData({ name: member.name, post: member.post, image: null });
    setEditingId(member._id);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = team.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Team Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow p-4 rounded">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 m-2 w-full" required />
        <input type="text" name="post" placeholder="Post" value={formData.post} onChange={handleChange} className="border p-2 m-2 w-full" required />
        <input type="file" name="image" onChange={handleFileChange} className="border p-2 m-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2">
          {editingId ? "Update" : "Add"} Member
        </button>
      </form>

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Post</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member) => (
            <tr key={member._id} className="border-t">
              <td className="p-3">
                {member.image && (
                  <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} className="w-12 h-12 object-cover rounded-full" />
                )}
              </td>
              <td className="p-3">{member.name}</td>
              <td className="p-3">{member.post}</td>
              <td className="p-3">
                <button onClick={() => handleEdit(member)} className="text-blue-500 p-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(member._id)} className="text-red-500 p-2">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(team.length / membersPerPage)).keys()].map((number) => (
          <button key={number + 1} onClick={() => setCurrentPage(number + 1)} className={`px-3 py-1 mx-1 ${currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
