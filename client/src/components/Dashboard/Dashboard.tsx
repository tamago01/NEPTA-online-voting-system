"use client";
import Image from "next/image";
import React, { useState } from "react";
import OtpModal from "../Otp/OtpModal";

type CandidateCategories = {
  president: string;
  vicePresident: string;
  treasurer: string;
  secretary: string;
  generalMember: string;
};

const Dashboard = () => {
  const [selectedCandidates, setSelectedCandidates] =
    useState<CandidateCategories>({
      president: "",
      vicePresident: "",
      treasurer: "",
      secretary: "",
      generalMember: "",
    });

  const handleSelect = (
    category: keyof CandidateCategories,
    candidate: string
  ) => {
    setSelectedCandidates((prev) => ({ ...prev, [category]: candidate }));
  };

  const handleSubmit = () => {
    console.log("Selected Candidates:", selectedCandidates);
    setIsModalOpen(true);
  };

  const candidates: Record<keyof CandidateCategories, string[]> = {
    president: ["Candidate A", "Candidate B"],
    vicePresident: ["Candidate C", "Candidate D"],
    treasurer: ["Candidate E", "Candidate F"],
    secretary: [
      "Candidate 1",
      "Candidate 2",
      "Candidate 3",
      "Candidate 4",
      "Candidate 5",
      "Candidate 6",
      "Candidate 7",
      "Candidate 8",
      "Candidate 9",
      "Candidate 10",
    ],
    generalMember: ["Candidate I", "Candidate J"],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-12 ld:px-24 py-10 mx-auto">
      <div className=" mb-14 w-full border-b py-3 border-gray-700">
        <label className=" text-[24px] font-bold capitalize text-gray-700">
          <a className="text-green-400">Welcome,</a> to the 52th election of
          NEPTA
        </label>
      </div>
      {Object.entries(candidates).map(([category, names]) => (
        <div key={category} className="mb-10">
          <div className="border-l-4 border-red-400 px-6">
            <h2 className=" mb-4 text-[24px] font-bold capitalize text-gray-700">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            {names.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-100 ${
                  selectedCandidates[category as keyof CandidateCategories] ===
                  name
                    ? "bg-blue-200"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={category}
                  value={name}
                  checked={
                    selectedCandidates[
                      category as keyof CandidateCategories
                    ] === name
                  }
                  onChange={() =>
                    handleSelect(category as keyof CandidateCategories, name)
                  }
                  className="w-5 h-5"
                />
                <div className="lg:flex items-center gap-4">
                  <Image
                    src="/images/user.png"
                    alt="user"
                    width={200}
                    height={200}
                    className="h-16 w-16 rounded-full object-contain"
                  />
                  <div>
                    <p className="text-[20px] font-semibold text-gray-800">
                      {name}
                    </p>
                    <p className="text-gray-600">Description about {name}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-14 py-3 bg-green-500 text-white text-lg font-bold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Vote
        </button>
      </div>
      <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
