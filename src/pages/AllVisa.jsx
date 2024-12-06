import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";
import Loader from "../components/Loader";

const AllVisa = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisaType, setSelectedVisaType] = useState("");

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/allvisas`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVisas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Filter visas based on the selected visa type
  const filteredVisas = selectedVisaType
    ? visas.filter((visa) => visa?.visaType === selectedVisaType)
    : visas;

  const handleDetails = (id) => {
    navigate(`/visa-details/${id}`);
  };

  // Conditional classes for dark and light modes
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const cardClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const buttonClass =
    theme === "dark"
      ? "bg-emerald-600 hover:bg-emerald-500"
      : "bg-emerald-600 hover:bg-emerald-700";

  return (
    <div className={`min-h-screen p-8 ${containerClass}`}>
      <h2 className="text-3xl font-bold text-center mb-8">All Visas</h2>

      {/* Dropdown menu for visa type filter */}
      <div className="mb-6 text-center">
        <label htmlFor="visaType" className="mr-2 font-semibold">
          Filter by Visa Type:
        </label>
        <select
          id="visaType"
          value={selectedVisaType}
          onChange={(e) => setSelectedVisaType(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Visa Types</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official visa">Official visa</option>
          <option value="Tourist Visa">Tourist Visa</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : filteredVisas.length === 0 ? (
        // Display "No Data Found" if filtered visas array is empty
        <div className="text-center text-xl font-medium text-red-500">
          No Data Found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredVisas.map((visa) => (
            <div
              key={visa?._id}
              className={`shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${cardClass}`}
            >
              <img
                src={visa?.countryImage}
                alt={visa?.countryName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-2">
                  {visa?.countryName}
                </h3>
                <p className="mb-1">
                  <strong>Visa Type:</strong> {visa?.visaType}
                </p>
                <p className="mb-1">
                  <strong>Processing Time:</strong> {visa?.processingTime} days
                </p>
                <p className="mb-1">
                  <strong>Fee:</strong> ${visa?.fee}
                </p>

                <button
                  className={`${buttonClass} text-white py-2 px-4 rounded w-full transition-colors duration-300 mt-4`}
                  onClick={() => handleDetails(visa?._id)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVisa;
