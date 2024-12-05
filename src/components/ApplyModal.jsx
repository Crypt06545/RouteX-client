import React, { useContext, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; 

const ApplyModal = ({ visaDetails }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get the current theme

  const modalClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const buttonClass =
    theme === "dark"
      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
      : "bg-emerald-600 hover:bg-emerald-700 text-white";
  const inputClass =
    theme === "dark"
      ? "input input-bordered w-full px-4 py-2 mt-2 rounded-lg border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      : "input input-bordered w-full px-4 py-2 mt-2 rounded-lg border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-emerald-500";

  // State for date selection
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = format(selectedDate, "dd-MM-yyyy hh:mm a");
    // Log the formatted date and time when submit is clicked
    console.log("Selected Date and Time: ", formattedDate);
  };

  return (
    <div>
      {/* Apply Now Button */}
      <button
        className={`${buttonClass} px-6 py-2 mt-4 rounded-full font-semibold`}
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Apply Now
      </button>

      {/* Modal */}
      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle ${modalClass}`}
      >
        <div className="modal-box shadow-lg rounded-lg max-w-md w-full p-6">
          {/* Modal Header */}
          <h3 className="font-bold text-2xl mb-4">Apply for Visa</h3>
          <p className="mb-6">
            Fill in your details to apply for the visa. Make sure all the
            information is correct before submitting.
          </p>

          {/* Form Inputs */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                id="email"
                placeholder="Enter your email"
                className={inputClass}
                required
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block text-sm" htmlFor="fee">
                Fee
              </label>
              <input
                type="number"
                id="fee"
                defaultValue={visaDetails?.fee}
                className={inputClass}
                required
                readOnly
              />
            </div>

            {/* Date and Time Picker */}
            <div>
              <label className="block text-sm" htmlFor="date">
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)} 
                showTimeSelect
                dateFormat="dd-MM-yyyy hh:mm a" 
                className={inputClass} 
              />
            </div>

            {/* Modal Action Buttons */}
            <div className="modal-action flex justify-between items-center mt-6">
              <button type="submit" className={`${buttonClass} px-6 py-2 rounded-lg`}>
                Submit
              </button>
              <button
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ApplyModal;
