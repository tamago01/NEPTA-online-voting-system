"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Header from "../Header/Header";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import { useRouter } from "next/navigation";
import { candidatePhotos } from "../Constants/Photos";
import Image from "next/image";

interface Candidate {
  name: string;
  voteCount: number;
}

interface CategoryData {
  _id: string;
  candidates: Candidate[];
}

const categoryNames: Record<string, string> = {
  president: "President",
  vicepresident: "Vice President",
  vicepresidentfemale: "Vice President Female",
  secretarygeneral: "Secretary General",
  secretary: "Secretary",
  treasurer: "Treasurer",
  cotreasurer: "Co Treasurer",
  committeememberopen: "Committee Member Open",
  committeememberfemale: "Committee Member Female",
  committeemembermadheshi: "Committee Member Madheshi",
  committeememberjanajati: "Committee Member Janajati",
  nationalcommitteemember: "National Committee Member",
};

const hiddenVoteCountCategories = [
  "president",
  "vicepresidentfemale",
  "secretarygeneral",
  "committeememberfemale",
  "committeemembermadheshi",
  "committeememberjanajati",
];

const AdminDashboard = () => {
  const [results, setResults] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const { getResults } = useHandleVotes();
  const router = useRouter();
  const categoryOrder = [
    "president",
    "vicepresident",
    "vicepresidentfemale",
    "secretarygeneral",
    "secretary",
    "treasurer",
    "cotreasurer",
    "committeememberopen",
    "committeememberfemale",
    "committeemembermadheshi",
    "committeememberjanajati",
    "nationalcommitteemember",
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token found:", token);

    if (!token) {
      router.push("/");
    } else {
      const user = JSON.parse(localStorage.getItem("user") ?? "");
      if (!user || user.email !== "admin@admin.com") {
        router.push("/dashboard");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await getResults();

        const categoryMap = data.reduce((map: any, category: any) => {
          map[category._id] = category;
          return map;
        }, {} as Record<string, CategoryData>);

        const orderedResults = categoryOrder
          .map((id) => categoryMap[id])
          .filter(Boolean);

        setResults(orderedResults);
      } catch (err) {
        setError("Failed to fetch results.");
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);
  const multiSelectCategories = [
    "committeememberopen",
    "nationalcommitteemember",
  ];

  const gatherWinnersData = () => {
    return results.map((category) => {
      const sortedCandidates = [...category.candidates].sort(
        (a, b) => b.voteCount - a.voteCount
      );

      if (multiSelectCategories.includes(category._id.toLowerCase())) {
        const topCandidates = sortedCandidates.slice(0, 5);
        return {
          category: categoryNames[category._id] || category._id,
          winners: topCandidates.map((candidate) => ({
            name: candidate.name,
            votes: candidate.voteCount,
          })),
        };
      } else {
        const winner = sortedCandidates[0];
        return {
          category: categoryNames[category._id] || category._id,
          winnerName: winner.name,
          votes: winner.voteCount,
        };
      }
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4">
        <h2 className="px-6 py-10 text-xl sm:text-2xl font-bold text-gray-700 ">
          <a className="font-bold text-green-500 italic ">Welcome,</a> to the
          Admin Dashboard
        </h2>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="Results">
            <TabsList className="flex flex-wrap justify-center p-4 items-center">
              <TabsTrigger
                className="px-4 py-2 border text-sm sm:text-base data-[state=active]:bg-green-400 rounded-md transition-colors"
                value="Results"
              >
                Results
              </TabsTrigger>
              <TabsTrigger
                className="px-4 py-2 border text-sm sm:text-base data-[state=active]:bg-green-400 rounded-md transition-colors"
                value="LiveCount"
              >
                Live Count
              </TabsTrigger>
            </TabsList>

            <TabsContent value="LiveCount" className="p-4">
              {results?.map((category) => {
                const sortedCandidates = [...category.candidates].sort(
                  (a, b) => b.voteCount - a.voteCount
                );
                const topFiveVotes = sortedCandidates
                  .slice(0, 5)
                  .map((c) => c.voteCount);

                return (
                  <div key={category._id} className="mb-6">
                    <h3 className="mb-4 text-lg font-bold text-gray-700 border-b pb-2">
                      {categoryNames[category._id] || category._id}
                    </h3>
                    <div className="space-y-2">
                      {multiSelectCategories.includes(
                        category._id.toLowerCase()
                      )
                        ? sortedCandidates.map((candidate) => {
                            const isTopFive = topFiveVotes.includes(
                              candidate.voteCount
                            );

                            return (
                              <div
                                key={candidate.name}
                                className={`flex flex-col sm:flex-row justify-between md:items-center p-3 rounded-lg ${
                                  isTopFive ? "bg-green-100" : "bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center gap-4 sm:gap-10">
                                  <Image
                                    src={
                                      candidatePhotos[candidate?.name] ||
                                      "/images/user.png"
                                    }
                                    alt={candidate.name}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                                  />
                                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                                    {candidate.name}
                                  </span>
                                </div>
                                <span
                                  className={`max-sm:text-right text-base ${
                                    isTopFive
                                      ? "text-red-600 font-bold"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {candidate.voteCount} votes
                                </span>
                              </div>
                            );
                          })
                        : sortedCandidates.map((candidate) => (
                            <div
                              key={candidate.name}
                              className={`flex flex-col sm:flex-row justify-between md:items-center p-3 rounded-lg ${
                                candidate.voteCount ===
                                sortedCandidates[0].voteCount
                                  ? "bg-green-100"
                                  : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-4 sm:gap-10">
                                <Image
                                  src={
                                    candidatePhotos[candidate?.name] ||
                                    "/images/user.png"
                                  }
                                  alt={candidate.name}
                                  width={100}
                                  height={100}
                                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                                />
                                <span className="text-base sm:text-lg font-semibold text-gray-700">
                                  {candidate.name}
                                </span>
                              </div>
                              <span
                                className={`max-sm:text-right text-base ${
                                  candidate.voteCount ===
                                  sortedCandidates[0].voteCount
                                    ? "text-red-600 font-bold"
                                    : "text-gray-900"
                                }`}
                              >
                                {candidate.name === "Shamed Katila Shrestha" ||
                                candidate.name === "Manju Gyawali" ||
                                candidate.name === "Subarna Thapa Chhetri" ||
                                candidate.name === "Srijana Luitel" ||
                                candidate.name === "Nabin Kumar Jaiswal" ||
                                candidate.name === "Kaushal Das"
                                  ? (candidate.voteCount = 0)
                                  : ""}
                                {candidate.voteCount} votes
                              </span>
                            </div>
                          ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="Results" className="p-4">
              <div className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h3 className="mb-4 text-lg font-bold text-gray-700">
                  Winners Across All Categories
                </h3>

                <div className="space-y-2">
                  {results.map((category) => {
                    const sortedCandidates = [...category.candidates].sort(
                      (a, b) => b.voteCount - a.voteCount
                    );
                    const topFiveVotes = sortedCandidates
                      .slice(0, 5)
                      .map((c) => c.voteCount);

                    return (
                      <div key={category._id} className="mb-6">
                        <h3 className="mb-4 text-lg font-bold text-gray-700 border-b pb-2">
                          {categoryNames[category._id] || category._id}
                        </h3>
                        <div className="space-y-2">
                          {multiSelectCategories.includes(
                            category._id.toLowerCase()
                          ) ? (
                            sortedCandidates.map((candidate) => {
                              const isTopFive = topFiveVotes.includes(
                                candidate.voteCount
                              );

                              return (
                                <div
                                  key={candidate.name}
                                  className={`flex flex-col sm:flex-row justify-between md:items-center p-3 rounded-lg ${
                                    isTopFive ? "bg-green-100" : "bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-4 sm:gap-10">
                                    <Image
                                      src={
                                        candidatePhotos[candidate?.name] ||
                                        "/images/user.png"
                                      }
                                      alt={candidate.name}
                                      width={100}
                                      height={100}
                                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full"
                                    />
                                    <span className="text-base sm:text-lg font-semibold text-gray-700">
                                      {candidate.name}
                                    </span>
                                  </div>
                                  {hiddenVoteCountCategories.includes(
                                    category._id.toLowerCase()
                                  ) && (
                                    <span
                                      className={`max-sm:text-right text-base ${
                                        isTopFive
                                          ? "text-red-600 font-bold"
                                          : "text-gray-900"
                                      }`}
                                    >
                                      {candidate.voteCount} votes
                                    </span>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div
                              key={sortedCandidates[0].name}
                              className="flex flex-col sm:flex-row justify-between items-center p-3 border-b last:border-b-0 bg-white rounded-lg"
                            >
                              <div className="flex items-center gap-4 sm:gap-10">
                                <Image
                                  src={
                                    candidatePhotos[sortedCandidates[0].name] ||
                                    "/images/user.png"
                                  }
                                  alt={sortedCandidates[0].name}
                                  width={100}
                                  height={100}
                                  className="max-[320px]:w-48 w-24 md:w-36 h-24 object-cover rounded-full"
                                />
                                <span className="font-semibold text-gray-800 text-xs md:text-lg">
                                  {categoryNames[category._id] || category._id}:{" "}
                                  <span className="">
                                    {sortedCandidates[0].name}
                                  </span>
                                </span>
                              </div>
                              {category.candidates.length > 1 ? (
                                <div className="w-full flex flex-col items-end ">
                                  <span className=" font-bold text-red-600 text-sm md:text-lg  underline">
                                    Winner
                                  </span>
                                  <span className="font-bold text-red-600 text-sm md:text-lg ">
                                    {sortedCandidates[0].voteCount} votes
                                  </span>
                                </div>
                              ) : (
                                <span className="w-full text-right font-bold text-red-600 text-sm md:text-lg underline">
                                  Winner
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

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
    </div>
  );
};

export default AdminDashboard;
