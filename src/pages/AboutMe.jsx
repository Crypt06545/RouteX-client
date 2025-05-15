import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";

const AboutMe = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const labelColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const inputBg =
    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800";

  return (
    <div className={`${bgColor} p-6 rounded-md shadow-md max-w-xl mx-auto`}>
      <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>About Me</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={
            user?.photoURL ||
            "https://i.pinimg.com/736x/21/cb/d6/21cbd6c7efa053011d8d03b67dbea45d.jpg"
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500"
        />
        <p className={`text-lg font-semibold ${textColor}`}>
          {user?.displayName || "Guest"}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm mb-1 ${labelColor}`}>Email</label>
          <input
            type="email"
            value={user?.email || "No Email"}
            disabled
            className={`w-full px-4 py-2 rounded-md ${inputBg} cursor-not-allowed`}
          />
        </div>
        <div>
          <label className={`block text-sm mb-1 ${labelColor}`}>
            Display Name
          </label>
          <input
            type="text"
            value={user?.displayName || "Guest"}
            disabled
            className={`w-full px-4 py-2 rounded-md ${inputBg} cursor-not-allowed`}
          />
        </div>

        <button
          disabled
          className="mt-6 w-full py-2 bg-emerald-400 text-white rounded-md font-medium opacity-50 cursor-not-allowed"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
