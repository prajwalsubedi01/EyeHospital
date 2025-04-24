import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamPage = () => {
  const [team, setTeam] = useState([]);

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

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-7">🧑‍⚕️Meet Our Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member) => (
          <div key={member._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="w-full flex justify-center mb-4">
              {member.image && (
                <img
                  src={`http://localhost:5000/uploads/${member.image}`}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-500"
                />
              )}
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800">{member.name}</h3>
            <p className="text-center text-gray-600 mt-2">{member.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
