import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";
import Loader from "./Loader";
import "animate.css";

const LatestVisas = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [visas, setVisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start loading when the component mounts
    setIsLoading(true);

    // Fetch data
    fetch(`${import.meta.env.VITE_API_BASE_URL}/latestvisas`)
      .then((response) => response.json())
      .then((data) => {
        setVisas(data); // Set visas data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
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
      <h2 className="text-3xl font-bold text-center mb-8 animate__animated animate__backInLeft">
        Latest Visas
      </h2>
      {isLoading ? (
        <Loader />
      ) : visas.length === 0 ? (
        // No data found validation
        <div className="text-center text-xl text-red-500 animate__animated animate__backInLeft">
          No data found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visas.map((visa) => (
              <div
                key={visa?._id}
                className={`shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${cardClass} animate__animated animate__backInLeft`}
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
                  <div className="h-[350px]">
                    <p className="mb-1">
                      <strong>Visa Type:</strong> {visa?.visaType}
                    </p>
                    <p className="mb-1">
                      <strong>Processing Time:</strong> {visa?.processingTime}{" "}
                      days
                    </p>
                    <p className="mb-1">
                      <strong>Fee:</strong> ${visa?.fee}
                    </p>
                    <p className="mb-1">
                      <strong>Validity:</strong> {visa?.validity} months
                    </p>
                    <p className="mb-1">
                      <strong>Application Method:</strong>{" "}
                      {visa?.applicationMethod}
                    </p>

                    {/* New Section: Description */}
                    <p className="mb-4">
                      <strong>Description:</strong>{" "}
                      {visa?.description?.split(" ").slice(0, 10).join(" ")}
                      ......
                    </p>

                    {/* New Section: Required Documents */}
                    <div>
                      <strong>Required Documents:</strong>
                      <ul className="list-disc pl-6">
                        {visa.requiredDocuments.map((doc, index) => (
                          <li key={index} className="mb-2">
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* See Details Button */}
                  <button
                    className={`${buttonClass} text-white py-2 px-4 rounded w-full mt-4`}
                    onClick={() => handleDetails(visa?._id)}
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
        </>
      )}
    </div>
  );
};

export default LatestVisas;
