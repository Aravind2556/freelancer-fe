// import React, { useState } from "react";

// export const Forget = () => {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const [step, setStep] = useState(1); // Tracks the current step
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");

//   console.log("Reset password flow:", { step, email, otp, password });

//   // Step 1: Send OTP
//   const sendOtp = () => {
//     if (email !== "") {
//       fetch(`${apiurl}/reset`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ email }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             alert(data.message);
//             setStep(2); // Move to Step 2
//           } else {
//             alert(data.message);
//           }
//         })
//         .catch((err) => {
//           console.error("Error sending OTP:", err);
//         });
//     } else {
//       alert("Please enter your email.");
//     }
//   };

//   // Step 2: Confirm OTP and reset password
//   const resetPassword = () => {
//     if (otp !== "" && email !== "" && password !== "") {
//       fetch(`${apiurl}/forgetpassword`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ otp, email, password }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success) {
//             alert(data.message);
//             window.location.href = "/login"; // Redirect after success
//           } else {
//             alert(data.message);
//           }
//         })
//         .catch((err) => {
//           console.error("Error resetting password:", err);
//         });
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   return (
//     <div className="flex justify-center ml-24 mr-24 items-center min-h-screen ">
//       <div className="bg-white p-6 rounded-lg  shadow-lg w-full ">
//         <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

//         {/* Step 1: Enter Email */}
//         {step === 1 && (
//           <form className="space-y-4">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={sendOtp}
//               className="w-full bg-black text-white font-bold text-lg py-3 rounded hover:bg-gray-800"
//             >
//               Send OTP
//             </button>
//           </form>
//         )}

//         {/* Step 2: Enter OTP, Email Confirmation, and Password */}
//         {step === 2 && (
//           <form className="space-y-4">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Confirm your email"
//               className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={resetPassword}
//               className="w-full bg-black text-white font-bold text-lg py-3 rounded hover:bg-gray-800"
//             >
//               Update
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useState } from "react";
import Forgot from '../../Assets/undraw_forgot-password_odai.svg'

export const Forget = () => {
  const apiurl = process.env.REACT_APP_API_URL;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  console.log("Reset password flow:", { step, email, otp, password });

  const sendOtp = () => {
    if (email !== "") {
      fetch(`${apiurl}/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          if (data.success) setStep(2);
        })
        .catch((err) => console.error("Error sending OTP:", err));
    } else {
      alert("Please enter your email.");
    }
  };

  const resetPassword = () => {
    if (otp !== "" && email !== "" && password !== "") {
      fetch(`${apiurl}/forgetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          if (data.success) window.location.href = "/";
        })
        .catch((err) => console.error("Error resetting password:", err));
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden md:flex items-center justify-center p-6 bg-gray-200">
          <img
            src={Forgot}
            alt="Security"
            className="w-full max-w-xs rounded-lg"
          />
        </div>

        {/* Right Section - Form */}
        <div className="p-6 w-full">
          <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <form className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={sendOtp}
                className="w-full bg-black text-white font-bold text-lg py-3 rounded-lg hover:bg-gray-800 transition-all"
              >
                Send OTP
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP and Reset Password */}
          {step === 2 && (
            <form className="space-y-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Confirm your email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={resetPassword}
                className="w-full bg-black text-white font-bold text-lg py-3 rounded-lg hover:bg-gray-800 transition-all"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
