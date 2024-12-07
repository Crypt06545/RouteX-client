import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ThemeContext } from "../provider/ThemeProvider";
import ApplyModal from "../components/ApplyModal";

const VisaDetails = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [visaDetails, setVisaDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // apply click button
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/visadetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setVisaDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Define classes based on the theme
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const cardClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const buttonClass =
    theme === "dark"
      ? "bg-emerald-600 hover:bg-emerald-500"
      : "bg-emerald-600 hover:bg-emerald-700";

  if (loading) return <Loader />;

  if (!visaDetails)
    return (
      <div className="text-center text-lg">No details found for this visa.</div>
    );

  return (
    <div
      className={`${containerClass} min-h-screen flex items-center justify-center p-6`}
    >
      <div
        className={`${cardClass} max-w-4xl w-full sm:max-w-md md:max-w-lg lg:max-w-4xl shadow-lg rounded-lg overflow-hidden`}
      >
        <img
          className="w-full h-[400px] object-cover"
          src={visaDetails.countryImage}
          alt="Country"
        />
        <div className="p-6">
          <h2 className="md:text-2xl text-3xl font-bold mb-4">
            {visaDetails.countryName}
          </h2>
          <p className="md:text-base text-lg mb-4">
            <strong>Visa Type:</strong> {visaDetails.visaType}
          </p>
          <p className="md:text-sm text-base mb-4">
            <strong>Description:</strong> {visaDetails.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <p>
              <strong>Fee:</strong> ${visaDetails.fee}
            </p>
            <p>
              <strong>Processing Time:</strong> {visaDetails.processingTime}{" "}
              days
            </p>
            <p>
              <strong>Age Restriction:</strong> {visaDetails.ageRestriction}+
            </p>
            <p>
              <strong>Validity:</strong> {visaDetails.validity} months
            </p>
          </div>
          <p className="text-sm sm:text-base mb-4">
            <strong>Application Method:</strong> {visaDetails.applicationMethod}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Created by:</strong> {visaDetails.createdby.split("@")[0]}
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold mt-6">
            Required Documents
          </h3>
          <ul className="list-disc list-inside mt-2">
            {visaDetails.requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
          {/* apply now modal  */}
          <div>
            <ApplyModal visaDetails={visaDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;
