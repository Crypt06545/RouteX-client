import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ApplyModal = ({ visaDetails }) => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
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

  const [applyData, setApplyData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    fee: visaDetails?.fee || "",
    selectedDate: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplyData({ ...applyData, [name]: value });
  };

  const handleDateChange = (date) => {
    setApplyData({ ...applyData, selectedDate: date });
  };
  const handleOpenModal = () => {
    if (!user) {
      toast.warn("You should login first!");
      navigate("/login");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById("my_modal_5").showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = format(applyData.selectedDate, "dd-MM-yyyy hh:mm a");
    const applyDate = formattedDate;

    const finalApplyData = {
      email: applyData.email,
      firstName: applyData.firstName,
      lastName: applyData.lastName,
      fee: applyData.fee,
      applyDate,
      visaDetails: visaDetails,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/applyvisa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalApplyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Applied Successfully!",
            text: "The apply data has been added successfully.",
          });
          document.getElementById("my_modal_5").close();
          navigate('/dashboard/my-visa-applications')
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: "Please try again.",
          });
        }
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again later.",
        });
      });
  };

  return (
    <div>
      <button
        className={`${buttonClass} px-6 py-2 mt-4 rounded-full font-semibold`}
        onClick={handleOpenModal}
      >
        Apply for the visa
      </button>

      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle ${modalClass}`}
      >
        <div className="modal-box shadow-lg rounded-lg max-w-md w-full p-6">
          <h3 className="font-bold text-2xl mb-4">Apply for Visa</h3>
          <p className="mb-6">
            Fill in your details to apply for the visa. Make sure all
            information is correct.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                defaultValue={applyData.email}
                id="email"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                defaultValue={applyData.firstName}
                id="firstName"
                placeholder="Enter your first name"
                className={inputClass}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                defaultValue={applyData.lastName}
                id="lastName"
                placeholder="Enter your last name"
                className={inputClass}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="fee">
                Fee
              </label>
              <input
                type="number"
                name="fee"
                defaultValue={applyData.fee}
                id="fee"
                className={inputClass}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm" htmlFor="date">
                Select Date
              </label>
              <DatePicker
                selected={applyData.selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="dd-MM-yyyy hh:mm a"
                className={inputClass}
              />
            </div>

            <div className="modal-action flex justify-between items-center mt-6">
              <button
                type="submit"
                className={`${buttonClass} px-6 py-2 rounded-lg`}
              >
                Submit
              </button>
              <button
                type="button"
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
