import { useState } from "react";

export function useHandleVotes() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postVote = async (selectedCandidates: any) => {
    const token = localStorage.getItem("authToken");
    console.log("s2", selectedCandidates);

    try {
      setLoading(true);
      setError(null);

      const postVote = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/post-votes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedCandidates),
        }
      );

      const data = await postVote.json();
      console.log(`data  in post vote`, data);

      // const postRequests =
      //    await  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/post-votes`, {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ candidateName, category }),
      //       credentials: "include",
      // );

      // const res = await Promise.all(postRequests);
      // console.log(
      //   "res",
      //   res.map((r) => r.json())
      // );
    } catch (err) {
      console.error("Failed to post votes:", err);
      setError("Failed to post votes.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (email: string) => {
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
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log("otpData", data);
    } catch (error) {
      console.error("Failed to send otp.");
      setLoading(false);
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

  return {
    postVote,
    getResults,
    sendOtp,
    results,
    loading,
    error,
  };
}
