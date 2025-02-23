import React from "react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-blue-900 to-blue-950 text-gray-300 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Company Logo & About */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">MyWebsite</h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Empowering freelancers and businesses to connect, collaborate, and grow with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:info@mywebsite.com" className="text-yellow-400 hover:underline">info@mywebsite.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="text-yellow-400 hover:underline">+1 (234) 567-890</a></p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><i className="bi bi-twitter"></i></a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-xl"><i className="bi bi-instagram"></i></a>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
