import React, { useContext } from 'react';
import { FaThumbsUp, FaUserAlt, FaFlag, FaTrophy } from 'react-icons/fa';
import { ThemeContext } from "../provider/ThemeProvider";

const Success = () => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const isDark = theme === 'dark'; // Check if the current theme is dark

  return (
    <div className={`px-6 py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Section Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Our Success Story</h1>
        <p className="text-xl mt-4 font-semibold">Celebrating Achievements and Milestones</p>
        <p className="mt-4 text-sm md:text-base max-w-3xl mx-auto">
          We have worked tirelessly to achieve excellence, and we are proud to share our accomplishments with you. Each milestone represents dedication, teamwork, and passion for our mission.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-screen-lg mx-auto">
        
        {/* Card 1 */}
        <div className={`flex items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <FaUserAlt className={`text-8xl mr-6 ${isDark ? 'text-[#83CD20]' : 'text-[#83CD20]'}`} />
          <div>
            <h3 className="font-semibold text-2xl">200+ Team Members</h3>
            <p className="text-sm text-green-500 mt-2">Our talented and diverse team is the driving force behind every success, working together to achieve excellence across all projects.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`flex items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <FaThumbsUp className={`text-8xl mr-6 ${isDark ? 'text-[#83CD20]' : 'text-[#83CD20]'}`} />
          <div>
            <h3 className="font-semibold text-2xl">Client Satisfaction</h3>
            <p className="text-sm text-green-500 mt-2">Our clients consistently express their satisfaction with our services, thanks to our unwavering commitment to quality and innovation.</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className={`flex items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <FaFlag className={`text-8xl mr-6 ${isDark ? 'text-[#83CD20]' : 'text-[#83CD20]'}`} />
          <div>
            <h3 className="font-semibold text-2xl">Global Reach</h3>
            <p className="text-sm text-green-500 mt-2">Our services extend across continents, empowering individuals and organizations to achieve their goals, no matter where they are located.</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className={`flex items-center p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <FaTrophy className={`text-8xl mr-6 ${isDark ? 'text-[#83CD20]' : 'text-[#83CD20]'}`} />
          <div>
            <h3 className="font-semibold text-2xl">Award-Winning Services</h3>
            <p className="text-sm text-green-500 mt-2">We have received numerous accolades for our outstanding contributions to the industry, demonstrating our commitment to excellence and innovation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
