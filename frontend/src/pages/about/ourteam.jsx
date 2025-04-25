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
    <div className="bg-gray-100 py-10 px-4 md:px-10 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">
        🧑‍⚕️ Meet Our Team
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <div
            key={member._id}
            className=" rounded-xl  hover:shadow-lg transition duration-300 p-4 flex flex-col items-center text-center"
          >
            {member.image && (
              <img
                src={`http://localhost:5000/uploads/${member.image}`}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 mb-3"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.post}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
