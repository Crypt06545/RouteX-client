import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import { MdDelete, MdUpdate } from "react-icons/md";
import UpdateModal from "../components/UpdateModal";

const MyAddedVisa = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/addedvisas/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisas(data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [email]);

  const handleUpdate = (visa) => {
    setSelectedVisa(visa); // Open the modal with selected visa data
  };

  const handleDelete = (visaId) => {
    console.log("Log Deleted:", visaId);
    // Delete visa logic
  };

  const handleModalClose = () => {
    setSelectedVisa(null);
  };

  const handleModalSubmit = (id, updatedData) => {
    console.log("Updated Visa:", id, updatedData);
    // Update visa in the database
    handleModalClose();
  };

  const cardBgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const buttonUpdateColor =
    theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-900";
  const buttonDeleteColor =
    theme === "dark" ? "bg-red-700 text-white" : "bg-red-200 text-red-900";

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      } p-5`}
    >
      <h1 className={`text-2xl font-bold ${textColor} mb-6`}>My Added Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visas.map((visa) => (
          <div
            key={visa._id}
            className={`shadow-md rounded-lg overflow-hidden ${cardBgColor} p-4`}
          >
            <img
              src={visa.countryImage}
              alt={visa.countryName}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className={`mt-4 ${textColor}`}>
              <h2 className="text-xl font-bold mb-2">{visa.countryName}</h2>
              <p>
                <span className="font-semibold">Visa Type:</span> {visa.visaType}
              </p>
              <p>
                <span className="font-semibold">Processing Time:</span>{" "}
                {visa.processingTime} Days
              </p>
              <p>
                <span className="font-semibold">Fee:</span> ${visa.fee}
              </p>
              <p>
                <span className="font-semibold">Validity:</span>{" "}
                {visa.validity} Months
              </p>
              <p>
                <span className="font-semibold">Application Method:</span>{" "}
                {visa.applicationMethod}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className={`px-4 py-2 flex items-center gap-2 rounded-lg font-semibold hover:shadow-md ${buttonUpdateColor}`}
                onClick={() => handleUpdate(visa)}
              >
                <MdUpdate /> Update
              </button>
              <button
                className={`px-4 py-2 flex items-center gap-2 rounded-lg font-semibold hover:shadow-md ${buttonDeleteColor}`}
                onClick={() => handleDelete(visa._id)}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedVisa && (
        <UpdateModal
          visa={selectedVisa}
          closeModal={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default MyAddedVisa;
