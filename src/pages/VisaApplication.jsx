import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import "animate.css";

const VisaApplication = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [visaApplications, setVisaApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);

  const email = user?.email;

  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/myvisas/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisaApplications(data);
          setFilteredApplications(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setIsLoading(false);
        });
    }
  }, [email]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredApplications(visaApplications);
    } else {
      const filtered = visaApplications.filter((application) =>
        application?.visaDetails?.countryName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/rmyapplication/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setVisaApplications((prev) =>
                prev.filter((application) => application._id !== id)
              );
              setFilteredApplications((prev) =>
                prev.filter((application) => application._id !== id)
              );
              Swal.fire({
                title: "Deleted!",
                text: "Your Visa Application has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the Visa.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting file:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div
      className={`relative my-20 px-4 transition duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Title and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">My Applied Visa Details</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search by country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border transition duration-200 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-black placeholder-gray-600"
            }`}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Visa Applications */}
      <div className="grid gap-6">
        {filteredApplications.length === 0 ? (
          <p className="text-2xl text-center text-red-500">
            No visa applications found.
          </p>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application?._id}
              className={`animate__animated animate__fadeInUp rounded-xl shadow-md overflow-hidden md:flex border transition duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Country Image */}
              <div className="md:w-1/3">
                <img
                  src={application?.visaDetails?.countryImage}
                  alt={application?.visaDetails?.countryName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Visa Info */}
              <div className="md:w-2/3 p-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {application?.visaDetails?.countryName}
                    </h3>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {application?.visaDetails?.visaType}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(application?._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    <RiDeleteBin2Fill className="text-lg" />
                    Cancel
                  </button>
                </div>

                {/* Visa Details */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <p>
                    <span className="font-semibold">Processing Time:</span>{" "}
                    {application?.visaDetails?.processingTime} days
                  </p>
                  <p>
                    <span className="font-semibold">Fee:</span> $
                    {application?.fee}
                  </p>
                  <p>
                    <span className="font-semibold">Validity:</span>{" "}
                    {application?.visaDetails?.validity} months
                  </p>
                  <p>
                    <span className="font-semibold">Application Method:</span>{" "}
                    {application?.visaDetails?.applicationMethod}
                  </p>
                </div>

                {/* Applicant Info */}
                <div
                  className={`text-xs pt-2 border-t ${
                    theme === "dark"
                      ? "text-gray-400 border-gray-600"
                      : "text-gray-500 border-gray-300"
                  }`}
                >
                  <p className="pt-2">
                    <strong>Applicant:</strong> {application?.firstName}{" "}
                    {application?.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {application?.email}
                  </p>
                  <p>
                    <strong>Applied On:</strong> {application?.applyDate}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VisaApplication;
