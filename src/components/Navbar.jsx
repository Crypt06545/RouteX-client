import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Hlogo.png";
import { AuthContext } from "../provider/AuthProvider";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext } from "../provider/ThemeProvider";
import navLinks from "../assets/navLinks.json"; // Import the JSON file

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  // console.log(user?.photoURL);
  
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);

  const userPhoto =
    user?.photoURL ||
    "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
  const userName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Unknown User");

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#034833]"
      } px-2 py-4 flex justify-between items-center shadow-md w-full`}
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-10" />
        <div
          className={`${
            theme === "dark" ? "text-white" : "text-[#034833]"
          } text-2xl font-bold`}
        >
          RouteX
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-6">
        {navLinks.desktop.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
                : `${
                    theme === "dark"
                      ? "font-bold text-white"
                      : "font-bold text-[#034833]"
                  } hover:text-[#83CD20] px-2 py-2`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* User Auth */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <img
              src={userPhoto}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <p className="text-sm text-gray-700">{userName}</p>
              <button
                onClick={logOut}
                className="text-red-500 hover:bg-gray-100 px-4 py-1 w-full text-left"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#83CD20] text-white px-4 py-2 rounded hover:bg-[#034833]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-[#83CD20] text-white px-4 py-2 rounded hover:bg-[#034833]"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-[#034833] text-2xl" />
          ) : (
            <FaBars className="text-[#034833] text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white shadow-lg p-4 lg:hidden overflow-x-hidden`}
      >
        {navLinks.mobile.map((link) => (
          <NavLink
            key={link.id}
            to={link.to}
            onClick={toggleMenu}
            className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
          >
            {link.label}
          </NavLink>
        ))}
        {user ? (
          <>
            <p className="font-bold text-gray-700 py-2">{userName}</p>
            <button
              onClick={() => {
                logOut();
                toggleMenu();
              }}
              className="text-red-500 hover:bg-gray-100 w-full text-left py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
              className="bg-[#83CD20] text-white w-full py-2 rounded hover:bg-[#034833]"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
                toggleMenu();
              }}
              className="bg-[#83CD20] text-white w-full py-2 rounded hover:bg-[#034833]"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Dark/Light Mode Button */}
      <div>
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
