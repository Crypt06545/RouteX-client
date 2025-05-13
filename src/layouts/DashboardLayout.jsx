import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { RiDashboardLine } from 'react-icons/ri';
import { HiOutlineDocumentAdd, HiOutlineDocumentText, HiOutlineClipboardList } from 'react-icons/hi';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';


const DashboardLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Theme classes matching VisaDetails exactly
  const containerClass = theme === "dark" 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800";
    
  const cardClass = theme === "dark" 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";
    
  const highlightClass = theme === "dark" 
    ? "bg-emerald-800/30 border-emerald-500" 
    : "bg-emerald-100/80 border-emerald-400";

  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-500";
  const textTertiary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  const sidebarLinks = [
    { name: "Dashboard", path: "/", icon: <RiDashboardLine className="w-6 h-6" /> },
    { name: "Add Visa", path: "/add-visa", icon: <HiOutlineDocumentAdd className="w-6 h-6" /> },
    { name: "My Added Visas", path: "/my-added-visas", icon: <HiOutlineDocumentText className="w-6 h-6" /> },
    { name: "My Applications", path: "/my-visa-applications", icon: <HiOutlineClipboardList className="w-6 h-6" /> },
  ];

  return (
    <div className={`${containerClass} flex flex-col min-h-screen`}>
      {/* Header with theme toggle */}
      <header className={`flex items-center justify-between px-4 md:px-8 py-3 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <a href="/" className="flex items-center">
          <img 
            className="h-9" 
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" 
            alt="Company Logo" 
          />
          <span className={`ml-2 font-semibold text-lg hidden md:block ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Visa Portal
          </span>
        </a>
        
        <div className="flex items-center gap-4">
          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-amber-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          <p className={`${textSecondary} hidden sm:block`}>Hi! Admin</p>
          <button className={`flex items-center gap-1 border rounded-full text-sm px-4 py-1 ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'} transition-colors`}>
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
              <a 
                href={item.path} 
                key={index}
                className={`flex items-center py-3 px-4 gap-3 transition-colors
                  ${index === 0 
                    ? `border-r-4 md:border-r-[6px] ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-emerald-50 border-emerald-500 text-emerald-600'}`
                    : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'} border-transparent hover:text-gray-900`
                  }`}
              >
                {item.icon}
                <span className="md:block hidden font-medium">{item.name}</span>
              </a>
            ))}
          </nav>
          
          {/* Sidebar footer */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hidden md:block`}>
            <p className={`text-xs ${textTertiary}`}>Visa Portal v1.0.0</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className={`${cardClass} rounded-lg border shadow-sm p-6`}>
            <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Welcome to Visa Dashboard
            </h1>
            <p className={`${textSecondary} mt-2`}>
              Manage your visa applications and listings
            </p>
            
            {/* Quick Stats - styled like VisaDetails highlight section */}
            <div className={`${highlightClass} border rounded-lg p-6 mt-6 grid grid-cols-2 gap-4`}>
              <div className="flex items-center">
                <HiOutlineDocumentAdd className="text-emerald-500 mr-3 text-xl" />
                <div>
                  <h4 className="font-medium">Total Visas</h4>
                  <p className={textSecondary}>24</p>
                </div>
              </div>
              <div className="flex items-center">
                <HiOutlineClipboardList className="text-emerald-500 mr-3 text-xl" />
                <div>
                  <h4 className="font-medium">Applications</h4>
                  <p className={textSecondary}>156</p>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className="mt-8">
              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                Recent Activity
              </h2>
              <div className={`border rounded-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} p-4`}>
                <p className={textSecondary}>No recent activity</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;