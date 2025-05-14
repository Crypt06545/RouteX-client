import Loader from "../components/Loader";
import 'animate.css';
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import { MdDelete, MdUpdate } from "react-icons/md";
import UpdateModal from "../components/UpdateModal";
import Swal from "sweetalert2";

const MyAddedVisa = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const email = user?.email;

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_BASE_URL}/addedvisas/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisas(data);
          setLoading(false); 
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoading(false);
        });
    }
  }, [email]);

  const handleUpdate = (visa) => {
    setSelectedVisa(visa);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // Delete visa logic
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/addedvisadelete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setVisas((prevVisas) =>
                prevVisas.filter((visa) => visa._id !== id)
              );
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the Visa.",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const handleModalClose = () => {
    setSelectedVisa(null);
  };

  const cardBgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const buttonUpdateColor =
    theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-900";
  const buttonDeleteColor =
    theme === "dark" ? "bg-red-700 text-white" : "bg-red-200 text-red-900";

  return (
<div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} p-5`}>
  <h1 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
    My Added Visas
  </h1>

  {loading ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : visas.length === 0 ? (
    <div className="text-center text-red-500 text-lg font-medium">No Data Found</div>
  ) : (
    <div className="overflow-x-auto animate__animated animate__fadeIn">
      <table className={`table w-full rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <thead className={`${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>
          <tr className="text-sm uppercase tracking-wider">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Country</th>
            <th className="py-3 px-4">Fee</th>
            <th className="py-3 px-4">Validity (Months)</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {visas.map((visa, index) => (
            <tr key={visa._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition`}>
              <td className="py-3 px-4 font-medium">{index + 1}</td>
              <td className="py-3 px-4">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-lg border border-gray-300">
                    <img src={visa.countryImage} alt={visa.countryName} />
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 font-semibold">{visa.countryName}</td>
              <td className="py-3 px-4 font-bold">${visa.fee}</td>
              <td className="py-3 px-4 font-medium">{visa.validity || 'N/A'}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2 justify-center flex-wrap">
                  <button
                    className={`px-3 py-1 rounded-md flex items-center gap-1 font-semibold shadow-sm hover:shadow-md transition duration-200 ${theme === "dark" ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-900"}`}
                    onClick={() => handleUpdate(visa)}
                  >
                    <MdUpdate /> Update
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md flex items-center gap-1 font-semibold shadow-sm hover:shadow-md transition duration-200 ${theme === "dark" ? "bg-red-700 text-white" : "bg-red-200 text-red-900"}`}
                    onClick={() => handleDelete(visa._id)}
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {selectedVisa && <UpdateModal visa={selectedVisa} closeModal={handleModalClose} />}
</div>



  );
};

export default MyAddedVisa;
