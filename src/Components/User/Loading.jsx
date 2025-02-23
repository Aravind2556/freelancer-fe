import React from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 space-x-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      <div className="w-12 h-12 border-4 border-green-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      <div className="w-12 h-12 border-4 border-red-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      <div className="w-12 h-12 border-4 border-yellow-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};



