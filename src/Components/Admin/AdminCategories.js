import React from 'react';

export const AdminCategories = () => {
  return (
    <div className="relative top-32 min-h-screen bg-white mb-24 md:mb-0">
      <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-items-center py-10">
        
        {/* Categories */}
        <div className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg bg-white p-6 text-center shadow-lg">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-l from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <i className="bi bi-grid-3x3-gap text-6xl sm:text-7xl md:text-8xl text-white"></i>
          </div>
          <a href="/Categories" className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 transition duration-300 hover:text-yellow-500">
            Categories
          </a>
        </div>

        {/* Tickets */}
        <div className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg bg-white p-6 text-center shadow-lg">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
            <i className="bi bi-ticket-perforated text-6xl sm:text-7xl md:text-8xl text-white"></i>
          </div>
          <a href="/admintickets" className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 transition duration-300 hover:text-green-500">
            Tickets
          </a>
        </div>

        {/* Jobs */}
        <div className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg bg-white p-6 text-center shadow-lg">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
            <i className="bi bi-briefcase-fill text-6xl sm:text-7xl md:text-8xl text-white"></i>
          </div>
          <a href="/adminjobs" className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 transition duration-300 hover:text-red-500">
            Jobs
          </a>
        </div>

        {/* Users */}
        <div className="flex flex-col items-center transform transition-transform hover:scale-105 hover:shadow-xl rounded-lg bg-white p-6 text-center shadow-lg">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full flex items-center justify-center">
            <i className="bi bi-person-circle text-6xl sm:text-7xl md:text-8xl text-white"></i>
          </div>
          <a href="/registerall" className="mt-4 text-lg sm:text-xl font-semibold text-gray-700 transition duration-300 hover:text-purple-500">
            Users
          </a>
        </div>
        
      </div>
    </div>
  );
};


