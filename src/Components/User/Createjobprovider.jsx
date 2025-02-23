import React, { useEffect, useState } from "react";


export const Createjobprovider = () => {
  const apiurl = process.env.REACT_APP_API_URL;

  const [categories, setCategories] = useState([]);
  const [failed, setFailed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  // Individual form field states
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");





  useEffect(() => {
    fetch(`${apiurl}/getcata`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.catagories);
        } else {
          setFailed(data.message);
        }
      })
      .catch((err) => console.error('Data fetching error:', err));
  }, [apiurl]);




  // Handle card click
  const handleCardClick = (jobname) => {
    setSelectedJob(jobname);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Save data (placeholder function for API call)
  function handlecreate() {
    if (Title !== '' && Description !== '' && Price !== '' && selectedJob !== '') {
      console.log("create jobs", Title, Description, Price, selectedJob)
      fetch(`${apiurl}/Create_jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ Title, Description, Price, selectedJob })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success === true) {
            alert(data.message)
            window.location.reload()
          }
          else {
            alert(data.message)
          }
        })
        .catch(err => {
          alert("error", err)
        })

    }
    else {
      alert("data null last else")
    }
  }


  return (
    <div>
      <div className="p-6 bg-gray-100 min-h-screen ">
        <div className="flex justify-center relative top-28">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Job Provider</h1>
        </div>

        <div className="flex flex-wrap gap-5 justify-center relative top-36">
          {categories.length > 0 ? (
            categories.map((data, index) => (
              <div key={index} >
                <button className="text-white p-4 rounded-lg shadow-md sm:w-52 text-center transform transition duration-300 hover:scale-105 " onClick={() => handleCardClick(data.Jobname)}>{data.Jobname}</button>
              </div>
            ))
          ) : (
            <div className="text-center text-orange-600 text-lg">
              <p>{failed || "No data available"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Popup Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Job: {selectedJob}</h2>
            <form>
              <div className="mb-4">
                <label className="block font-medium">Title</label>
                <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} className="border w-full p-2 rounded"></input>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea value={Description} onChange={(e) => setDescription(e.target.value)} className="border w-full p-2 rounded"></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Price</label>
                <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)} className="border w-full p-2 rounded"></input>
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                <button type='button' onClick={handlecreate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
              </div>



            </form>

          </div>
        </div>
      )}
    </div>
  );
};
