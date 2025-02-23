import React, { useContext, useState } from 'react';
import { DContext } from '../Datacontext/DataContext';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';

export const Jobs = () => {
  const navigate = useNavigate()
  const apiurl = process.env.REACT_APP_API_URL;
  const { Jobs } = useContext(DContext);

  const [showModal, setShowModal] = useState(false)
  const [showupadte, setshowupadte] = useState(false)


  const [gettingadata, setgettingdata] = useState('')
  console.log("getting data for job proder", gettingadata)
  const [upadatedata, setupadtedata] = useState([])


  console.log("ftech upadte data all", upadatedata)








  const handleUpdatedata = (data) => {
    console.log("Upadte data", data)
    setshowupadte(true)
    if (data) {
      fetch(`${apiurl}/fetch-update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {

            setupadtedata(data.data)
          } else {
            alert(data.message);
          }
        })
        .catch((err) => console.log('Login error', err));
    } else {
      console.log('Please enter valid login details');
    }
  };

  const handleOpenUpadtemodel = () => {
    setshowupadte(false)
    if (upadatedata !== '') {
      fetch(`${apiurl}/update-job`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ upadatedata }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {

            alert(data.message)
          } else {
            alert(data.message);
          }
        })
        .catch((err) => console.log('Login error', err));

    }
    else {
      console.log("Trouble data")
    }
  }



  const handleDeletedata = async (data) => {
    // Confirm the deletion action
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiurl}/delete`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ data }),
      });
      const result = await response.json();

      if (result.success) {
        alert(result.message);
        window.location.reload();
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while deleting the job. Please try again later.");
    }
  };

  // Handle card click
  const handleshowdata = (jobname) => {
    console.log("idd", jobname)

    setShowModal(true);

    if (jobname) {
      fetch(`${apiurl}/fetch-job-deatils`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ selectedJob: jobname }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {

            setgettingdata(data.data)


          } else {
            alert(data.message);
          }
        })
        .catch((err) => console.log('Login error', err));
    } else {
      console.log('Please enter valid login details');
    }

  };




  // Close the modal
  const handleCloseModal = (e) => {
    setShowModal(false);
  };

  const handleCloseUpdatemodel = () => {
    setshowupadte(false)
  }

  console.log("update data:", upadatedata)

  const handleDataUpdation = (e) => {
    const { name, value } = e.target
    console.log("name, value:", name, value)
    console.log('property value:', upadatedata.name)
    setupadtedata(prev => {
      let tempObj = { ...prev }
      tempObj[name] = value
      return tempObj
    })
  }


  const handlefreelacer = (userid,jobid) => {

    console.log("both id for jobs",userid,jobid)

    fetch(`${apiurl}/Passing-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ userid,jobid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate('/interst', { state: { jobDetails: data.data } });
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log('Login error', err));
    
  }

  const [rating, setRating] = useState("");

  const handleComplete = (id, ratingValue,assinid) => {
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      alert("Please enter a valid rating between 1 and 5.");
      return;
    }

    console.log(`Submitting rating: ${ratingValue} jobid : ${id} assign id ${assinid}`);

    // Here, you can send the rating to the backend
    fetch(`${apiurl}/Rating-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ id, ratingValue,assinid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true){
          alert(data.message)
          window.location.reload()
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log('Login error', err)
        alert("Some Network issue is caused!")
      });
  };






  if (!Jobs) {
    return <Loading />
  }


  return (
    <div className="p-6 h-screen">
      {Jobs.length > 0 ? (
        <div className="flex justify-center w-full">
          <div className="rounded-lg mt-44 overflow-clip">
            <table className="min-w-full table-auto border-collapse rounded-lg bg-white ">
              <thead className=" text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-left ">Sl. No.</th>
                  <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell ">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell">Price</th>
                  <th className="px-6 py-3 text-sm font-semibold text-left">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Jobs.map((data, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                    <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">{data.Title}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">{data.createdAt}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">${data.Price}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      <span className={`font-semibold ${data.Status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{data.Status}</span>
                    </td>

                    <td className="flex gap-3 px-6 py-3">
                      <button onClick={() => handleshowdata(data.Id)} title="View" className="text-blue-600  hover:text-blue-800">
                        <i className="bi bi-eye bg-white text-lg"></i>
                      </button>
                      <button onClick={() => handleUpdatedata(data.Id)} title="Edit" className="text-yellow-500 hover:text-yellow-700">
                        <i className="bi bi-pencil bg-white text-lg"></i>
                      </button>
                      <button onClick={() => handleDeletedata(data.Id)} title="Delete" className="text-red-500 hover:text-red-700">
                        <i className="bi bi-trash bg-white text-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (<div> No data Available</div>)
      }
      <div className=" flex justify-center ">
        {showModal && (
          <div className="absolute inset-0 flex justify-center  items-center z-20  sm:p-12 md:p-32 lg:p-56 ">
              <div className="bg-white rounded-lg  sm:p-10 md:p-14 w-full p-20 max-w-2xl mt-64  md:mt-32">
              <h2 className="text-xl font-bold mb-4">Create Job: {gettingadata.Title}</h2>


              <div>
                <ul>
                  <li><strong>CategoryId:</strong>{gettingadata.CategoryId}</li>
                  <li><strong>CreaterId:</strong>{gettingadata.CreaterId}</li>
                  <li><strong>Id:</strong>{gettingadata.Id}</li>
               
                  <li><strong>Interests:</strong><button onClick={()=>handlefreelacer(gettingadata.CreaterId,gettingadata.Id)} className="rounded-sm text-white animate-bounce">Show Interests </button></li>
                  <li><strong>Price</strong>{gettingadata.Price}</li>
                  <li><strong>Status</strong>{gettingadata.Status}
                    <form className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating 1 to 5"
                        className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleComplete(gettingadata.Id, rating,gettingadata.AssignedTo)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Complete
                      </button>
                    </form>
                  </li>
                  <li><strong>AssignedTo:</strong>{gettingadata.AssignedTo}</li>
                  <li><strong>Description:</strong>{gettingadata.Description}</li>
                </ul>
              </div>

              <div className="p-10">

                <div onClick={handleCloseModal} className="bg-blue-500 text-white px-4 py-2 rounded items-center flex justify-center">
                  <h1 >close</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

        <div className="flex justify-center">
          {showupadte && upadatedata && (
            <div className="absolute inset-0 flex justify-center  items-center z-20  sm:p-12 md:p-32 lg:p-56 ">
              <div className="bg-white rounded-lg  sm:p-10 md:p-14 w-full p-20 max-w-2xl mt-64  md:mt-32">
                <h2 className="text-xl font-bold mb-4 text-center">Update Job: {upadatedata.Title}</h2>

                <form>
                  <label className="block font-semibold mb-2">Id</label>
                  <input
                    type="text"
                    name="CategoryId"
                    value={upadatedata.Id}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full" readOnly
                  />
                  <label className="block font-semibold mb-2">CategoryId</label>
                  <input
                    type="text"
                    name="CategoryId"
                    value={upadatedata.CategoryId}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full" readOnly
                  />

                  <label className="block font-semibold mb-2">CreaterId</label>
                  <input
                    type="text"
                    name="CreaterId"
                    value={upadatedata.CreaterId}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full" readOnly
                  />

                  <label className="block font-semibold mb-2">Interests</label>
                  <input
                    type="text"
                    name="Interests"
                    value={upadatedata.Interests}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full" readOnly
                  />

                  <label className="block font-semibold mb-2">Price</label>
                  <input
                    type="number"
                    name="Price"
                    value={upadatedata.Price}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full"
                  />

                  <label className="block font-semibold mb-2">Status</label>
                  <input
                    type="text"
                    name="Status"
                    value={upadatedata.Status}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full" readOnly
                  />

                  <label className="block font-semibold mb-2">Description</label>
                  <textarea
                    name="Description"
                    value={upadatedata.Description}
                    onChange={(e) => handleDataUpdation(e)}
                    className="border px-3 py-2 rounded w-full"
                  />

                  <div className="flex gap-4 mt-6 justify-end">
                    <button
                      type="button"
                      onClick={handleOpenUpadtemodel}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseUpdatemodel}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    
  );
};


















