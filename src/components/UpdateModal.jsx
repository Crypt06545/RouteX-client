import React, { useState, useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider"; // Import the theme context
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UpdateModal = ({ visa, closeModal }) => {
  const { theme } = useContext(ThemeContext); // Use the theme context here
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    countryName: visa?.countryName || "",
    countryImage: visa?.countryImage || "",
    visaType: visa?.visaType || "",
    processingTime: visa?.processingTime || "",
    fee: visa?.fee || "",
    validity: visa?.validity || "",
    applicationMethod: visa?.applicationMethod || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // updated data logic
  const handleSubmit = (e) => {
    e.preventDefault();

    const visaId = visa?._id;
    // console.log("Visa ID:", visaId);
    // console.log("Updated Information:", formData);

    // Confirm save changes using Swal
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform API call to update the visa
        fetch(`${import.meta.env.VITE_API_BASE_URL}/updatevisa/${visaId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount > 0) {
              Swal.fire(
                "Saved!",
                "Visa information has been updated successfully.",
                "success"
              ).then(() => {
                navigate("/all-visas");
              });
            } else {
              Swal.fire("Failed!", "No changes were made.", "error");
            }
            // console.log("API Response:", data);
          })
          .catch((error) => {
            console.error("Error updating visa:", error);
            Swal.fire("Error!", "Failed to update visa information.", "error");
          });

        // Close the modal after successful confirmation
        closeModal();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // Determine classes based on the current theme
  const modalBgColor = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const buttonBgColor = theme === "dark" ? "bg-blue-700" : "bg-blue-500";
  const cancelButtonBgColor = theme === "dark" ? "bg-gray-600" : "bg-gray-300";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full sm:w-[500px] p-6 rounded-lg shadow-lg transition-all duration-300 ${modalBgColor}`}
      >
        <h2 className={`text-2xl font-semibold mb-6 ${textColor} text-center`}>
          Update Visa Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Country Name
              </label>
              <input
                type="text"
                name="countryName"
                value={formData.countryName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Country Image URL
              </label>
              <input
                type="text"
                name="countryImage"
                value={formData.countryImage}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Visa Type
              </label>
              <select
                name="visaType"
                value={formData.visaType}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Tourist visa">Tourist Visa</option>
                <option value="Student visa">Student Visa</option>
                <option value="Official visa">Official Visa</option>
              </select>
            </div>
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Processing Time (Days)
              </label>
              <input
                type="number"
                name="processingTime"
                value={formData.processingTime}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Fee (USD)
              </label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className={`block font-medium mb-2 ${textColor}`}>
                Validity (Months)
              </label>
              <input
                type="number"
                name="validity"
                value={formData.validity}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className={`block font-medium mb-2 ${textColor}`}>
              Application Method
            </label>
            <input
              type="text"
              name="applicationMethod"
              value={formData.applicationMethod}
              onChange={handleChange}
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center space-x-4">
            <button
              type="button"
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium ${cancelButtonBgColor} hover:bg-gray-400`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium ${buttonBgColor} hover:bg-blue-600`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
