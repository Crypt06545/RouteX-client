import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons

const Register = () => {
  const [showPassword, setShowPassword] = useState(false); // Handle password visibility state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register your account
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Your Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex justify-center items-center absolute inset-y-0 right-2 text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              name="condition"
              type="checkbox"
              required
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-0"
            />
            <label className="ml-2 text-sm text-gray-700">
              Accept{" "}
              <span className="font-semibold text-black">
                Terms & Conditions
              </span>
            </label>
          </div>
          <p className="text-center font-semibold">
            Already have an account?{" "}
            <a className="text-red-500" href="/login">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-800 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
