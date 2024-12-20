import { useState } from "react";
type VoteResponse = {
  message: string;
  data?: any;
  errorDetails?: string;
};
export function useHandleVotes() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<VoteResponse | null>(null);

  const postVote = async (votes: Record<string, string[]>) => {
    try {
      const Token = localStorage.getItem("authToken");
      console.log("Sending payload:", votes);
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/post-votes?nocache`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
          body: JSON.stringify({ votes }),
        }
      );

      const result = await res.json();
      console.log("Response from backend:", result);
      if (!res.ok) {
        throw new Error(result.message || "Failed to post votes.");
      }

      setResponse(result);
    } catch (err: any) {
      console.error("Error submitting votes:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (email: string, phone: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send OTP");
      }

      const data = await response.json();
      console.log("OTP sent successfully", data);
      return data;
    } catch (error) {
      console.error("Failed to send otp.", error);
      setError(error instanceof Error ? error.message : "Failed to send OTP");
      setLoading(false);
      throw error;
    }
  };

  const verifyOtp = async (otp: string, email: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed");
      }

      const data = await response.json();
      console.log("OTP verified successfully", data);
      return data;
    } catch (error) {
      console.error("Failed to verify otp.", error);
      setError(
        error instanceof Error ? error.message : "OTP verification failed"
      );
      setLoading(false);
      throw error;
    }
  };

  //get results
  const getResults = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/get-results`
      );

      if (!response.ok) {
        throw new Error("Failed to get results.");
      }

      const data = await response.json();

      setResults(data);
      return data;
    } catch (err) {
      console.error("Failed to get results from backend:", err);
      setResults([]);
      return [];
    }
  };

  const verifyStatus = async () => {
    console.log("Verifying status...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/verify-status`
      );

      if (!response.ok) {
        throw new Error("Failed to verify.");
      }

      const data = await response.json();

      setResults(data);
      return data;
    } catch (err) {
      console.error("Failed to get results from backend:", err);
    }
  };

  return {
    postVote,
    getResults,
    sendOtp,
    verifyOtp,
    verifyStatus,
    response,
    results,
    loading,
    error,
  };
}
