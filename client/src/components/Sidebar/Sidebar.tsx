"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  console.log("data", user);

  return (
    <>
      <div className="h-full pt-14 mx-auto bg-white shadow-md ">
        <Link href="/">
          <div className="mb-8 flex justify-center border-b">
            <Image
              src="/images/nepta.png"
              alt="Logo"
              height={50}
              width={180}
              className="object-contain"
            />
          </div>
        </Link>
        <nav className="space-y-2">
          {user ? (
            <button
              onClick={logout}
              className="group flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-green-400 hover:text-white cursor-pointer w-full text-left"
            >
              <Image
                unoptimized
                src="/icons/login.svg"
                alt=" "
                height={24}
                width={24}
                className="group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-black group-hover:text-white font-medium text-lg whitespace-nowrap">
                Logout
              </span>
            </button>
          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-green-400 hover:text-white cursor-pointer"
            >
              <Image
                unoptimized
                src="/icons/login.svg"
                alt=""
                height={24}
                width={24}
                className="group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-black group-hover:text-white font-medium text-lg whitespace-nowrap">
                Login/Register
              </span>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
