import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here without toast notification
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your account
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
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

          <p className="text-center font-semibold">
            Create an account?{" "}
            <a className="text-red-500" href="/register">
              SignUp
            </a>
          </p>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-800 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
