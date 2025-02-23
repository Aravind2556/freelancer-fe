import React, { useContext, useState } from "react";
import { DContext } from "../Datacontext/DataContext";

export const AdminTickets = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { tickes, setTickes } = useContext(DContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const handleEdit = (ticket) => {
    setSelectedTicket(ticket);
    setUpdatedStatus(ticket.Status);
    setShowModal(true);
  };


  function handleUpdateStatus() {
    fetch(`${apiurl}/tickets-update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ Status: updatedStatus, Id: selectedTicket.Id, }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          setShowModal(false)
          window.location.reload()
          setTickes(data.data)
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.log("error in update tickets", err)
      })


  }

  return (
    <div className="h-screen  p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Tickets</h1>
      <div className=" flex justify-center">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className=" text-white">
              <th className="px-4 py-2 border">Sl. No</th>
              <th className="px-4 py-2 border hidden md:table-cell">Id</th>
              <th className="px-4 py-2 border hidden md:table-cell">Raised By</th>
              <th className="px-4 py-2 border hidden md:table-cell">Description</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickes && tickes.length > 0 ? (
              tickes.map((data, index) => (
                <tr key={data.Id} className="text-gray-800 hover:bg-gray-100 brit border-b">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center hidden md:table-cell">{data.Id}</td>
                  <td className="px-4 py-2 border text-center hidden md:table-cell">{data.RaisedBy}</td>
                  <td className="px-4 py-2 border hidden md:table-cell ">{data.Description}</td>
                  <td
                    className={`px-4 py-2 border text-center ${data.Status === "Open"
                        ? "text-blue-600"
                        : data.Status === "In progress"
                          ? "text-orange-600"
                          : data.Status === "Resolved"
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                  >
                    {data.Status}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <p
                      className="text-2xl text-orange-700 px-4 py-2 rounded btn"
                      onClick={() => handleEdit(data)}
                    >
                      <i class="bi bi-person-raised-hand"></i>
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No tickets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Status */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-center">Update Status</h2>
            <select
              className="w-full p-2 border rounded mb-4"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleUpdateStatus}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
