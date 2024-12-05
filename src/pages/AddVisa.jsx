import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { ThemeContext } from "../provider/ThemeProvider";

const AddVisa = () => {
  const { theme } = useContext(ThemeContext);
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist Visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisaData({ ...visaData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setVisaData((prevData) => ({
        ...prevData,
        requiredDocuments: [...prevData.requiredDocuments, value],
      }));
    } else {
      setVisaData((prevData) => ({
        ...prevData,
        requiredDocuments: prevData.requiredDocuments.filter(
          (doc) => doc !== value
        ),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the data to the console
    // console.log(visaData);


    
    // Reset the form data
    setVisaData({
      countryImage: "",
      countryName: "",
      visaType: "Tourist Visa",
      processingTime: "",
      requiredDocuments: [],
      description: "",
      ageRestriction: "",
      fee: "",
      validity: "",
      applicationMethod: "",
    });

    // Optionally show a success message
    Swal.fire({
      icon: "success",
      title: "Visa Added Successfully!",
      text: "The visa data has been Added",
    });
  };

  const formBgClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const inputBgClass =
    theme === "dark"
      ? "bg-gray-700 border-gray-600"
      : "bg-gray-100 border-gray-300";

  return (
    <div
      className={`my-20 max-w-4xl mx-auto p-8 shadow-lg rounded-lg  ${formBgClass}`}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Add a New Visa</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">
              Country Image (URL)
            </label>
            <input
              type="text"
              name="countryImage"
              value={visaData.countryImage}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Country Name</label>
            <input
              type="text"
              name="countryName"
              value={visaData.countryName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Visa Type</label>
            <select
              name="visaType"
              value={visaData.visaType}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
            >
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Official Visa">Official Visa</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Processing Time (days)
            </label>
            <input
              type="number"
              name="processingTime"
              value={visaData.processingTime}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Required Documents</label>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Valid passport"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Valid Passport
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Visa application form"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Visa Application Form
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="Recent passport-sized photograph"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Recent Passport-sized Photograph
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={visaData.description}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Age Restriction</label>
            <input
              type="number"
              name="ageRestriction"
              value={visaData.ageRestriction}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Fee (USD)</label>
            <input
              type="number"
              name="fee"
              value={visaData.fee}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Validity</label>
            <input
              type="number"
              name="validity"
              value={visaData.validity}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Application Method</label>
            <input
              type="text"
              name="applicationMethod"
              value={visaData.applicationMethod}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inputBgClass}`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
