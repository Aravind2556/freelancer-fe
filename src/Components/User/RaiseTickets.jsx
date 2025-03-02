import React, { useState } from "react";

export const RaiseTickets = () => {
  const apiurl = process.env.REACT_APP_API_URL; // Make sure your API URL is set in the environment variables

  const [formData, setFormData] = useState({

    issue: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if(window.confirm('Are you sure you want Raise a complaint')){
      e.preventDefault();
    
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/tickets-input`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ formData }),
        });
  
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          setFormData({ issue: "" });
          window.location.reload()
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error submitting the ticket:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Raise a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">


          {/* Issue Field */}
          <div>
            <label
              htmlFor="issue"
              className="block text-sm font-medium text-gray-700"
            >
              Describe Your Issue
            </label>
            <textarea
              name="issue"
              id="issue"
              value={formData.issue}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter details about the issue"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full  text-white py-2 px-4 rounded-md shadow  transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


