import React, { useState } from 'react';

export const UserAccount = () => {
    const apiurl = process.env.REACT_APP_API_URL;

    // User Data
    let user = [
        { all: "all" },
        { freelacer: "Freelancer" },
        { jobprovider: "Company" },
        { admin: "Admin" }
    ];


    const [showpopup, setShowpopup] = useState(false)
    const [showupdatepopup,setupdatepopup]=useState(false)
    const [tabledata, settabledata] = useState([])
    const [popupdata, setpopupdata] = useState('')
    const [userdataupadte,setusreupdatedata]=useState([])
    console.log("Upadte user data",userdataupadte)
    console.log("")

    console.log("table dta", tabledata)
    console.log("popup data", popupdata)


    // Function to Handle Users
    function handleUsers(selectedUser) {
        console.log("Selected User:", selectedUser);

        if (selectedUser) {
            fetch(`${apiurl}/Users-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ selectedUser }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success === true) {
                        settabledata(data.data)
                    } else {
                        alert('Something went wrong!');
                    }
                })
                .catch((err) => {
                    console.error('Error:', err);
                });
        } else {
            console.log('No user selected');
        }
    }

    const handleIcon = (data) => {
        console.log("user id", data)
        setShowpopup(true)

        fetch(`${apiurl}/aloneusers`, {
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

                    setpopupdata(data.data)
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            });

    }
    
    const handleupdateIcon = (data) =>{
        console.log("handleupdateIcon",data)
        setupdatepopup(true)
        fetch(`${apiurl}/Updata-id`, {
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

                    setusreupdatedata(data.data)
                } else {
                    alert(data.message);
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            });

    }


    const handleOpenUpadtemodel = () => {
        setupdatepopup(false)
        console.log("update user data in function block",userdataupadte)
        if(userdataupadte){
          fetch(`${apiurl}/Update-user-in-admin`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ data : userdataupadte }),
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
        else{
          console.log("Trouble data")
        }
    }



    const handleDeletedata = async (data) => {
        // Confirm the deletion action
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
    
        try {
          const response = await fetch(`${apiurl}/deleteuserdatainadmin`, {
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





    const handleClosepopup = () => {
        setShowpopup(false)
    }
    const handleCloseupadatepopup = () => {
        setupdatepopup(false)
    }

    const handleDataUpdation = (e) =>{
        const {name, value} = e.target
        console.log("name, value:",name, value)
        console.log('property value:',userdataupadte.name)
        setusreupdatedata(prev=>{
          let tempObj = {...prev}
          tempObj[name]=value
          return tempObj
        })
      }


    return (
        <div className=" h-screen">
            <div className=" top-20 bg-blue-200 p-10 right-20 z-10  sticky">
                {/* Create Button */}
                <div className="flex gap-2 justify-center">
                    {/* All Button */}
                    <div>
                        <button
                            className=" text-white p-2 rounded-md cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => handleUsers(user[0])}
                        >
                            {user[0].all}
                        </button>
                    </div>

                    {/* Freelancer Button */}
                    <div>
                        <button
                            className=" text-white p-2 rounded-md cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => handleUsers(user[1])}
                        >
                            {user[1].freelacer}
                        </button>
                    </div>

                    {/* Job Provider Button */}
                    <div>
                        <button
                            className="text-white p-2  rounded-md cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => handleUsers(user[2])}
                        >
                            {user[2].jobprovider}
                        </button>
                    </div>

                    {/* Admin Button */}
                    <div>
                        <button
                            className=" text-white p-2 rounded-md cursor-pointer hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => handleUsers(user[3])}
                        >
                            {user[3].admin}
                        </button>
                    </div>
                </div>
            </div>
            <div>


                <div className="flex justify-center shadow-lg rounded-lg relative top-14 p-16">

                    <table className="min-w-full table-auto border-collapse rounded-lg bg-white">
                        <thead className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-left">Sl. No.</th>
                                <th className="px-6 py-3 text-sm font-semibold text-left">Name</th>
                                <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell">Role</th>
                                <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell">Contact</th>
                                <th className="px-6 py-3 text-sm font-semibold text-left hidden md:table-cell">createdAt</th>
                                <th className="px-6 py-3 text-sm font-semibold text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabledata.length > 0 ? (
                                tabledata.map((data, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-6 py-3 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-3 text-sm text-gray-700">{data.Name || '-'}</td>
                                        <td className="px-6 py-3 text-sm text-gray-700 hidden  md:table-cell">{data.Role || '-'}</td>
                                        <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">{data.Contact || '-'}</td>
                                        <td className="px-6 py-3 text-sm text-gray-700 hidden md:table-cell">
                                            {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="flex gap-3 px-6 py-3">
                                            <p title="View" className="text-blue-600 hover:text-blue-800" onClick={() => handleIcon(data.Id)}>
                                                <i className="bi bi-eye text-lg"></i>
                                            </p>
                                            <p title="Edit" className="text-yellow-500 hover:text-yellow-700" onClick={()=>handleupdateIcon(data.Id)} >
                                                <i className="bi bi-pencil text-lg"></i>
                                            </p>
                                            <p title="Delete" className="text-red-500 hover:text-red-700" onClick={()=>handleDeletedata(data.Id)}>
                                                <i className="bi bi-trash text-lg"></i>
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>



            </div>
            <div>
                {
                    showpopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-10">
                            <div className="bg-white  rounded-lg  p-14">


                                <div>
                                    <ul>
                                        <li><strong>Id:</strong>{popupdata.Id}</li>
                                        <li><strong>Name:</strong>{popupdata.Name}</li>
                                        <li><strong>Role:</strong>{popupdata.Role}</li>
                                        <li><strong>createdAt:</strong>{popupdata.createdAt}</li>
                                        <li><strong>Contact</strong>{popupdata.Contact}</li>
                                        <li><strong>Email</strong>{popupdata.Email}</li>
                                        <li><strong>Password:</strong>{popupdata.Password}</li>
                                    </ul>
                                </div>



                                <div className="p-10">

                                    <div onClick={handleClosepopup} className="bg-blue-500 text-white px-4 py-2 rounded items-center flex justify-center">
                                        <h1 >close</h1>
                                    </div>
                                </div>

                            </div>

                        </div>

                    )
                }
                <div>
                    {
                        showupdatepopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-10">
              <div className="bg-white  rounded-lg  p-14 w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Update User:{userdataupadte.Name}</h2>
             
                 <form>
  <label className="block font-semibold mb-2">Id</label>
  <input
    type="text"
    name="Id"
    value={userdataupadte.Id}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full" readOnly
  />
   <label className="block font-semibold mb-2">CategoryId</label>
  <input
    type="text"
    name="Name"
    value={userdataupadte.Name}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full" 
  />

  <label className="block font-semibold mb-2">CreaterId</label>
  <input
    type="text"
    
    name="Role"
    value={userdataupadte.Role}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full" readOnly
  />

  <label  className="block font-semibold mb-2">Interests</label>
  <input
    type="email"
    name="Email"
    value={userdataupadte.Email}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full"
  />

  <label  className="block font-semibold mb-2">Price</label>
  <input
    type="text"
    name="Password"
    value={userdataupadte.Password}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full"
  />

   <label  className="block font-semibold mb-2">Status</label>
  <input
    type="text"
    name="Contact"
    value={userdataupadte.Contact}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full" readOnly
  />

 {/* <label className="block font-semibold mb-2">Description</label>
  <textarea
    name="Description"
    value={userdataupadte.Description}
    onChange={(e)=>handleDataUpdation(e)}
    className="border px-3 py-2 rounded w-full"
  /> */}
  
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
      onClick={handleCloseupadatepopup}
      className="bg-gray-500 text-white px-4 py-2 rounded"
    >
      Cancel
    </button>
  </div>
</form> 
{/* <button onClick={handleCloseupadatepopup}>close</button> */}

              </div>
            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
