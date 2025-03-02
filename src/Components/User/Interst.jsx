import React, {useState } from 'react'

import { useLocation } from 'react-router-dom';

export const Interst = () => {
  const location = useLocation();
  const jobDetails = location.state?.jobDetails;
  const apiurl = process.env.REACT_APP_API_URL;

const [show, setshow] = useState(false)
  const [intestshow, setshowintrestdata] = useState('')



 

const handleAssign = (free, job) => {
  if(window.confirm('Are you sure you want to assign this freelance ')){
    fetch(`${apiurl}/assigning-to-freelancer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ free, job }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          window.location.reload()

        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log('Login error', err));
  }
  }

  const handleshow = (intrestdata) => {
    setshow(true)

    fetch(`${apiurl}/fetch-intest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ intrestdata }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setshowintrestdata(data.data)

        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log('Login error', err));

  }
  const handleclose = () => {
    setshow(false)
  }

return (
    <div className=" h-screen">
    <div className=" top-32 grid absolute w-screen justify-center p-20 mb-56">
      <table className="bottom-9 w-96 p-11 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Interest</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails ? (
            jobDetails.Interests.map((data, index) => (
              <tr className="border border-gray-300" key={index}>
                <td className="border border-gray-300 px-4 py-2">{data}</td>
                <td className="border border-gray-300 px-4 py-2 flex gap-4">
                  <button
                    onClick={() => handleAssign(data, jobDetails.Id)}
                    className="px-4 py-1 rounded bg-green-700 text-white hover:bg-green-800"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => handleshow(data)}
                    className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No interests found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center z-10 inset-0 absolute mt-60">
  {show && (
    <div className="bg-white p-4 shadow-lg relative flex justify-center rounded-2xl  w-full max-w-sm md:max-w-md lg:max-w-lg text-center">
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold">Name</td>
              <td className="border px-4 py-2">{intestshow.Name}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Email</td>
              <td className="border px-4 py-2 text-gray-600">{intestshow.Email}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Role</td>
              <td className="border px-4 py-2 text-blue-500">{intestshow.Role}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Contact</td>
              <td className="border px-4 py-2 text-gray-700">{intestshow.Contact}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Experience</td>
              <td className="border px-4 py-2">{intestshow.Experience}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">LinkedIn</td>
              <td className="border px-4 py-2 text-gray-600">{intestshow.Linkedin}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Qualification</td>
              <td className="border px-4 py-2 text-blue-500">{intestshow.Qualification}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Ratings</td>
              <td className="border px-4 py-2 text-gray-700">{intestshow.Ratings}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Skills</td>
              <td className="border px-4 py-2 text-gray-700">{intestshow.Skills}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold">Completed Jobs</td>
              <td className="border px-4 py-2 text-gray-700">{intestshow.CompletedJobs}</td>
              
            </tr>
          </tbody>
        </table>

        <div className="mt-4">
          <button
            onClick={handleclose}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}
</div>

    </div>
    </div>
  )
}
