import React, { useEffect, useState } from 'react';

export const Categories = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobname, setJobName] = useState('');
  const [jobdescription, setJobDescription] = useState('');
  const [categories,setcategories]=useState(null)
  console.log("categ",categories)

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseLoginModal = () => setIsModalOpen(false);

  function handleSave() {
    if(window.confirm('Are you sure you want to Create categories')){
      if (jobname !== '' && jobdescription !== '') {
        fetch(`${apiurl}/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ jobname, jobdescription }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              window.location.reload()
              alert('Data saved successfully!');
            } else {
              alert('Something went wrong!');
            }
          })
          .catch((err) => {
            console.log('Error:', err);
          });
      } else {
        console.log('Fields are empty');
      }
    }

  }

  useEffect(()=>{

    fetch(`${apiurl}/fetch-categories`, {
      method: "GET",
      credentials: 'include',
  })
      .then((res) => res.json())
      .then((data) => {
          if (data.success === true) {
             
              setcategories(data.data)
          } else {
              alert(data.message);
              console.log(data.message)
          }
      })
      .catch((err) => {
          alert("error", err);
      });

  },[])

  const handleDelete = (id) =>{
    if(window.confirm('Are you sure! you delete this job categories ')){
      fetch(`${apiurl}/categories-delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            window.location.reload()
            alert(data.message);
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    }





  }

  return (
    <div className="relative h-screen top-24 flex justify-center p-5">
      {/* Create Button */}
      <div className="grid justify-center">
      <div className=" flex justify-end items-end mb-6">
        <button
          onClick={handleLoginClick}
          className=" text-white p-3 rounded-md cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Category
        </button>
      </div>

      
 
  <div >
    <table className="min-w-full  mb-44 bg-white border border-gray-200 shadow-md relative overflow-y-auto ">
      <thead>
        <tr className=" text-white">
          <th className="px-4 py-2 border">Sl. No</th>
          <th className="px-4 py-2 border hidden md:table-cell">Id</th>
          <th className="px-4 py-2 border hidden md:table-cell">Jobdescription</th>
          <th className="px-4 py-2 border">Jobname</th>
          <th className="px-4 py-2 border">Action</th>

          
        </tr>
      </thead>
      <tbody>
        {categories && categories.length > 0 ? (
          categories.map((data, index) => (
            <tr key={data.Id} className="text-gray-800 hover:bg-gray-100">
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border text-center hidden md:table-cell">{data.Id}</td>

              <td className="px-4 py-2 border line-clamp-4 w-[500px] hidden md:table-cell">{data.Jobdescription}</td>
              <td className="px-4 py-2 border text-center">{data.Jobname}</td>
              <td className="px-4 py-2 border text-center">
                <p className=" text-red-600 px-4 py-2 rounded " onClick={()=>handleDelete(data.Id)}>
                <i className="bi bi-trash bg-white text-lg"></i>
                </p>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-4 py-2 border text-center text-gray-500">
              No tickets available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  </div>



      

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 sm:w-96 p-6 shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Create Category</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Name</label>
                <input
                  type="text"
                  placeholder="Enter job name"
                  value={jobname}
                  onChange={(e) => setJobName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={jobdescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseLoginModal}
                  className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
