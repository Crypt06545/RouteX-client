import { useContext } from "react";
import "animate.css";
import { ThemeContext } from "../provider/ThemeProvider";

// React Icons
import { FaUserGraduate, FaBolt, FaPhone, FaGlobe, FaShieldAlt, FaClock, FaHandshake, FaFileAlt, FaPassport, FaGlobeAmericas, FaRegSmile } from "react-icons/fa";

const WhyChooseUs = () => {
  const { theme } = useContext(ThemeContext);

  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const cardClass =
    theme === "dark"
      ? "bg-gray-800 hover:bg-gray-700"
      : "bg-white hover:bg-gray-100";
  const iconColor = theme === "dark" ? "text-emerald-400" : "text-emerald-600";

  const features = [
    {
      title: "Expert Guidance",
      description:
        "Our visa consultants ensure that you receive the most accurate and updated advice for every country.",
      icon: <FaUserGraduate />,
    },
    {
      title: "Fast Processing",
      description:
        "We streamline your application process and provide regular updates for complete peace of mind.",
      icon: <FaBolt />,
    },
    {
      title: "24/7 Support",
      description:
        "Reach us anytime via chat, email, or phone. We are here to help you every step of the way.",
      icon: <FaPhone />,
    },
    {
      title: "Trusted Worldwide",
      description:
        "Our success stories span across continents. Thousands have reached their destinations with us.",
      icon: <FaGlobe />,
    },
  ];

  return (
    <div className={`py-16 px-4 md:px-12 ${containerClass}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 animate__animated animate__fadeInDown">
          Why Choose Us
        </h2>
        <p className="text-lg mb-12 animate__animated animate__fadeInUp text-green-500 max-w-2xl mx-auto">
          Discover what makes us the preferred choice for visa services around the globe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`p-6 text-center rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1 animate__animated animate__fadeInUp ${cardClass}`}
            >
              <div className={`text-5xl flex justify-center mb-4 ${iconColor}`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-green-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
