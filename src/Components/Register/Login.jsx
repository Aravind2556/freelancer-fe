// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// export const Login = ({ user }) => {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const navigate = useNavigate();

//   const [loginname, setlogin] = useState('');
//   const [loginpassword, setloginpassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [userrole,setrole]=useState('')
//   const [error, setError] = useState({ email: false, password: false });
//   console.log("user role",userrole)

// useEffect(()=>{
//     setrole(user)
// },[user])


//   const handlelogin = () => {
//     const hasError = {
//       email: loginname === '',
//       password: loginpassword === '',
//     };

//     setError(hasError);

//     if (!hasError.email && !hasError.password) {
//       fetch(`${apiurl}/Login-User`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email: loginname, password: loginpassword , userrole}),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             console.log('User logged in successfully', data);
//             handlerrole(data.Role);
//           } else {
//             console.log(data.message)
//           }
//         })
//         .catch((err) => console.log('Login error', err));
//     } else {
//       console.log('Please enter valid login details');
//     }
//   };

//   const handlerrole = (Role) => {
//     if (Role === 'Freelancer') {
//       navigate('/jobdata');
//       window.location.reload();
//     } else if (Role === 'Admin') {
//       navigate('/admin');
//       window.location.reload();
//     } else if (Role === 'Company') {
//       navigate('/User');
//       window.location.reload();
//     }
//     else {
//       navigate('*');
//     }
//   };

//   const handleRegister = () => {
//     navigate('/Account Register', { state: { role: user } });
//   };

//   console.log("user in login:",user)

//   return (
//     <>

//       <div>
//         <div className=" relative min-h-screen mr-24 ml-24  flex justify-center items-center z-50">
//           <div className="bg-white backdrop-blur-md border w-full   rounded-lg  p-8 shadow-[0_25px_50px_rgba(0,0,0,0.2)]">
//             <h2 className="text-xl font-bold mb-6 bg-gray-800 text-white rounded-xl h-20 flex justify-center items-center hover:bg-gray-700">
//               {user}-Login
//             </h2>
//             <form>
//               {/* Username Field */}
//               <div className="mb-4">
//                 <label className="block mb-2 font-medium">Email</label>
//                 <input
//                   type="text"
//                   value={loginname}
//                   onChange={(e) => setlogin(e.target.value)}
//                   className={`w-full p-2 border rounded focus:outline-none focus:ring ${error.email ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                     }`}
//                 />
//                 {error.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
//               </div>

//               {/* Password Field */}
//               <div className="mb-4 relative">
//                 <label className="block mb-2 font-medium">Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={loginpassword}
//                   onChange={(e) => setloginpassword(e.target.value)}
//                   className={`w-full p-2 border rounded focus:outline-none focus:ring ${error.password ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-blue-300'
//                     }`}
//                 />
//                 {error.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.836 2.997-3.625 5-7.542 5-3.917 0-6.706-2.003-7.542-5z"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7C3.732 7.943 7.522 5 12 5c1.151 0 2.257.167 3.292.481m2.881 1.7C18.791 8.187 19.635 9.494 20.542 12c-.836 2.997-3.625 5-7.542 5-1.378 0-2.647-.232-3.782-.654m5.616-7.159a3 3 0 00-4.242 4.242"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M3 3l18 18"
//                       />
//                     </svg>
//                   )}
//                 </span>
//               </div>

//               {/* Login Button */}
//               <div className="flex justify-center mb-4">
//                 <button
//                   type="button"
//                   onClick={handlelogin}
//                   className=" text-white bg-no-repeat bg-cover p-2 w-28 rounded-sm"
//                 >
//                   Login
//                 </button>
//               </div>

//               {/* Links */}
//               <div className=" justify-around  flex items-center">
//                 <p onClick={() => window.location.href = '/forget'} className="text-sm text-blue-500 hover:underline cursor-pointer hidden">
//                   Forgot password?
//                 </p>
//                 <p
//                   onClick={() => handleRegister(user)}
//                   className="text-sm text-blue-500 hover:underline cursor-pointer"
//                 >
//                   Create an account
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// onClick={() => navigate('/Account Register')



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
  const [error, setError] = useState({ email: false, password: false });

  useEffect(() => {
    setrole(user);
  }, [user]);

  const handlelogin = () => {
    const hasError = {
      email: loginname === '',
      password: loginpassword === '',
    };
    setError(hasError);

    if (!hasError.email && !hasError.password) {
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
          if (data.success) {
            handlerrole(data.Role);
          } else {
            console.log(data.message);
          }
        })
        .catch((err) => console.log('Login error', err));
    }
  };

  const handlerrole = (Role) => {
    if (Role === 'Freelancer') {
      navigate('/jobdata');
    } else if (Role === 'Admin') {
      navigate('/admin');
    } else if (Role === 'Company') {
      navigate('/User');
    } else {
      navigate('*');
    }
    window.location.reload();
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
            className={`w-full p-2 border rounded focus:outline-none ${error.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>
        <div className="relative">
          <label className="block font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={loginpassword}
            onChange={(e) => setloginpassword(e.target.value)}
            className={`w-full p-2 border rounded focus:outline-none ${error.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showPassword ? '👁️' : '🙈'}
          </span>
          {error.password && <p className="text-red-500 text-sm">Password is required</p>}
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

