"use client";

import { useState } from "react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtpModal = ({ isOpen, onClose }: OtpModalProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP Entered:", otp);
    alert(`OTP Submitted: ${otp}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2 rounded mt-2 focus:outline-gray-700 focus:caret-green-500"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Submit OTP
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;