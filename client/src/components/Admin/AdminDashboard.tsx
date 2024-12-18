"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Header from "../Header/Header";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import { useRouter } from "next/navigation";

interface Candidate {
  name: string;
  voteCount: number;
}

interface CategoryData {
  _id: string;
  candidates: Candidate[];
}

const AdminDashboard = () => {
  const [results, setResults] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const { getResults } = useHandleVotes();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token found:", token);

    if (!token) {
      router.push("/"); // Redirect to login if no token found
    } else {
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      if (!user || user.email !== "admin@admin.com") {
        router.push("/dashboard");
      }
      // Optional: Validate token with server
    }
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await getResults();
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results.");
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gatherWinnersData = () => {
    return results.map((category) => {
      const sortedCandidates = category.candidates.sort(
        (a, b) => b.voteCount - a.voteCount
      );
      const winner = sortedCandidates[0];
      return {
        category: category._id.replace(/([A-Z])/g, " $1").trim(),
        winnerName: winner.name,
        votes: winner.voteCount,
      };
    });
  };
  const handlePublish = () => {
    setLoading(true);
    const winnersData = gatherWinnersData();

    try {
      localStorage.setItem("winnersSnapshot", JSON.stringify(winnersData));
      setIsPublished(true);
    } catch (err) {
      console.error("Failed to publish snapshot", err);
      setIsPublished(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <h2 className="p-10 container mb-4 text-[24px] font-bold capitalize text-gray-700">
        Welcome to Admin Dashboard
      </h2>

      <div className="border rounded-lg p-5 bg-white shadow-md mx-16">
        <Tabs defaultValue="Results">
          <TabsList className="ml-10">
            <TabsTrigger
              className="px-14 py-3 data-[state=active]:bg-green-400"
              value="Results"
            >
              Results
            </TabsTrigger>
            <TabsTrigger
              className="px-14 py-3 data-[state=active]:bg-green-400"
              value="LiveCount"
            >
              Live Count
            </TabsTrigger>
          </TabsList>

          <TabsContent value="LiveCount">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              results?.map((category) => {
                const sortedCandidates = category.candidates.sort(
                  (a, b) => b.voteCount - a.voteCount
                );

                const highestVote = sortedCandidates[0]?.voteCount;
                return (
                  <div key={category._id} className="m-10">
                    <h3 className="mb-4 text-[20px] font-bold capitalize text-gray-700 border-b pb-2">
                      {category._id.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {category.candidates.map((candidate) => (
                        <div
                          key={candidate.name}
                          className={`flex justify-between items-center border-b py-2 px-6 rounded-lg ${
                            candidate.voteCount === highestVote
                              ? "bg-green-200"
                              : ""
                          }`}
                        >
                          <span className="text-[18px] font-semibold text-gray-700">
                            {candidate.name}
                          </span>
                          <span
                            className={`text-[18px] ${
                              candidate.voteCount === highestVote
                                ? "text-red-600 font-bold"
                                : "text-gray-900"
                            }`}
                          >
                            {candidate.voteCount} votes
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="Results">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="m-10 bg-gray-100 rounded-lg p-5 shadow-md">
                <h3 className="mb-4 text-[20px] font-bold capitalize text-gray-700">
                  Winners Across All Categories
                </h3>

                {results.map((category) => {
                  const sortedCandidates = category.candidates.sort(
                    (a, b) => b.voteCount - a.voteCount
                  );
                  const winner = sortedCandidates[0];

                  return (
                    <div
                      key={category._id}
                      className="flex justify-between items-center mt-2  border-b border-black px-6 py-4"
                    >
                      <span className="font-semibold text-gray-800 text-[18px]">
                        {category._id.replace(/([A-Z])/g, " $1").trim()}:{" "}
                        <div> {winner.name} </div>
                      </span>

                      <span className="font-bold text-red-600 text-[18px]">
                        {winner.voteCount} votes
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            {isPublished ? (
              <p className="p-4 ml-10 my-10 border w-max bg-green-200 cursor-disabled rounded-lg text-green-500 font-bold">
                📤 Data Sent Successfully!
              </p>
            ) : (
              <div
                onClick={handlePublish}
                className="bg-green-200 w-max ml-10 my-10 cursor-pointer rounded-lg p-4 mt-10 text-center"
              >
                <span className="font-semibold">Publish </span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
