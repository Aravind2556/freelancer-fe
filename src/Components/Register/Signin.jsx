// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Siginimage from '../../Assets/undraw_agreement_w6ua.svg'

// export const Signin = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userRole = location.state?.role 
//   console.log(userRole);
//   const apiurl = process.env.REACT_APP_API_URL;

//   // OTP email state (for sending OTP)
//   const [Email, setEmail] = useState("");
//   // Confirm email state (after OTP)
//   const [email, setConfirmEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [role, setUserType] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showCPassword, setShowCPassword] = useState(false);
 
//   const [setp, setstep] = useState(1); // Step 1 for OTP, step 2 for registration details

//   // Freelancer-specific state
//   const [qualification, setQualification] = useState("");
//   const [skills, setSkills] = useState("");
//   const [experience, setExperience] = useState("");
//   const [linkedin, setLinkedin] = useState("");

//   // Company-specific state
//   const [company, setCompany] = useState("");

//   useEffect(() => {
//     setUserType(userRole); // Update role state from URL or default
//   }, [userRole]);

//   const handlerotp = () => {
//     if (Email !== "") {
//       setLoading(true);
//       fetch(`${apiurl}/Create-OTP`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ Email }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             alert(data.message);
//             setstep(2);
//           } else {
//             alert(data.message)
//           }
//           setLoading(false);
//         })
//         .catch((err) => {
//          console.log("error",err)
//           setLoading(false);
//         });
//     } else {
//       alert("checkin")
//     }
//   };

//   console.log(
//     "user values",
//     email,
//     otp,
//     name,
//     phone,
//     password,
//     cpassword,
//     role,
//     qualification,
//     skills,
//     experience,
//     linkedin,
//     company
//   );

//   const handleconfirmandregister = () => {
//     console.log("true")
//     if (
//       !otp ||
//       !email ||
//       !name ||
//       !phone ||
//       !password ||
//       !cpassword ||
//       !role ||
//       !qualification ||
//       !skills ||
//       !experience ||
//       !linkedin ||
//       !company
//     ) 



//     setLoading(true);
//     console.log(`${apiurl}/Create-Account`)
//     fetch(`${apiurl}/Create-Account`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         email,
//         otp,
//         name,
//         phone,
//         password,
//         cpassword,
//         role,
//         qualification,
//         skills,
//         experience,
//         linkedin,
//         company,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success === true) {
//           handleRole(data.Role)
//         } else {
//           alert(data.message);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("network eror",err)
      
//         setLoading(false);
//       });
//   };

//   const handleRole = (Role) => {
//     if(Role === "Freelancer"){
//       window.location.href = "/jobdata";

//     }
//     else if(Role === "Company"){
//       window.location.href = "/User";
//     }
//   }

//   return (
//     <div>
//       <div className="relative min-h-screen p-24 flex justify-center items-center z-50">
//             {/* Image for PC and Laptop */}
//             <div className="hidden md:flex w-1/2 h-auto">
//         <img 
//           src={ Siginimage} 
//           alt="Login Illustration" 
//           className="w-full h-96" 
//         />
//       </div>
//         <div className="bg-white p-8 w-full rounded-lg shadow-[0_25px_50px_rgba(0,0,0,0.2)]">
//           <h2 className="text-xl font-bold mb-6 bg-gray-800 text-white rounded-xl h-20 flex justify-center items-center hover:bg-gray-700">
//             {userRole} Signup
//           </h2>
//           {setp === 1 && (
//             <form>

//               {/* Email and OTP */}
//               <div className="mb-4">
//                 <label className="block mb-2 font-medium">Email</label>
//                 <div className="flex flex-col gap-4">
//                   <input
//                     type="email"
//                     value={Email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                   <button
//                     type="button"
//                     onClick={handlerotp}
//                     disabled={loading}
//                     className={`text-white px-4 py-1 rounded-full text-xl shadow-2xl hover:scale-105 transform transition-all duration-300 ${
//                       loading
//                         ? "bg-gray-500"
//                         : "bg-blue-500 hover:bg-blue-600"
//                     }`}
//                   >
//                     {loading ? "Sending..." : "Send OTP"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           )}

//           <div className="items-center w-auto">
//             {setp === 2 && (
//               <form>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Verify OTP
//                   </label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">
//                     Confirm Email
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setConfirmEmail(e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Name</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="mb-4">
//                   <label className="block mb-2 font-medium">Phone</label>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                   />
//                 </div>

//                 {userRole === "Freelancer" ? (
//                   <>
//                     {/* Higher Qualification */}
//                     <div className="mb-4">
//                       <label className="block mb-2 font-medium">
//                         Higher Qualification
//                       </label>
//                       <input
//                         type="text"
//                         value={qualification}
//                         onChange={(e) =>
//                           setQualification(e.target.value)
//                         }
//                         className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                       />
//                     </div>

//                     {/* Experience */}
//                     <div className="mb-4">
//                       <label className="block mb-2 font-medium">
//                         Experience (in years)
//                       </label>
//                       <input
//                         type="number"
//                         value={experience}
//                         onChange={(e) =>
//                           setExperience(e.target.value)
//                         }
//                         className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                       />
//                     </div>

//                     {/* LinkedIn Profile */}
//                     <div className="mb-4">
//                       <label className="block mb-2 font-medium">
//                         LinkedIn Profile
//                       </label>
//                       <input
//                         type="url"
//                         value={linkedin}
//                         onChange={(e) =>
//                           setLinkedin(e.target.value)
//                         }
//                         className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                       />
//                     </div>

//                     {/* Skills */}
//                     <div className="mb-4">
//                       <label className="block mb-2 font-medium">
//                         Skill
//                       </label>
//                       <input
//                         type="text"
//                         value={skills}
//                         onChange={(e) =>
//                           setSkills(e.target.value)
//                         }
//                         className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     {/* Company */}
//                     <div className="mb-4">
//                       <label className="block mb-2 font-medium">
//                         Company
//                       </label>
//                       <input
//                         type="text"
//                         value={company}
//                         onChange={(e) =>
//                           setCompany(e.target.value)
//                         }
//                         className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                       />
//                     </div>
//                   </>
//                 )}

//                 {/* Password and Confirm Password */}
//                 <div className="flex flex-col gap-4 mb-4">
//                   <div className="relative">
//                     <label className="block mb-2 font-medium">
//                       Password
//                     </label>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) =>
//                         setPassword(e.target.value)
//                       }
//                       className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     />
//                     <span
//                       onClick={() =>
//                         setShowPassword(!showPassword)
//                       }
//                       className="absolute right-3 top-3 cursor-pointer"
//                     >
//                       {showPassword ? (
//                         <i className="bi bi-eye-slash"></i>
//                       ) : (
//                         <i className="bi bi-eye"></i>
//                       )}
//                     </span>
//                   </div>
//                   <div className="relative">
//                     <label className="block mb-2 font-medium">
//                       Confirm Password
//                     </label>
//                     <input
//                       type={showCPassword ? "text" : "password"}
//                       value={cpassword}
//                       onChange={(e) =>
//                         setConfirmPassword(e.target.value)
//                       }
//                       className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     />
//                     <span
//                       onClick={() =>
//                         setShowCPassword(!showCPassword)
//                       }
//                       className="absolute right-3 top-3 cursor-pointer"
//                     >
//                       {showCPassword ? (
//                         <i className="bi bi-eye-slash"></i>
//                       ) : (
//                         <i className="bi bi-eye"></i>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 {/* Submit Button */}
//                 <div className="text-center">
//                   <button
//                     type="button"
//                     onClick={handleconfirmandregister}
//                     disabled={loading}
//                     className="text-white w-full p-2 rounded-full text-xl shadow-2xl hover:scale-105 transform transition-all duration-300 hover:bg-gradient-to-l hover:from-blue-500"
//                   >
//                     {loading ? "Registering..." : "Register"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Siginimage from "../../Assets/undraw_agreement_w6ua.svg";

export const Signin = () => {

  const location = useLocation();
  const userRole = location.state?.role || "User";
  const apiurl = process.env.REACT_APP_API_URL;

  const [Email, setEmail] = useState("");
  const [email, setConfirmEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setUserType] = useState(userRole);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showCPassword, setShowCPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [qualification, setQualification] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    setUserType(userRole);
  }, [userRole]);

  const handlerotp = () => {
    if (Email) {
      setLoading(true);
      fetch(`${apiurl}/Create-OTP`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Email }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          if (data.success) setStep(2);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      alert("Please enter an email");
    }
  };

  const handleconfirmandregister = () => {
    setLoading(true);
    fetch(`${apiurl}/Create-Account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        otp,
        name,
        phone,
        password,
        cpassword,
        role,
        qualification,
        skills,
        experience,
        linkedin,
        company,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) handleRole(data.Role);
        else alert(data.message);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleRole = (Role) => {
    window.location.href = Role === "Freelancer" ? "/jobdata" : "/User";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center p-6 md:p-24">
      {/* Image Section (Hidden on Mobile) */}
      <div className="hidden md:block w-1/2">
        <img src={Siginimage} alt="Login Illustration" className="w-full max-h-96" />
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 w-full max-w-lg rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center bg-gray-800 text-white rounded-lg py-4 mb-6">
          {userRole} Signup
        </h2>
        {step === 1 && (
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handlerotp}
              disabled={loading}
              className={`mt-4 w-full p-2 rounded text-white text-xl shadow-md ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <form>
            <input placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <input placeholder="Email" value={email} onChange={(e) => setConfirmEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded mb-4" />
            {userRole === "Freelancer" ? (
              <>
                <input placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <input placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <input placeholder="LinkedIn Profile" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <input placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2 border rounded mb-4" />
              </>
            ) : (
              <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-2 border rounded mb-4" />
            )}
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <input placeholder="Confirm Password" type="password" value={cpassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
            <button onClick={handleconfirmandregister} disabled={loading} className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600 text-xl shadow-md">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
