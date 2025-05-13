import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";
import Loader from "../components/Loader";
import "animate.css";

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
    <div className={`min-h-screen p-6 ${containerClass}`}>
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 animate__animated animate__backInLeft">
          All Visas
        </h2>

        {/* Dropdown menu for visa type filter */}
        <div className="mb-6 text-center animate__animated animate__backInLeft">
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
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
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
                      <p className="font-medium">{visa?.processingTime} days</p>
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
                    onClick={() => {
                      handleDetails(visa?._id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`${buttonClass} text-white py-2 px-4 rounded-lg w-full transition-colors duration-200`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVisa;
