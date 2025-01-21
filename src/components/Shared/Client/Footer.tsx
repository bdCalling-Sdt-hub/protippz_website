import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "@/Assets/logo.png";

const Footer = () => {
  return (
    <>
      <hr className="h-[4px] w-full bg-[#2FC191]" />
      <hr className="h-[4px] w-full -mt-[1px] bg-[#053697]" />
      <footer className="bg-white shadow-md mt-10">
        <div className="container mx-auto text-center flex justify-between items-center">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="PROTIPPZ" width={150} height={50} />
          </div>
          <div className="flex justify-center space-x-8 mb-6 text-blue-500">
            <Link href="/terms">
              <span className="hover:text-[#053697] cursor-pointer">Terms</span>
            </Link>
            <Link href="/privacy">
              <span className="hover:text-[#053697] cursor-pointer">
                Privacy
              </span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-[#053697] cursor-pointer">
                contact
              </span>
            </Link>
          </div>
        </div>
        <hr className="border-t border-blue-500 mb-6" />
        <div className="container mx-auto flex justify-between items-center pb-6">
          <p className="text-blue-500 text-sm">
            © 2024 PROTIPPZ. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 text-[#2FC191] ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl hover:text-[#55ddb0]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl hover:text-[#55ddb0]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl hover:text-[#55ddb0]" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-xl hover:text-[#55ddb0]" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
