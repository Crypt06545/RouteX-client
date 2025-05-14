import React, { useContext } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { ThemeContext } from "../provider/ThemeProvider";
import { RiDashboardLine } from 'react-icons/ri';
import { HiOutlineDocumentAdd, HiOutlineDocumentText, HiOutlineClipboardList } from 'react-icons/hi';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { AuthContext } from "../provider/AuthProvider";

const DashboardLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const containerClass = theme === "dark"
    ? "bg-gray-900 text-gray-100"
    : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800";

  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-500";
  const textTertiary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <RiDashboardLine className="w-6 h-6" /> },
    { name: "Add Visa", path: "/dashboard/add-visa", icon: <HiOutlineDocumentAdd className="w-6 h-6" /> },
    { name: "My Added Visas", path: "/dashboard/my-added-visas", icon: <HiOutlineDocumentText className="w-6 h-6" /> },
    { name: "My Applications", path: "/dashboard/my-visa-applications", icon: <HiOutlineClipboardList className="w-6 h-6" /> },
  ];

  return (
    <div className={`${containerClass} flex flex-col min-h-screen`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-4 md:px-8 py-3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <a href="/" className="flex items-center">
          {/* <img
            className="h-9"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
            alt="Company Logo"
          /> */}
          <span className={`ml-2 font-semibold text-lg hidden md:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Visa Portal
          </span>
        </a>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-amber-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          <p className={`${textSecondary} hidden sm:block`}>Hi! {user?.displayName || 'User'}</p>
          <button
            onClick={logOut}
            className={`flex items-center gap-1 border rounded-full text-sm px-4 py-1 ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`md:w-64 w-16 border-r ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex flex-col`}>
          <nav className="flex-1 pt-4">
            {sidebarLinks.map((item, index) => (
              <NavLink
                to={item.path}
                end
                key={index}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 gap-3 transition-colors ${
                    isActive
                      ? `${theme === 'dark'
                          ? 'bg-emerald-900/20 border-r-4 border-emerald-500 text-emerald-400'
                          : 'bg-emerald-50 border-r-4 border-emerald-500 text-emerald-600'}`
                      : `${theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700 border-r-4 border-transparent'
                          : 'text-gray-600 hover:bg-gray-50 border-r-4 border-transparent'}`
                  }`
                }
              >
                {item.icon}
                <span className="md:block hidden font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hidden md:block`}>
            <p className={`text-xs ${textTertiary}`}>Visa Portal v1.0.0</p>
          </div>
        </aside>

        {/* Dynamic Right Side (Outlet) */}
        <main className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4 md:p-6">
          {/* Back to Home Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${theme === 'dark'
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4 0h5a2 2 0 002-2v-5a2" />
              </svg>
              Back to Home
            </button>
          </div>

          {/* Dynamic Content Goes Here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
