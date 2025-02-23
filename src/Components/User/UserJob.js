import React from "react";
import { useNavigate } from "react-router-dom";

export const UserJob = () => {
  const navigate = useNavigate();

  const jobs = {
    jobs: "Jobs",
    tickets: "Tickets",
    createjob: "Create Job Provider job",
    raiseticket: "Raise Ticket",
  };

  const handleCardClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <div className="relative top-10 grid gap-10 w-full max-w-4xl">
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
          {/* Jobs */}
          <div
            className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-2xl rounded-xl bg-white p-6 text-center shadow-lg cursor-pointer"
            onClick={() => handleCardClick(jobs.jobs)}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="bi bi-briefcase-fill text-5xl sm:text-6xl text-white"></i>
            </div>
            <p className="mt-4 w-28 py-2 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-lg shadow-md">
              Jobs
            </p>
          </div>

          {/* Tickets */}
          <div
            className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-2xl rounded-xl bg-white p-6 text-center shadow-lg cursor-pointer"
            onClick={() => handleCardClick(jobs.tickets)}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="bi bi-ticket-perforated text-5xl sm:text-6xl text-white"></i>
            </div>
            <p className="mt-4 w-32 py-2 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-md">
              Complaint
            </p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 sm:gap-6 relative bottom-9">
          {/* Create Job Button */}
          <button
            className=" p-2 sm:w-44 h-14 sm:h-16 flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-lg transition-transform hover:scale-105"
            onClick={() => handleCardClick(jobs.createjob)}
          >
            Create Job
          </button>

          {/* Raise Complaint Button */}
          <button
            className="p-2 sm:w-44 h-14 sm:h-16 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-lg sm:text-xl font-semibold rounded-lg shadow-lg transition-transform hover:scale-105"
            onClick={() => handleCardClick(jobs.raiseticket)}
          >
            Raise Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

