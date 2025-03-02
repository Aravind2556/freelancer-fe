
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import freelancerImage from '../../Assets/undraw_access-account_aydp.svg'


export const Login = ({ user }) => {
  const apiurl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [loginname, setlogin] = useState('');
  const [loginpassword, setloginpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userrole, setrole] = useState('');


  useEffect(() => {
    setrole(user);
  }, [user]);

  const handlelogin = () => {


   
      fetch(`${apiurl}/Login-User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: loginname, password: loginpassword, userrole }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message)
          if (data.success) {
            handlerrole(data.Role);
          } 
       
        })
        .catch((err) => console.log('Login error', err));
   
  };

  const handlerrole = (Role) => {
    if (Role === 'Freelancer') {
      window.location.href='/'
    } else if (Role === 'Admin') {
      window.location.href='/'
    } else if (Role === 'Company') {
      window.location.href='/'
    }
  
  };

  const handleRegister = (user) => {
    navigate('/Account Register', { state: { role: user } });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      {/* Image for PC and Laptop */}
      <div className="hidden md:flex w-1/2 h-auto">
        <img 
          src={ freelancerImage} 
          alt="Login Illustration" 
          className="w-full h-96" 
        />
      </div>

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3 grid gap-6">
        <h2 className="text-xl font-bold text-center bg-gray-800 text-white p-4 rounded-lg">
          {user} - Login
        </h2>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="text"
            value={loginname}
            onChange={(e) => setlogin(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none`}
          />
  
        </div>
        <div className="relative">
          <label className="block font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={loginpassword}
            onChange={(e) => setloginpassword(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none`}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
        
        </div>
        <button
          onClick={handlelogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="flex justify-between text-sm text-blue-500">
          <p className="cursor-pointer" onClick={()=> navigate('/forget')}>Forgot password?</p>
          <p className="cursor-pointer" onClick={() => handleRegister(user)}>Create an account</p>
        </div>
      </div>
    </div>
  );
};

