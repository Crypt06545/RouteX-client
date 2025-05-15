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
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/latestvisas`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        setVisas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDetails = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/visa-details/${id}`);
  };
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate('/all-visas')
  };

  // Theme classes
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const cardClass =
    theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700"
      : "bg-white hover:bg-gray-50";
  const buttonClass =
    theme === "dark"
      ? "bg-emerald-600 hover:bg-emerald-500"
      : "bg-emerald-600 hover:bg-emerald-700";

  return (
    <div className={`py-12 px-4 sm:px-6 lg:px-8 ${containerClass}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 animate__animated animate__fadeIn">
          Latest Visas
        </h2>

        {isLoading ? (
          <Loader />
        ) : visas.length === 0 ? (
          <div className="text-center text-xl text-red-500 py-12">
            No visa data available at the moment.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visas.map((visa) => (
                <div
                  key={visa?._id}
                  className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${cardClass} animate__animated animate__fadeInUp`}
                >
                  <div className="relative h-48">
                    <img
                      src={visa?.countryImage}
                      alt={visa?.countryName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-2xl font-bold text-white">
                        {visa?.countryName}
                      </h3>
                      <p className="text-emerald-300 font-medium">
                        {visa?.visaType}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Processing Time</p>
                        <p className="font-medium">
                          {visa?.processingTime} days
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fee</p>
                        <p className="font-medium">${visa?.fee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Validity</p>
                        <p className="font-medium">{visa?.validity} months</p>
                      </div>
                    </div>

                    <p className="text-sm line-clamp-3 mb-4">
                      {visa?.description}
                    </p>

                    <button
                      onClick={() => handleDetails(visa?._id)}
                      className={`${buttonClass} text-white py-2 px-4 rounded-lg w-full transition-colors duration-200`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleClick}
                className={`${buttonClass} text-white font-medium py-3 px-8 rounded-lg inline-flex items-center transition-colors duration-200`}
              >
                See All Visas
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LatestVisas;
