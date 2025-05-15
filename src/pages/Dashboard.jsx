import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { FaPassport, FaFolderOpen, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [visaApplications, setVisaApplications] = useState([]);
  const [allVisas,setAllVisas] = useState([])
  const [visas,setVisas] = useState([])
  const [loading, setLoading] = useState(true);

  const email = user?.email;

  // visa application 
  useEffect(() => {
    if (email) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/myvisas/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisaApplications(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoading(false);
        });
    }
  }, [email]);

  // all visas
  useEffect(() => {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/allvisas`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setAllVisas(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, []);

  // my adeed visa
   useEffect(() => {
      if (email) {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/addedvisas/${email}`)
          .then((res) => res.json())
          .then((data) => {
            setVisas(data);
            // console.log(data);
            
            setLoading(false); 
          })
          .catch((err) => {
            console.error("Error fetching data:", err);
            setLoading(false);
          });
      }
    }, [email]);

  const cardStyle =
    theme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-900";

  const iconBg =
    theme === "dark"
      ? "bg-gray-700 text-emerald-400"
      : "bg-blue-100 text-blue-600";

  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <div className={`min-h-screen p-6 ${containerBg}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome to the Dashboard
      </h2>

      {loading ? (
        <Loader/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* All Visa Count */}
          <div className={`flex flex-col justify-center items-center rounded-xl p-6 shadow-md ${cardStyle} transition duration-300`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${iconBg}`}>
              <FaPassport size={28} />
            </div>
            <h3 className="text-3xl font-bold mb-1">{allVisas.length || 0}</h3>
            <p className="text-lg font-semibold mb-2">All Visa</p>
            <p className="text-green-600 text-center">
              View total number of available visa types and applications.
            </p>
          </div>

          {/* My Visa Applications */}
          <div className={`flex flex-col justify-center items-center rounded-xl p-6 shadow-md ${cardStyle} transition duration-300`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${iconBg}`}>
              <FaFolderOpen size={28} />
            </div>
            <h3 className="text-3xl font-bold mb-1">{visaApplications.length || 0}</h3>
            <p className="text-lg font-semibold mb-2">My Visa Applications</p>
            <p className="text-green-600 text-center">
              Track and manage your personal visa application history.
            </p>
          </div>

          {/* Existing Visas */}
          <div className={`flex flex-col justify-center items-center rounded-xl p-6 shadow-md ${cardStyle} transition duration-300`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${iconBg}`}>
              <FaCheckCircle size={28} />
            </div>
            <h3 className="text-3xl font-bold mb-1">{visas.length || 0}</h3>
            <p className="text-lg font-semibold mb-2">MY Added Visas</p>
            <p className="text-green-600 text-center">
              View visas you currently added.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
