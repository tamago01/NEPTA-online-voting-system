"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth"; // Adjust the import path as needed

const Header = () => {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // This code will only run on the client-side
    const userSaved = localStorage.getItem("user");
    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="w-full flex justify-between items-center mx-auto border-b py-3 px-4 bg-gradient-to-r from-white via-green-100 to-green-300 shadow-sm">
      <Link href="/" className="ml-10">
        <Image
          src="/images/nepta.png"
          alt="Logo"
          height={50}
          width={80}
          className="object-contain rounded-full"
        />
      </Link>

      {/* User Section */}
      <div className="flex items-center p-4 relative">
        {user ? (
          <>
            {/* User Icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 15 15"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z" />
            </svg>

            <div className="ml-2 text-sm md:text-lg font-semibold">
              {user?.email}
            </div>

            {/* Dropdown */}
            <button onClick={toggleDropdown} className="ml-2 p-2">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-14 right-2 bg-white rounded-lg shadow-md p-2">
                <button
                  onClick={logout}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <span className="text-black font-semibold hover:text-green-500 mt-2 md:mt-0">
              Login
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
