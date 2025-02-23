import React, { useContext } from "react";
import { DContext } from "../Datacontext/DataContext";

export const Tickets = () => {
  const { tickes } = useContext(DContext);

  console.log("tickkd", tickes)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Complaint</h1>
      <div className="">
        <table className="min-w-full bg-white border border-gray-200 shadow-md relative top-28">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border">Sl. No</th>
              <th className="px-4 py-2 border hidden md:table-cell">Id</th>
              <th className="px-4 py-2 border">Raised By</th>
              <th className="px-4 py-2 border hidden md:table-cell">Description</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickes && tickes !== null && tickes.length > 0 ? (
              tickes.map((data, index) => (
                <tr key={index} className="text-gray-800 hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center hidden md:table-cell">{data.Id}</td>
                  <td className="px-4 py-2 border text-center">{data.RaisedBy}</td>
                  <td className="px-4 py-2 border hidden md:table-cell">{data.Description}</td>
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
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No Complaint available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

