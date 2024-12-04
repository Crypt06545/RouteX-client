import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { logIn, googleSignIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    logIn(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          toast.error("This email is not registered. Please sign up.");
        } else if (errorCode === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("Login failed. Please try again later.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const user = res.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        toast.success("Logged in with Google!");
      })
      .catch((error) => {
        toast.error("Google login failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to your account
        </h2>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block font-medium">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 dark:text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Sign Up Redirect */}
          <p className="text-center font-semibold">
            Create an account?{" "}
            <Link to="/register" className="text-blue-500 dark:text-blue-400">
              Sign Up
            </Link>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Login
          </button>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 mt-4 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <FcGoogle size={20} />
            <span>Login with Google</span>
          </button>

          {/* Forgot Password */}
          <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
