import React, { useState, useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateModal = ({ visa, closeModal }) => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    countryName: visa?.countryName || "",
    countryImage: visa?.countryImage || "",
    visaType: visa?.visaType || "",
    processingTime: visa?.processingTime || "",
    fee: visa?.fee || "",
    validity: visa?.validity || "",
    description: visa?.description || "",
    applicationMethod: visa?.applicationMethod || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const visaId = visa?._id;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/updatevisa/${visaId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.matchedCount > 0) {
              Swal.fire("Saved!", "Visa information has been updated.", "success").then(() => {
                navigate("/all-visas");
              });
            } else {
              Swal.fire("Failed!", "No changes were made.", "error");
            }
          })
          .catch((error) => {
            console.error("Error updating visa:", error);
            Swal.fire("Error!", "Failed to update visa information.", "error");
          });
        closeModal();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  // Theme-based styling
  const modalBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const inputBorder = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const btnPrimary = theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600";
  const btnCancel = theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4 py-6">
      <div className={`w-full max-w-3xl rounded-xl shadow-xl overflow-y-auto max-h-[95vh] ${modalBg} p-6 transition-all duration-300`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${textColor}`}>Update Visa Information</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grid Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Country Name</label>
              <input
                type="text"
                name="countryName"
                value={formData.countryName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              />
            </div>
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Country Image URL</label>
              <input
                type="text"
                name="countryImage"
                value={formData.countryImage}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              />
            </div>
          </div>

          {/* Grid Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Visa Type</label>
              <select
                name="visaType"
                value={formData.visaType}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              >
                <option value="Tourist visa">Tourist Visa</option>
                <option value="Student visa">Student Visa</option>
                <option value="Official visa">Official Visa</option>
              </select>
            </div>
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Processing Time (Days)</label>
              <input
                type="number"
                name="processingTime"
                value={formData.processingTime}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              />
            </div>
          </div>

          {/* Grid Section 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Fee (USD)</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              />
            </div>
            <div>
              <label className={`block mb-1 font-medium ${textColor}`}>Validity (Months)</label>
              <input
                type="number"
                name="validity"
                value={formData.validity}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={`block mb-1 font-medium ${textColor}`}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
            ></textarea>
          </div>

          {/* Application Method */}
          <div>
            <label className={`block mb-1 font-medium ${textColor}`}>Application Method</label>
            <input
              type="text"
              name="applicationMethod"
              value={formData.applicationMethod}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${inputBorder}`}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className={`w-full sm:w-auto px-5 py-2 rounded-md font-semibold ${btnCancel} transition`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-auto px-5 py-2 rounded-md font-semibold text-white ${btnPrimary} transition`}
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
