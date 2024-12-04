import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider"; // import theme context
import { IoMoonOutline } from "react-icons/io5"; // Moon icon
import { FiSun } from "react-icons/fi"; // Sun icon

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // access theme context

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-14 h-14 rounded-full"
    >
      {/* Sun Icon */}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <FiSun className="h-10 w-10 text-yellow-500" />
      </div>

      {/* Moon Icon */}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <IoMoonOutline className="h-10 w-10 text-green-900" />
      </div>
    </button>
  );
};

export default ToggleTheme;
