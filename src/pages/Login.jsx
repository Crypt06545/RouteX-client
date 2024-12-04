import { useContext, useState } from "react";
// import { Helmet } from "react-helmet-async";
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
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
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
        } else if (errorCode === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your input.");
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
        console.error("Google Sign-In Error:", error);
      });
  };

  const handleRedirectToForgetPassword = () => {
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    navigate(`/auth/forgot-Password`, { state: { email } });
  };

  return (
    <div>
      {/* <Helmet>
        <title>Lingo Bingo | Login</title>
      </Helmet> */}
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
                value={email}
                onChange={handleChange}
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
                  value={password}
                  onChange={handleChange}
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
              <Link to={"/register"} className="text-primary">
                SignUp
              </Link>
            </p>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-black rounded hover:bg-gray-800 focus:outline-none"
            >
              Login
            </button>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2 mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded bg-white hover:bg-gray-100"
            >
              <FcGoogle size={20} />
              <span className="text-gray-700 font-medium">
                Login with Google
              </span>
            </button>

            {/* Redirect to Forget Password page */}
            <button
              type="button"
              onClick={handleRedirectToForgetPassword}
              className="w-full text-center text-sm text-blue-600 hover:underline mt-2"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;