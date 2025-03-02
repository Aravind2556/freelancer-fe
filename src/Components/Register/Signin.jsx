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
    window.location.href = Role === "Freelancer" ? "/" : Role === "Admin" ? '/' : '/';
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
