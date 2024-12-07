import React, { useContext } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLocationArrow,
  FaPaperPlane,
} from "react-icons/fa";
import { ThemeContext } from "../provider/ThemeProvider";
import "animate.css";

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={`py-20 ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form Section */}
        <div
          className={`animate__animated animate__backInLeft p-6 rounded-lg shadow-lg ${
            isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          }`}
        >
          <h2 className=" text-2xl font-bold mb-6">Contact Us</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full p-3 mt-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  } border-gray-300`}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold">
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className={`w-full p-3 mt-2 border rounded-lg ${
                    isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  } border-gray-300`}
                  placeholder="Enter your phone"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold">
                Your Address
              </label>
              <input
                type="text"
                id="address"
                className={`w-full p-3 mt-2 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                } border-gray-300`}
                placeholder="Enter your address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold">
                Your Message
              </label>
              <textarea
                id="message"
                className={`w-full p-3 mt-2 border rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                } border-gray-300`}
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 ${
                isDark ? "bg-[#83CD20] text-white" : "bg-[#83CD20] text-black"
              }`}
            >
              <FaPaperPlane
                className={`text-xl ${isDark ? "text-white" : "text-black"}`}
              />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Contact Information Section */}
        <div
          className={`animate__animated animate__backInRight p-6 rounded-lg ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Message Us</h2>
          <h3 className="text-lg font-semibold mb-4">
            Voyages of Wonder of Exploring Unknown
          </h3>
          <p className="mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="flex items-center mb-4">
            <FaEnvelope
              className={`mr-2 text-xl ${
                isDark ? "text-[#83CD20]" : "text-[#83CD20]"
              }`}
            />
            <span>info@voyagesofwonder.com</span>
          </div>

          <div className="flex items-center mb-4">
            <FaPhone
              className={`mr-2 text-xl ${
                isDark ? "text-[#83CD20]" : "text-[#83CD20]"
              }`}
            />
            <span>+123 456 7890</span>
          </div>

          <div className="flex items-center mb-4">
            <FaLocationArrow
              className={`mr-2 text-xl ${
                isDark ? "text-[#83CD20]" : "text-[#83CD20]"
              }`}
            />
            <span>123 Wonder St, Adventure City</span>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Request a Call</h4>
            <p className="text-sm mb-4">Open Hours: 9:00 AM - 6:00 PM</p>
            <p className="text-sm">Location: Adventure City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
