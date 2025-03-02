import React, { useContext, useEffect, useState } from "react";
import { DContext } from "../Datacontext/DataContext";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const Jobsdata = () => {
    const apiurl = process.env.REACT_APP_API_URL;
    const { Jobs, currentUser } = useContext(DContext);
    const [filteredJobs, setFilteredJobs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (Jobs) {
            const tempJobs = Jobs.filter((job) => !job.AssignedTo);
            setFilteredJobs(tempJobs);
        }
    }, [Jobs]);

    const handleBookmark = (providerid) => {
        if(window.confirm('Are you sure you want to apply this job')){
            fetch(`${apiurl}/update-data`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ providerid }),
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(data.message);
                    if (data.success) window.location.reload();
                })
                .catch(() => alert("Failed to bookmark the job. Please try again."));
        }

    };

    const handleraise = () => navigate("/raiseticked");
    const handleticket = () => navigate("/tickets");

    if (!currentUser || filteredJobs === null || Jobs === null) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-100 ">
            {/* Floating Buttons */}
            <div className="fixed top-20  bg-black/90 w-full flex justify-center gap-3 z-50">
                <button
                    className="w-36 sm:w-40 h-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
                    onClick={handleticket}
                >
                    View Complaints
                </button>
                <button
                    className="w-36 sm:w-40 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform"
                    onClick={handleraise}
                >
                    Raise Complaint
                </button>
            </div>

            {/* Job Listings */}
            <div className="flex justify-center">
                <div className="p-6 sm:p-10 border-2 mt-36 border-gray-200 rounded-2xl w-full max-w-4xl bg-white shadow-xl">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Available Jobs
                    </h1>
                    <div className="space-y-6">
                        {filteredJobs?.length > 0 ? (
                            filteredJobs.map((data) => (
                                <div
                                    key={data.Id}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-2 border-gray-300 bg-gray-800 p-6 rounded-lg space-y-4 sm:space-y-0 sm:space-x-4 shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300 ease-in-out"
                                >
                                    {/* Left Section */}
                                    <div className="sm:w-2/3 text-gray-100">
                                        <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                            {data.Title}
                                        </h2>
                                        <p className="text-sm leading-relaxed text-gray-300">
                                            {data.Description}
                                        </p>
                                    </div>

                                    {/* Right Section */}
                                    <div className="sm:w-1/3 text-right space-y-3">
                                        {/* Apply Button */}
                                        <p
                                            className={`cursor-pointer transition-colors duration-300 
                                                       ${data.Interests?.some((item) => item === currentUser.Id)
                                                    ? "text-gray-400 cursor-not-allowed"
                                                    : "text-yellow-500 hover:text-yellow-600"
                                                }`}
                                            title="Bookmark"
                                            onClick={() => {
                                                if (!data.Interests?.some((item) => item === currentUser.Id)) {
                                                    handleBookmark(data.Id);
                                                }
                                            }}
                                        >
                                            <span className="font-bold border p-2 rounded">{data.Interests?.some((item) => item === currentUser.Id) ? "Applied" : "Apply"}</span>
                                        </p>

                                        {/* Price */}
                                        <p className="text-lg font-semibold text-gray-100">
                                            Price:{" "}
                                            <span className="text-green-400">&#8377;{data.Price}</span>
                                        </p>

                                        {/* Status */}
                                        <p className="text-sm  text-white font-bold">
                                            Status:{" "}
                                            <span
                                                className={
                                                    data.Status === "Open"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }
                                            >
                                                {data.Status}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-600">No jobs available.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
