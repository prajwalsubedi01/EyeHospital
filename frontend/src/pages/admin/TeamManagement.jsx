import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaPhone, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5);
  const [formData, setFormData] = useState({ 
    name: "", 
    post: "", 
    phone: "",
    facebook: "",
    whatsapp: "",
    instagram: "",
    image: null 
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("https://eyehospital-kkd8.onrender.com/api/team");
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
    formDataObj.append("phone", formData.phone);
    formDataObj.append("facebook", formData.facebook);
    formDataObj.append("whatsapp", formData.whatsapp);
    formDataObj.append("instagram", formData.instagram);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(`https://eyehospital-kkd8.onrender.com/api/team/${editingId}`, formDataObj);
      } else {
        await axios.post("https://eyehospital-kkd8.onrender.com/api/team", formDataObj);
      }
      setFormData({ 
        name: "", 
        post: "", 
        phone: "",
        facebook: "",
        whatsapp: "",
        instagram: "",
        image: null 
      });
      setEditingId(null);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://eyehospital-kkd8.onrender.com/api/team/${id}`);
      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleEdit = (member) => {
    setFormData({ 
      name: member.name, 
      post: member.post,
      phone: member.phone || "",
      facebook: member.facebook || "",
      whatsapp: member.whatsapp || "",
      instagram: member.instagram || "",
      image: null 
    });
    setEditingId(member._id);
  };

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = team.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Team Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={formData.name} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Post</label>
            <input 
              type="text" 
              name="post" 
              placeholder="Position/Role" 
              value={formData.post} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Phone</label>
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone Number" 
              value={formData.phone} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Facebook</label>
            <input 
              type="text" 
              name="facebook" 
              placeholder="Facebook Profile URL" 
              value={formData.facebook} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">WhatsApp</label>
            <input 
              type="text" 
              name="whatsapp" 
              placeholder="WhatsApp Number" 
              value={formData.whatsapp} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Instagram</label>
            <input 
              type="text" 
              name="instagram" 
              placeholder="Instagram Profile URL" 
              value={formData.instagram} 
              onChange={handleChange} 
              className="border p-2 w-full rounded" 
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <input 
              type="file" 
              name="image" 
              onChange={handleFileChange} 
              className="border p-2 w-full rounded" 
              accept="image/*"
              required={!editingId}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 mt-4 rounded-md transition-colors"
        >
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Post</th>
              <th className="p-4 text-left">Social Links</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member) => (
              <tr key={member._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {member.image && (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-16 h-16 object-cover rounded-full border-2 border-gray-200" 
                    />
                  )}
                </td>
                <td className="p-4 font-medium">{member.name}</td>
                <td className="p-4">{member.post}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="text-blue-600 hover:text-blue-800">
                        <FaPhone title={member.phone} />
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <FaFacebook />
                      </a>
                    )}
                    {member.whatsapp && (
                      <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                        <FaWhatsapp />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(member)} 
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(member._id)} 
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {team.length > membersPerPage && (
        <div className="flex justify-center mt-6">
          {[...Array(Math.ceil(team.length / membersPerPage)).keys()].map((number) => (
            <button 
              key={number + 1} 
              onClick={() => setCurrentPage(number + 1)} 
              className={`px-4 py-2 mx-1 rounded-md ${currentPage === number + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamManagement;