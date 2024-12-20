"use client";
import { useAuth } from "@/hooks/useAuth";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import Image from "next/image";
import React, { useState } from "react";
import banner from "../../images/banner.jpg";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, success } = useAuth();
  const { verifyStatus } = useHandleVotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await verifyStatus();
    if (data.data.votingStarted) {
      await login(email, password);
    } else {
      Swal.fire({
        title: "Nepta",
        text: data.data.message,
        icon: "info", // Options: 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: "OK",
        customClass: {
          popup: "responsive-dialog",
        },
      });
    }
    console.log("verifyStatus", data.data.votingStarted);
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center w-full">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={banner}
          alt="banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-4 py-8 md:px-8">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-lg md:text-2xl font-bold text-center mb-6">
              Login to begin voting
            </h2>

            <div className="mb-4">
              <div className="flex items-center gap-2 border bg-white px-3 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path
                    fill="gray"
                    d="M11.98 20v-1h6.405q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5h-6.403V4h6.404q.69 0 1.152.463T20 5.616v12.769q0 .69-.463 1.153T18.385 20zm-.71-4.461l-.703-.72l2.32-2.319H4.019v-1h8.868l-2.32-2.32l.702-.718L14.808 12z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Write your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 focus:outline-none rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 border bg-white px-3 rounded">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="gray"
                    d="M18 11.0041C17.4166 9.91704 16.273 9.15775 14.9519 9.0993C13.477 9.03404 11.9788 9 10.329 9C8.67911 9 7.18091 9.03404 5.70604 9.0993C3.95328 9.17685 2.51295 10.4881 2.27882 12.1618C2.12602 13.2541 2 14.3734 2 15.5134C2 16.6534 2.12602 17.7727 2.27882 18.865C2.51295 20.5387 3.95328 21.8499 5.70604 21.9275C6.42013 21.9591 7.26041 21.9834 8 22"
                  ></path>
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    stroke="gray"
                    d="M6 9V6.5C6 4.01472 8.01472 2 10.5 2C12.9853 2 15 4.01472 15 6.5V9"
                  ></path>
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 focus:outline-none rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-lg font-bold text-white p-3 rounded flex items-center justify-center transition duration-200 ${
                loading
                  ? "bg-green-400 opacity-50 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 animate-spin text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="animate-pulse">Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 font-bold mt-4 text-center">
              Login successful!
            </p>
          )}

          {/* <div className="mt-6 text-center text-sm text-gray-600">
            Need an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-600 underline"
            >
              Create one
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
