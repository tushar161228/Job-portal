import React from "react";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-10">
      <div className="py-5 text-center">
        <div className="flex justify-center items-center gap-5 mb-3">
          <FaGithub className="w-5 h-5 cursor-pointer hover:text-[#6A38C2]" />
          <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-[#6A38C2]" />
          <FaInstagram className="w-5 h-5 cursor-pointer hover:text-[#6A38C2]" />
        </div>

        <p className="text-sm text-gray-500">© 2026 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
