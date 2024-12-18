import React from "react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  data: string;
  setData: (otp: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
}

const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  data,
  setData,
  error,
  setError,
  isLoading,
}) => {
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (/^\d*$/.test(value) && value.length <= 6) {
      setData(value);
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please check your email and enter the 6-digit OTP
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={data}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit OTP"
            className={`w-full p-3 border rounded-lg ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
