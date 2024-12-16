"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Header from "../Header/Header";
import { useHandleVotes } from "@/hooks/useHandleVotes";

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

  const { getResults } = useHandleVotes();

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
              value="LiveCount"
            >
              Results
            </TabsTrigger>
            <TabsTrigger
              className="px-14 py-3 data-[state=active]:bg-green-400"
              value="Results"
            >
              Live Count
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Results">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              results?.map((category) => {
                const highestVote = Math.max(
                  ...category.candidates.map((candidate) => candidate.voteCount)
                );

                return (
                  <div key={category._id} className="m-10">
                    <h3 className="mb-4 text-[20px] font-bold capitalize text-gray-700 border-b pb-2">
                      {category._id.replace(/([A-Z])/g, " $1").trim()}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {category.candidates.map((candidate) => (
                        <div
                          key={candidate.name}
                          className={`flex justify-between items-center border-b py-2 ${
                            candidate.voteCount === highestVote
                              ? "bg-red-200"
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

          <TabsContent value="LiveCount">
            <div className="p-10">
              <h3 className="text-[20px] font-bold capitalize text-gray-700">
                Results Coming Soon...
              </h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
