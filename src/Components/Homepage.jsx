import React, { useState } from "react";
import {Login} from '../Components/Register/Login'
import Freelancer from '../Assets/DALL·E 2025-02-01 15.21.01 - A modern freelancer working on a laptop in a cozy workspace. The environment is bright and professional, with a coffee cup on the desk, a notebook, an.webp'
import Jobprovider from '../Assets/DALL·E 2025-02-01 15.21.06 - A professional job provider sitting in an office, reviewing job applications on a computer. The environment is bright and corporate, with a modern des.webp'

const HomePage = () => {

  const [userType, setUserType] = useState(null);
  console.log("freelancer and company clicking",userType)

  if (userType === "freelancer") return <Login user="Freelancer" />;
  if (userType === "company") return <Login user="Company" />;

  return (
    
    <div className="flex flex-col max-h-full  justify-center items-center text-black p-6 ">
    <div className="mt-24">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-8 animate__animated animate__fadeIn">
        Welcome to Freelancer Platform
      </h1>
      <p className="text-xl text-center mb-12 max-w-3xl animate__animated animate__fadeIn">
        Whether you're a freelancer looking for work or a business looking to hire, we've got you covered. Discover endless opportunities today!
      </p>

      {/* Features Section */}
      <div className="flex flex-col items-center justify-center mb-12 max-w-5xl">
        <h3 className="text-3xl font-semibold text-center mb-6">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-lg bg-white text-gray-900">
            <h4 className="text-2xl font-semibold mb-3">Easy to Use</h4>
            <p>Our platform is user-friendly, making it simple for both freelancers and employers to navigate and connect.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg bg-white text-gray-900">
            <h4 className="text-2xl font-semibold mb-3">Secure Payments</h4>
            <p>We ensure that payments are securely processed, giving both freelancers and employers peace of mind.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg bg-white text-gray-900">
            <h4 className="text-2xl font-semibold mb-3">Global Network</h4>
            <p>Join a vast network of professionals from around the world, offering a diverse range of skills and expertise.</p>
          </div>
        </div>
      </div>

      {/* Sections for Freelancer & Job Provider */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full max-w-4xl " id="login" style={{paddingTop:"100px"}}>
        {/* Freelancer Section */}
        <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg w-full md:w-1/2 bg-white text-gray-900">
          <img
            src={Freelancer}
            alt="Freelancer working"
            className="w-full max-w-xs mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-semibold">Freelancer</h2>
          <p className="text-center text-gray-600 mt-2">
            Find projects, work on exciting tasks, and grow your career as a freelancer.
          </p>
          <button
           onClick={() => setUserType("freelancer")}
            className="mt-4  text-white px-6 py-3 rounded-full text-lg font-semibold "
          >
            Freelancer Login
          </button>
         
        </div>

        {/* Job Provider Section */}
        <div className="flex flex-col items-center p-6 border rounded-lg shadow-lg w-full md:w-1/2 bg-white text-gray-900" >
          <img
            src={Jobprovider}
            alt="Job Provider reviewing applications"
            className="w-full max-w-xs mb-4 rounded-lg"
          />
          <h2 className="text-2xl font-semibold">Company</h2>
          <p className="text-center text-gray-600 mt-2">
            Post jobs, hire talented freelancers, and get work done efficiently.
          </p>
          <button
            onClick={() => setUserType("company")}
            className="mt-4  text-white px-6 py-3 rounded-full text-lg font-semibold "
          >
            Compnay Login
          </button>

        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;


