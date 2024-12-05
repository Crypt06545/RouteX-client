import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";
import Loader from "../components/Loader";

const AllVisa = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state to track loading process

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/allvisas`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVisas(data); // Load only 6 latest visas
        setLoading(false); // Hide the loader once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
    <div className={`p-8 ${containerClass}`}>
      <h2 className="text-3xl font-bold text-center mb-8">All Visas</h2>

      {/* Loader */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visas.map((visa) => (
            <div
              key={visa._id}
              className={`shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${cardClass}`}
            >
              <img
                src={visa.countryImage || "https://via.placeholder.com/400"} // Fallback image URL
                alt={visa.countryName || "Visa Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-2">
                  {visa.countryName || "No Country Name Provided"}
                </h3>
                <p className="mb-1">
                  <strong>Visa Type:</strong> {visa.visaType || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Processing Time:</strong>{" "}
                  {visa.processingTime || "N/A"} days
                </p>
                <p className="mb-1">
                  <strong>Fee:</strong> ${visa.fee || "N/A"}
                </p>

                <button
                  className={`${buttonClass} text-white py-2 px-4 rounded w-full transition-colors duration-300 mt-4`}
                  onClick={() => handleDetails(visa._id)}
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
