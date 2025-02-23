import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Notfound = () => {
  const navigate = useNavigate();

  const handleNotfound = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-100">
      {/* Animated 404 Icon */}
      <div className="animate-pulse">
        
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-gray-800 md:text-8xl drop-shadow-md">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">Page Not Found</h2>

      {/* Description */}
      <p className="text-gray-600 text-lg md:text-xl mt-2 max-w-lg mx-auto">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={handleNotfound}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};
