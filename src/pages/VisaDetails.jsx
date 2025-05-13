import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ThemeContext } from "../provider/ThemeProvider";
import ApplyModal from "../components/ApplyModal";
import { FaClock, FaMoneyBillWave, FaBirthdayCake, FaCalendarAlt, FaFileAlt, FaUser } from "react-icons/fa";

const VisaDetails = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [visaDetails, setVisaDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/visadetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVisaDetails(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Theme classes
  const containerClass = theme === "dark" 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800";
    
  const cardClass = theme === "dark" 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";
    
  const highlightClass = theme === "dark" 
    ? "bg-emerald-800/30 border-emerald-500" 
    : "bg-emerald-100/80 border-emerald-400";

  // Text colors for better dark mode visibility
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-500";
  const textTertiary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  if (loading) return <Loader />;

  if (!visaDetails) return (
    <div className={`${containerClass} min-h-screen flex items-center justify-center p-6 pt-24`}>
      <div className={`${cardClass} p-8 rounded-xl border shadow-lg max-w-md w-full text-center`}>
        <h2 className="text-xl font-semibold mb-2">Visa Not Found</h2>
        <p className={textSecondary}>No details available for this visa.</p>
      </div>
    </div>
  );

  return (
    <div className={`${containerClass} min-h-screen`}>
      <div className="py-12 px-4 sm:px-6 lg:px-8 pt-24 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className={`rounded-2xl overflow-hidden shadow-xl mb-8 relative h-96`}>
          <img
            className="w-full h-full object-cover"
            src={visaDetails.countryImage}
            alt={visaDetails.countryName}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {visaDetails.countryName} Visa
              </h1>
              <p className="text-xl text-emerald-300 font-medium">
                {visaDetails.visaType}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <div className={`${cardClass} rounded-xl border p-6 shadow-sm mb-8`}>
              <h2 className="text-2xl font-bold mb-4">Visa Overview</h2>
              <p className={`text-lg leading-relaxed mb-6 ${textSecondary}`}>
                {visaDetails.description}
              </p>
              
              <div className={`${highlightClass} border rounded-lg p-6 mb-6`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaFileAlt className="mr-2" /> Key Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FaMoneyBillWave className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Visa Fee</h4>
                      <p className={textSecondary}>${visaDetails.fee}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaClock className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Processing Time</h4>
                      <p className={textSecondary}>{visaDetails.processingTime} days</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaBirthdayCake className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Age Requirement</h4>
                      <p className={textSecondary}>{visaDetails.ageRestriction}+ years</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Visa Validity</h4>
                      <p className={textSecondary}>{visaDetails.validity} months</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Application Method</h3>
                <p className={textSecondary}>{visaDetails.applicationMethod}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
                <ul className="space-y-2">
                  {visaDetails.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span className={textSecondary}>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Action Card */}
          <div>
            <div className={`${cardClass} rounded-xl border p-6 shadow-sm sticky top-6`}>
              <div className="flex items-center mb-4">
                <FaUser className={`${textTertiary} mr-2`} />
                <span className={textTertiary}>Posted by {visaDetails.createdby.split("@")[0]}</span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
                <p className={`${textSecondary} mb-4`}>
                  Start your visa application process now with our simple and secure form.
                </p>
                <ApplyModal visaDetails={visaDetails}>
                  <button 
                    className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center`}
                  >
                    Apply Now
                  </button>
                </ApplyModal>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Need Help?</h4>
                <p className={`text-sm ${textSecondary} mb-3`}>
                  Our visa experts are available to assist you with any questions.
                </p>
                <button className={`w-full border ${theme === 'dark' ? 'border-emerald-400 text-emerald-300 hover:bg-emerald-900/30' : 'border-emerald-500 text-emerald-600 hover:bg-emerald-50'} font-medium py-2 px-4 rounded-lg transition duration-200`}>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaDetails;