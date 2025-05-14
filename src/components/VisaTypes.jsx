import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { FaUserGraduate, FaSuitcase, FaGlobe, FaPassport } from "react-icons/fa"; // Added FaPassport

const VisaTypes = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const card = theme === "dark"
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-white hover:bg-gray-100";
  const iconColor = theme === "dark" ? "text-emerald-400" : "text-emerald-600";

  const types = [
    { name: "Student Visa", icon: <FaUserGraduate /> },
    { name: "Business Visa", icon: <FaSuitcase /> },
    { name: "Tourist Visa", icon: <FaGlobe /> },
    { name: "Official Visa", icon: <FaPassport /> }, // ✅ New Official Visa
  ];

  return (
    <section className={`py-16 px-4 ${bg}`}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Visa Types We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {types.map((t, idx) => (
            <div key={idx} className={`p-6 rounded-xl shadow-md transition duration-300 ${card}`}>
              <div className={`text-4xl flex justify-center mb-3 mx-auto ${iconColor}`}>{t.icon}</div>
              <h4 className="font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaTypes;
