"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <>
      <div className="w-full flex justify-between mx-auto border-b py-3 px-8 bg-gradient-to-r from-white via-green-100 to-green-300 shadow-sm">
        <Link href="/" className="ml-10">
          <Image
            src="/images/nepta.png"
            alt="Logo"
            height={50}
            width={80}
            className="object-contain rounded-full"
          />
        </Link>

        <div className="flex items-center p-4 relative">
          <Image
            src="/images/user.png"
            alt="user"
            width={200}
            height={200}
            className="h-10 w-16 rounded-full object-contain"
          />
          <div className="flex items-center gap-2">
            <label className="font-semibold">John Doe</label>

            <button
              onClick={toggleDropdown}
              className="relative flex items-center focus:outline-none"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-14 right-3 bg-white border-x rounded-md">
                <div className="flex items-center hover:bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="gray hover:bg-green-100"
                      d="M11.98 20v-1h6.405q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-6.403V4h6.404q.69 0 1.152.463T20 5.616v12.769q0 .69-.463 1.153T18.385 20zm-.71-4.461l-.703-.72l2.32-2.319H4.019v-1h8.868l-2.32-2.32l.702-.718L14.808 12z"
                    />
                  </svg>
                  <button
                    onClick={logout}
                    className="block w-full px-2 py-2 text-left text-black hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
