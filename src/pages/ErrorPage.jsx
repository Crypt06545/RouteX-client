import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the home page
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-400 min-h-screen">
      <div className="w-1/3 h-auto">
        <Lottie animationData={errorAnimation} />
      </div>
      <button
        onClick={handleBackToHome}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700" 
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
