import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronRight,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi"; // for the send/subscribe button icon
import FooterBg from "../assets/fotter-bg.png";
import FLogo from "../assets/Flogo.png";
const Footer = () => {
  return (
    <footer className="bg-[#034833] text-white py-16 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-100">
        <img
          src={FooterBg} // Replace with your image path
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      {/* <div className="flex justify-center gap-10 items-center"></div> */}

      <div className="relative container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div>
                <img src={FLogo} alt="" />
              </div>
              <h1 className="text-3xl font-extrabold">VisaPortal</h1>
            </div>
            <p className="text-sm mt-2">
              Corporate business typically refers to large-scale enterprises or
              organizations.
            </p>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div className="">
          <div className=" flex gap-10  md:gap-20">
            <div>
              <h2 className="text-lg font-bold mb-4">Services </h2>
              <ul className="text-sm">
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Mistakes To Avoid</a>
                </li>
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Your Startup</a>
                </li>
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Know About Fonts</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-4">Useful Links</h2>
              <ul className="text-sm">
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Latest News</a>
                </li>
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Careers</a>
                </li>
                <li className="flex items-center hover:text-green-400">
                  <FaChevronRight className="mr-2" />
                  <a href="#">Case Studies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Subscribe Our Newsletter</h2>
          <p className="text-sm mb-4">
            Corporate business typically refers to large-scale enterprises or
            organizations.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Email"
              className="px-4 py-2 w-full rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-r-md flex items-center">
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="relative mt-12 text-center text-sm border-t border-gray-300 border-opacity-30">
        <div className="mt-10">
          <p>&copy; Crypt0 2024 | All Rights Reserved</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-green-400">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-green-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-400">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
