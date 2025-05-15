import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";

const Login = () => {
  const { logIn, googleSignIn, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    logIn(email, password)
      .then((res) => {
        setUser(res.user);
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
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
        toast.success("Logged in with Google!");
      })
      .catch(() => toast.error("Google login failed. Please try again."));
  };

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Left side: Form */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-lg shadow-md mx-4 my-8 md:my-0 ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
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
              value={email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                isDarkTheme
                  ? "bg-gray-700 border-gray-600 focus:border-gray-400 text-white"
                  : "bg-white border-gray-300 focus:border-gray-500 text-black"
              }`}
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
                value={password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded focus:outline-none ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 focus:border-gray-400 text-white"
                    : "bg-white border-gray-300 focus:border-gray-500 text-black"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex justify-center items-center absolute inset-y-0 right-2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <p className="text-center font-semibold">
            Create an account?{" "}
            <Link to={"/register"} className="text-primary">
              SignUp
            </Link>
          </p>
          <button
            type="submit"
            className={`w-full py-2 mt-4 rounded focus:outline-none ${
              isDarkTheme
                ? "bg-primary text-black hover:bg-gray-600"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-full py-2 mt-4 flex items-center justify-center gap-2 border rounded ${
              isDarkTheme
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FcGoogle size={20} />
            <span className="font-medium">Login with Google</span>
          </button>
          <button
            type="button"
            className="w-full text-center text-sm text-blue-600 hover:underline mt-2"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Right side: Lottie Animation */}
     <div className="w-full max-w-xs mx-4 my-8 md:my-0">
  <Lottie
    animationData={animationData}
    loop={true}
    autoplay={true}
    style={{ width: "100%", height: "auto", maxHeight: "280px" }}
  />
</div>

    </div>
  );
};

export default Login;
