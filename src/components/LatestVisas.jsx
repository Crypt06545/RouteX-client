import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";

const LatestVisas = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Accessing the theme from context
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    fetch("../visas.json")
      .then((response) => response.json())
      .then((data) => setVisas(data.slice(0, 6))) // Load only 6 latest visas
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDetails = (id) => {
    navigate(`/visa-details/${id}`);
  };

  // Conditional classes for dark and light modes
  const containerClass = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const cardClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const buttonClass = theme === "dark" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-emerald-600 hover:bg-emerald-700";

  return (
    <div className={`p-8 ${containerClass}`}>
      <h2 className="text-3xl font-bold text-center mb-8">Latest Visas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visas.map((visa) => (
          <div
            key={visa.id}
            className={`shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${cardClass}`}
          >
            <img
              src={visa.image}
              alt={visa.country}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-emerald-400 mb-2">
                {visa.country}
              </h3>
              <p className="mb-1">
                <strong>Visa Type:</strong> {visa.visa_type}
              </p>
              <p className="mb-1">
                <strong>Processing Time:</strong> {visa.processing_time} days
              </p>
              <p className="mb-1">
                <strong>Fee:</strong> ${visa.fee}
              </p>
              <p className="mb-1">
                <strong>Validity:</strong> {visa.validity} months
              </p>
              <p className="mb-4">
                <strong>Application Method:</strong> {visa.application_method}
              </p>
              <button
                className={`${buttonClass} text-white py-2 px-4 rounded w-full transition-colors duration-300`}
                onClick={() => handleDetails(visa.id)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          className={`${buttonClass} text-white py-3 px-8 rounded-lg transition-colors duration-300`}
          onClick={() => navigate("/all-visas")}
        >
          See All Visas
        </button>
      </div>
    </div>
  );
};

export default LatestVisas;
