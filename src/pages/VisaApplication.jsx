import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

const VisaApplication = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [visaApplications, setVisaApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const email = user?.email;

  // fetch data
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/myvisas/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisaApplications(data); // Set fetched data to state
          setIsLoading(false); // Set loading to false after fetching
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setIsLoading(false); // Stop loading in case of error
        });
    }
  }, [email]);

  // const handleDelete = (applicationId) => {
  //   // Show confirmation popup before deletion
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // If user confirms, perform the DELETE request
  //       fetch(`${import.meta.env.VITE_API_BASE_URL}/myvisas/${applicationId}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           // Show success message after deletion
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your visa application has been deleted.",
  //             icon: "success",
  //           });
  //           setVisaApplications((prevApplications) =>
  //             prevApplications.filter(
  //               (application) => application._id !== applicationId
  //             )
  //           );
  //         })
  //         .catch((err) => {
  //           console.error("Error deleting visa application:", err);
  //           Swal.fire({
  //             title: "Error!",
  //             text: "There was an issue deleting the visa application.",
  //             icon: "error",
  //           });
  //         });
  //     }
  //   });
  // };

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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        console.log("deleted ", id);
      }
    });
  };

  // Determine background and text colors based on theme
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  const buttonClass =
    "bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-6 py-2 rounded-full"; // Red button with icon

  if (isLoading) {
    return <Loader />; // Show loader while fetching data
  }

  return (
    <div className="my-20 px-4">
      <h2 className="text-2xl font-bold mb-6">Visa Application Details</h2>
      <div>
        {visaApplications.length === 0 ? (
          <p className="text-2xl text-red-500">No visa applications found.</p>
        ) : (
          visaApplications.map((application) => (
            <div
              key={application?._id}
              className={`flex flex-col md:flex-row ${containerClass} rounded-lg p-6 mb-6 shadow-lg space-y-4 md:space-y-0 md:space-x-8`}
            >
              <div className="flex-shrink-0">
                <img
                  src={application?.visaDetails?.countryImage}
                  alt={application?.visaDetails?.countryName}
                  className="w-32 h-32 rounded-lg mb-4 md:mb-0"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-xl">
                  {application?.visaDetails?.countryName}
                </h3>
                <p className="text-sm text-gray-400">
                  {application?.visaDetails?.visaType}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-lg font-semibold">
                    Processing Time: {application?.visaDetails?.processingTime}{" "}
                    days
                  </p>
                  <p className="text-lg font-semibold">
                    Fee: ${application?.fee}
                  </p>
                  <p className="text-lg font-semibold">
                    Validity: {application?.visaDetails?.validity} months
                  </p>
                  <p className="text-lg font-semibold">
                    Application Method:{" "}
                    {application?.visaDetails?.applicationMethod}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    <strong>Applicant Name:</strong> {application?.firstName}{" "}
                    {application?.lastName}
                  </p>
                  <p>
                    <strong>Applicant Email:</strong> {application?.email}
                  </p>
                  <p>
                    <strong>Applied On:</strong> {application?.applyDate}
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleDelete(application?._id)}
                    className={buttonClass}
                  >
                    <RiDeleteBin2Fill /> {/* Add the delete bin icon */}
                    <span>Cancel Application</span>{" "}
                    {/* Text next to the icon */}
                  </button>
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
