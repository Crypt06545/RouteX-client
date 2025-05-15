import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import Lottie from "lottie-react";
import registerAnimation from "../assets/animation.json"; // <-- path to your animation

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, setUser, googleSignIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      const user = res.user;

      if (user) {
        setUser(user);
        const username = user.email.split("@")[0].split(".com")[0];
        toast.success(`Hey! ${username}, Welcome to RouteX`);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error signing in with Google. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    email: "",
    password: "",
    condition: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

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
        toast.success(`Hey! ${username}, Welcome to RouteX`);
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
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-10 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex flex-col md:flex-row items-center md:space-x-12 max-w-6xl w-full">
        {/* Animation side */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="w-64 sm:w-72 md:w-80">
            <Lottie animationData={registerAnimation} loop={true} />
          </div>
        </div>

        {/* Form side */}
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md p-8 shadow-lg rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
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
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className={`w-full px-4 py-2 border rounded focus:outline-none ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-medium">Photo URL</label>
              <input
                name="photo"
                type="text"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Enter your photo URL"
                className={`w-full px-4 py-2 border rounded focus:outline-none ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 border rounded focus:outline-none ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white"
                    : "border-gray-300"
                }`}
              />
            </div>

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
                  className={`w-full px-4 py-2 border rounded focus:outline-none ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-700 text-white"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-2 flex items-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                name="condition"
                type="checkbox"
                checked={formData.condition}
                onChange={handleChange}
                required
                className={`w-4 h-4 border rounded focus:ring-0 ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              />
              <label className="ml-2 text-sm">
                Accept <span className="font-semibold">Terms & Conditions</span>
              </label>
            </div>

            <p className="text-center font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-700 focus:outline-none"
            >
              Register
            </button>

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
