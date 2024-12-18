"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface WinnerData {
  category: string;
  winnerName: string;
  votes: number;
}

const Results = () => {
  const [winnersData, setWinnersData] = useState<WinnerData[]>([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    } else {
      console.log("Token found:", token);
      // Optional: Validate token with server
    }
  }, []);

  useEffect(() => {
    const snapshot = localStorage.getItem("winnersSnapshot");
    if (snapshot) {
      setWinnersData(JSON.parse(snapshot));
    }
  }, []);

  return (
    <div className="p-10 flex justify-center items-center w-full">
      {winnersData.length > 0 ? (
        <div className="md:p-10 p-5 border border-black rounded-lg max-w-4xl w-full">
          <h2 className="mb-6 text-3xl font-bold capitalize text-gray-700 text-center">
            Winners Across All Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {winnersData.map((winner) => (
              <div
                key={winner.category}
                className="p-6 bg-gray-100 rounded-lg shadow-md"
              >
                <span className="font-bold text-gray-800 text-lg">
                  {winner.category}
                </span>
                <div className="mt-2 text-gray-700">
                  Winner: {winner.winnerName}
                </div>
                <span className="mt-2 block text-red-500 font-semibold">
                  {winner.votes} votes
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center font-bold mt-10 text-2xl bg-green-200 rounded-lg p-6 shadow-lg">
          Your vote has been recorded. Thank you!!!
        </p>
      )}
    </div>
  );
};

export default Results;
