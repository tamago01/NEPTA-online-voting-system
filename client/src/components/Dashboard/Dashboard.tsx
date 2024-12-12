"use client";
import Image from "next/image";
import React, { useState } from "react";
import OtpModal from "../Otp/OtpModal";
import { useTimer } from "@/app/layout";

type CandidateCategories = {
  president: string;
  vicePresident: string;
  vicePresidentFemale: string;
  SecretaryGeneral: string;
  Secretary: string;
  Treasurer: string;
  CoTreasurer: string;
  CommitteeMemberOpen: string;
  CommitteeMemberFemale: string;
  CommitteeMemberMadheshi: string;
  CommitteeMemberJanajati: string;
  NationalCommitteeMember: string;
};

const Dashboard = () => {
  const { isTimerActive, timerValue, startTimer } = useTimer();
  const [selectedCandidates, setSelectedCandidates] = useState({
    president: "",
    vicePresident: "",
    vicePresidentFemale: "",
    SecretaryGeneral: "",
    Secretary: "",
    Treasurer: "",
    CoTreasurer: "",
    CommitteeMemberOpen: "",
    CommitteeMemberFemale: "",
    CommitteeMemberMadheshi: "",
    CommitteeMemberJanajati: "",
    NationalCommitteeMember: "",
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
    president: ["Shamed Katila Shrestha"],
    vicePresident: ["Shyam Sundar Yadav", "Binaya Kandel"],
    vicePresidentFemale: ["Manju Gyawali"],
    SecretaryGeneral: ["Subarna Thapa Chhetri"],
    Secretary: ["Bibek Ghimire", "Jyanendra Jha"],
    Treasurer: ["Sujit Kumar Yadav", "Sujit Singh"],
    CoTreasurer: ["Om Prakash Shah", "Ekina Khadka"],
    CommitteeMemberOpen: [
      "Ujjwal Dotel",
      "UmaShankar Shah",
      "Saugat Shrestha",
      "Aashish Gho Shrestha",
      "Anup Acharya",
      "Bijaya Shrestha",
      "Dhiraj Shrestha",
      "Shaj Shrestha",
      "Sudip Dhital",
      "Tenzing Norbu Lama",
    ],
    CommitteeMemberFemale: ["Srijana Luitel"],
    CommitteeMemberMadheshi: ["Nabin Kumar Jaiswal"],
    CommitteeMemberJanajati: ["Kaushal Das"],
    NationalCommitteeMember: [
      "Abhinash Lamsal",
      "Nabin Sapkota",
      "Dildip Khanal",
      "Jayaram Maharjan",
      "Sakuna Dani ",
      "Sujit Jha",
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="px-12 lg:mt- ld:px-24 py-10 mx-auto">
      {!isTimerActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">
              {" "}
              <button onClick={startTimer}>test</button>
              Vote starts in {formatTime(timerValue)}
            </h1>
            <p className="text-lg">Please wait...</p>
          </div>
        </div>
      )}
      <>
        <div className=" mb-14 w-full border-b py-3 border-gray-700">
          <label className=" text-[24px] font-bold capitalize text-gray-700">
            <a className="text-green-400">Welcome,</a> to the 52th election of
            NEPTA
          </label>{" "}
          Vote starts in {formatTime(timerValue)}
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
                    selectedCandidates[
                      category as keyof CandidateCategories
                    ] === name
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
            Vote Now
          </button>
        </div>
        <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    </div>
  );
};

export default Dashboard;
