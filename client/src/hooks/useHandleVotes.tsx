import { useState } from "react";

export function useHandleVotes() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //post votes
  //   const postVote = async (candidateName: string, category: string) => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/post-votes`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             candidateName,
  //             category,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to post vote.");
  //       }

  //       const data = await response.json();
  //       console.log(data.message);
  //     } catch (err) {
  //       console.error("Failed to post vote:", err);
  //       setError("Failed to post vote.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const postVote = async (selectedCandidates: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);

      const postRequests = Object.entries(selectedCandidates).map(
        ([category, candidateName]) =>
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/votes/post-votes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ candidateName, category }),
          })
      );

      await Promise.all(postRequests);

      console.log("Votes successfully submitted.");
    } catch (err) {
      console.error("Failed to post votes:", err);
      setError("Failed to post votes.");
    } finally {
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
    results,
    loading,
    error,
  };
}