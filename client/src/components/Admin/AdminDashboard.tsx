"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"; // Replace with your Tabs component import if needed.
import Header from "../Header/Header";

type TimerProps = {
  startTimer: () => void;
};

const AdminDashboard = ({ startTimer }: TimerProps) => {
  const candidatesData = {
    president: [{ name: "Shamed Katila Shrestha", votes: 50 }],
    vicePresident: [
      { name: "Shyam Sundar Yadav", votes: 60 },
      { name: "Binaya Kandel", votes: 90 },
    ],
    vicePresidentFemale: [{ name: "Manju Gyawali", votes: 70 }],
    SecretaryGeneral: [{ name: "Subarna Thapa Chhetri", votes: 80 }],
    Secretary: [
      { name: "Bibek Ghimire", votes: 120 },
      { name: "Jyanendra Jha", votes: 100 },
    ],
    Treasurer: [
      { name: "Sujit Kumar Yadav", votes: 110 },
      { name: "Sujit Singh", votes: 130 },
    ],
    CoTreasurer: [
      { name: "Om Prakash Shah", votes: 110 },
      { name: "Ekina Khadka", votes: 130 },
    ],
    CommitteeMemberOpen: [
      { name: "Ujjwal Dotel", votes: 110 },
      { name: "UmaShankar Shah", votes: 140 },
      { name: "Saugat Shrestha", votes: 150 },
      { name: "Aashish Gho Shrestha", votes: 130 },
      { name: "Anup Acharya", votes: 10 },
      { name: "Bijaya Shrestha", votes: 0 },
      { name: "Dhiraj Shrestha", votes: 30 },
      { name: "Shaj Shrestha", votes: 50 },
      { name: "Sudip Dhital", votes: 80 },
      { name: "Tenzing Norbu Lama", votes: 13 },
    ],
    CommitteeMemberFemale: [{ name: "Srijana Luitel", votes: 110 }],
    CommitteeMemberMadheshi: [{ name: "Nabin Kumar Jaiswal", votes: 110 }],
    CommitteeMemberJanajati: [{ name: "Kaushal Das", votes: 110 }],
    NationalCommitteeMember: [
      { name: "Abhinash Lamsal", votes: 110 },
      { name: "Nabin Sapkota", votes: 10 },
      { name: "Dildip Khanal", votes: 11 },
      { name: "Jayaram Maharjan", votes: 0 },
      { name: "Sakuna Dani ", votes: 19 },
      { name: "Sujit Jha", votes: 0 },
    ],
  };

  return (
    <div>
      <Header />
      <h2 className="p-10 container mb-4 text-[24px] font-bold capitalize text-gray-700">
        Welcome to Admin Dashboard,
      </h2>
      <button
        onClick={startTimer}
        className="px-6 py-3 bg-red-400 border rounded-2xl ml-14 mb-4 text-[24px] font-medium capitalize text-gray-700"
      >
        Start the timer
      </button>
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
          <TabsContent value="Results">
            {Object.entries(candidatesData).map(([category, candidates]) => {
              const highestVotes = Math.max(...candidates.map((c) => c.votes));

              return (
                <div key={category} className="m-10">
                  <h3 className="mb-4 text-[20px] font-bold capitalize text-gray-700 border-b pb-2">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.name}
                        className={`flex justify-between items-center border-b py-2 ${
                          candidate.votes === highestVotes
                            ? "bg-red-100 border-red-500"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-[18px] font-semibold ${
                            candidate.votes === highestVotes
                              ? "text-red-600"
                              : "text-gray-700"
                          }`}
                        >
                          {candidate.name}
                        </span>
                        <span className="text-[18px] text-gray-900">
                          {candidate.votes} votes
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
          <TabsContent value="LiveCount">
            <div className="p-10">
              <h3 className="text-[20px] font-bold capitalize text-gray-700">
                Live Count Coming Soon...
              </h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
