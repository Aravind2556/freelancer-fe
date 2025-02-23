import React, { useContext, useState } from 'react';
import { DContext } from '../Datacontext/DataContext';
import { Loading } from '../User/Loading';

export const Adminjobs = () => {
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
  const handleCloseModal = () => {
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

  if (!Jobs) {
    return <Loading />
  }


  return (
    <div>
    <div className=" h-screen ">
      {Jobs.length > 0 ? (
        <div className=" rounded-lg relative top-28 flex justify-center p-10">
           <table className="min-w-full table-auto ">
           <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
              <tr>
                <th className="text-center text-sm font-semibold hidden md:table-cell ">Sl. No.</th>
                <th className="text-center text-sm font-semibold  ">Title</th>
                <th className="text-centertext-sm font-semibold  hidden md:table-cell">Date</th>
                <th className="text-center text-sm font-semibold  hidden md:table-cell">Price</th>
                <th className="text-center text-sm font-semibold ">Status</th>
                <th className="text-center text-sm font-semibold ">Action</th>
              </tr>
            </thead>
            <tbody>
              {Jobs.map((data, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">{index + 1}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{data.Title}</td>
                  <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">{data.createdAt}</td>
                  <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">${data.Price}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    <span className={`font-semibold ${data.Status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{data.Status}</span>
                  </td>
                  <td className="flex gap-3 px-6 py-3">
                    <p onClick={() => handleshowdata(data.Id)} title="View" className="text-blue-600 hover:text-blue-800">
                      <i className="bi bi-eye text-lg"></i>
                    </p>
                    <p onClick={() => handleUpdatedata(data.Id)} title="Edit" className="text-yellow-500 hover:text-yellow-700">
                      <i className="bi bi-pencil text-lg"></i>
                    </p>
                    <p onClick={() => handleDeletedata(data.Id)} title="Delete" className="text-red-500 hover:text-red-700">
                      <i className="bi bi-trash text-lg"></i>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (<div> No data Available</div>)
      }
      <div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-10">
            <div className="bg-white  rounded-lg  p-14">
              <h2 className="text-xl font-bold mb-4">Create Job: {gettingadata.Title}</h2>


              <div>
                <ul>
                  <li><strong>CategoryId:</strong>{gettingadata.CategoryId}</li>
                  <li><strong>CreaterId:</strong>{gettingadata.CreaterId}</li>
                  <li><strong>Id:</strong>{gettingadata.Id}</li>
                  <li><strong>Interests:</strong>{gettingadata && gettingadata.Interests.length > 0 && gettingadata.Interests.map((data, index) => (<div key={index}><p>{data}</p></div>))}</li>
                  <li><strong>Price</strong>{gettingadata.Price}</li>
                  <li><strong>Status</strong>{gettingadata.Status}</li>
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
        <div>
          {showupadte && upadatedata && (
            <div className=" absolute p-28 inset-0 top-36   bg-opacity-50 flex justify-center items-center z-50 ">
              <div className="bg-white  rounded-lg  p-14 w-full">
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
                    className="border px-3 py-2 rounded w-full"
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
    </div>
    </div>
  );
};
