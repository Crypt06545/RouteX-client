import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createNewUser, setUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      const user = res.user;
      if (user) {
        setUser(user);
        const username = user.email.split("@")[0];
        toast.success(`Hey! ${username} Welcome to E-Tutor`);
        navigate("/");
      }
    } catch (error) {
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
        "Password must contain at least one uppercase, lowercase letter, and 6+ characters."
      );
      return;
    }

    try {
      const res = await createNewUser(email, password);
      const user = res.user;
      if (user) {
        setUser(user);
        const username = email.split("@")[0];
        toast.success(`Hey! ${username} Welcome to E-Tutor`);
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address. Try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-800 dark:text-white min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register Your Account
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
              className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-300"
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
              className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-300"
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
              className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-300"
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
                className="w-full px-4 py-2 border dark:border-gray-700 dark:bg-gray-800 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 text-gray-600 dark:text-gray-300"
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
              className="w-4 h-4 border-gray-300 dark:border-gray-700 rounded"
            />
            <label className="ml-2 text-sm">
              Accept{" "}
              <span className="font-semibold text-black dark:text-white">
                Terms & Conditions
              </span>
            </label>
          </div>

          <p className="text-center font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-black dark:bg-gray-700 text-white rounded hover:bg-gray-800 focus:outline-none"
          >
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 mt-4 bg-blue-600 dark:bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-700"
          >
            <FcGoogle className="mr-2" /> Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
