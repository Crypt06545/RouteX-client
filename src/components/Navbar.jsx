import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Hlogo.png";
import { AuthContext } from "../provider/AuthProvider";
import ToggleTheme from "./ToggleTheme";
import { ThemeContext } from "../provider/ThemeProvider";
import navLinks from "../assets/navLinks.json";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const userPhoto =
    user?.photoURL ||
    "https://i.pinimg.com/736x/21/cb/d6/21cbd6c7efa053011d8d03b67dbea45d.jpg";
  const userName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Unknown User");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-sm`}
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-semibold">RouteX</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.desktop.map((link) => (
              <NavLink
                key={`desktop-${link.id}`}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-[#83CD20] text-white"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-[#83CD20]"
                  } transition-colors duration-200`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <ToggleTheme />

            {user ? (
              <div className="hidden md:block relative group ml-2">
                <img
                  src={userPhoto}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-[#83CD20]"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {userName}
                  </p>
                  <NavLink
                    to="/dashboard"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block ml-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-[#83CD20] hover:bg-[#034833] transition-colors duration-200"
              >
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                aria-expanded="false"
              >
                {isOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-40`}
      >
        <div className="px-4 pt-4 pb-4 space-y-2">
          {/* Navigation Links */}
          {navLinks.mobile.map((link) => (
            <NavLink
              key={`mobile-${link.id}`}
              to={link.to}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-base font-medium transition ${
                  isActive
                    ? "bg-[#83CD20] text-white"
                    : theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-700 hover:text-[#83CD20] hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Authenticated User Section */}
          {user ? (
            <>
              <div className="flex items-center px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={userPhoto}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                  {userName}
                </span>
              </div>

              <NavLink
                to="/dashboard"
                onClick={toggleMenu}
                className="block px-4 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Dashboard
              </NavLink>

              <button
                onClick={() => {
                  logOut();
                  toggleMenu();
                }}
                className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
              <button
                onClick={() => {
                  navigate("/login");
                  toggleMenu();
                }}
                className="w-full px-4 py-2 text-sm font-medium rounded-md text-white bg-[#83CD20] hover:bg-[#034833] transition"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  toggleMenu();
                }}
                className="w-full px-4 py-2 text-sm font-medium rounded-md text-[#83CD20] border border-[#83CD20] hover:bg-[#83CD20] hover:text-white transition"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
