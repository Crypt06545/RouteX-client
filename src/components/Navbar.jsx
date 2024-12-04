import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Hlogo.png";
import { AuthContext } from "../provider/AuthProvider"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  // console.log(user && user?.email);
  
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Default image and email name handling
  const userPhoto = user?.photoURL || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png";
  const userName = user?.displayName || (user?.email ? user.email.split('@')[0] : "Unknown User");

  return (
    <nav className="bg-white px-6 md:px-20 py-4 flex justify-between items-center shadow-md w-full">
      {/* Website Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="h-10" />
        <div className="text-2xl font-bold text-[#034833]">VisaPortal</div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
              : "font-bold text-[#034833] hover:text-[#83CD20] px-4 py-2"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/all-visas"
          className={({ isActive }) =>
            isActive
              ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
              : "font-bold text-[#034833] hover:text-[#83CD20] px-4 py-2"
          }
        >
          All Visas
        </NavLink>
        <NavLink
          to="/add-visa"
          className={({ isActive }) =>
            isActive
              ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
              : "font-bold text-[#034833] hover:text-[#83CD20] px-4 py-2"
          }
        >
          Add Visa
        </NavLink>
        <NavLink
          to="/my-added-visas"
          className={({ isActive }) =>
            isActive
              ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
              : "font-bold text-[#034833] hover:text-[#83CD20] px-4 py-2"
          }
        >
          My Added Visas
        </NavLink>
        <NavLink
          to="/my-visa-applications"
          className={({ isActive }) =>
            isActive
              ? "font-bold rounded-full bg-[#83CD20] text-white px-4 py-2"
              : "font-bold text-[#034833] hover:text-[#83CD20] px-4 py-2"
          }
        >
          My Visa Applications
        </NavLink>
      </div>

      {/* User Authentication Links */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <img
              src={userPhoto} // Using the default photo if not found
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <p className="text-sm text-gray-700">{userName}</p> {/* Display the username or email name */}
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

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-[#034833] text-2xl" />
          ) : (
            <FaBars className="text-[#034833] text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white shadow-lg p-4 lg:hidden overflow-x-hidden`}
      >
        <NavLink
          to="/"
          onClick={toggleMenu}
          className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
        >
          Home
        </NavLink>
        <NavLink
          to="/all-visas"
          onClick={toggleMenu}
          className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
        >
          All Visas
        </NavLink>
        <NavLink
          to="/add-visa"
          onClick={toggleMenu}
          className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
        >
          Add Visa
        </NavLink>
        <NavLink
          to="/my-added-visas"
          onClick={toggleMenu}
          className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
        >
          My Added Visas
        </NavLink>
        <NavLink
          to="/my-visa-applications"
          onClick={toggleMenu}
          className="block font-bold text-[#034833] hover:text-[#83CD20] py-2"
        >
          My Visa Applications
        </NavLink>
        {user ? (
          <>
            <p className="font-bold text-gray-700 py-2">{userName}</p>
            <button
              onClick={() => {
                handleLogout();
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
    </nav>
  );
};

export default Navbar;
