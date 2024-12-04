// import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, setUser,googleSignIn  } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation



  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      const user = res.user;

      if (user) {
        setUser(user);  // Update context
        const username = user.email.split("@")[0].split(".com")[0];
        toast.success(`Hey! ${username} Welcome to E-Tutor`);

        navigate("/");  // Redirect to home page
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error signing in with Google. Please try again.");
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
    condition: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    // const { email, password, name, photo } = formData;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      const res = await createNewUser(email, password);
      const user = res.user;

      if (user) {
        setUser(user);



        const username = email.split("@")[0].split(".com")[0];


        toast.success(`Hey! ${username} Welcome to E-Tutor`);

        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try logging in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address. Please try again.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Weak password. Please create a stronger password.");
      } else {
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div>
      {/* <Helmet>
        <title>Lingo Bingo | Register</title>
      </Helmet> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Register your account
          </h2>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Your Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block font-medium">Photo URL</label>
              <input
                name="photo"
                type="text"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Enter your photo URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Terms & Conditions */}
            <div className="flex items-center">
              <input
                name="condition"
                type="checkbox"
                checked={formData.condition}
                onChange={handleChange}
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

            {/* Redirect to Login */}
            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500">
                Login
              </Link>
            </p>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-800 focus:outline-none"
            >
              Register
            </button>
            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none flex items-center justify-center"
            >
              <FcGoogle className="mr-2" /> Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;