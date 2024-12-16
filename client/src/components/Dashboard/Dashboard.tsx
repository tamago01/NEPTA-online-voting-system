"use client";
import Image from "next/image";
import React, { useState } from "react";
import OtpModal from "../Otp/OtpModal";
import { useTimer } from "@/app/layout";
import { useAuth } from "@/hooks/useAuth";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import { candidatePhotos } from "../Constants/Photos";

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
  const { timerValue, startTimer, showBackdrop } = useTimer();
  const { user } = useAuth();
  const { postVote } = useHandleVotes();

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

  // const candidatePhotoMap = {
  //   Shamed: shamed,
  //   Shyam: shyam,
  //   Binaya: "/images/binaya.jpg",
  //   Manju: manju,
  //   Subarna: "/images/subarna.jpg",
  //   Bibek: "/images/bibek.jpg",
  //   Jyanendra: "/images/jyanendra.jpg",
  //   Sujityadav: "/images/sujityadav.jpg",
  //   Sujeet: "/images/sujeet.jpg",
  //   Om: "/images/om.jpg",
  //   Ekina: "/images/ekina.jpg",
  //   Ujjwal: "/images/ujjwal.jpg",
  //   UmaShankar: "/images/umashankar.jpg",
  //   Saugat: "/images/saugat.jpg",
  //   Aashish: "/images/ashish.jpg",
  //   Anup: "/images/anup.jpg",
  //   Bijaya: "/images/bijaya.jpg",
  //   Dhiraj: "/images/dhiraj.jpg",
  //   Shaj: "/images/shaj.jpg",
  //   Sudip: "/images/sudip.jpg",
  //   Tenzing: "/images/tenzing.jpg",
  //   Srijana: "/images/srijana.jpg",
  //   NabinJaiswal: "/images/nabinj.png",
  //   Kaushal: "/images/kaushal.jpg",
  //   Abhinash: "/images/abhinash.jpeg",
  //   NabinSapkota: "/images/nabinsapkota.jpeg",
  //   Dildip: "/images/dildip.jpg",
  //   Jayaram: "/images/jayaram.jpg",
  //   Sakuna: "/images/sakuna.jpeg",
  //   SujitJha: "/images/sujitjha.jpeg",
  // };
  // const getCandidatePhoto = (name: string) => {
  //   return "/images/sujitjha.jpg"; // temporary test
  // };
  // const getCandidatePhoto = (name: string) => {
  //   const firstName = name.split(" ")[0];
  //   return candidatePhotoMap[firstName];
  // };

  const handleSelect = (
    category: keyof CandidateCategories,
    candidate: string
  ) => {
    setSelectedCandidates((prev) => ({ ...prev, [category]: candidate }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postVote(selectedCandidates);
    setIsModalOpen(true);
  };

  const candidates: Record<keyof CandidateCategories, string[]> = {
    president: ["Shamed Katila Shrestha"],
    vicePresident: ["Shyam Sundar Yadav", "Binaya Kandel"],
    vicePresidentFemale: ["Manju Gyawali"],
    SecretaryGeneral: ["Subarna Thapa Chhetri"],
    Secretary: ["Bibek Ghimire", "Jyanendra Jha"],
    Treasurer: ["Sujit Kumar Yadav", "Sujeet Singh"],
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
      {!showBackdrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          {timerValue > 0 ? (
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">
                {user?.email === "tamangjake@gmail.com" && (
                  <button
                    onClick={startTimer}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded mb-4"
                  >
                    Start Vote
                  </button>
                )}
              </h1>
              <div>Vote starts in {formatTime(timerValue)}</div>
              <p className="text-lg">Please wait...</p>
            </div>
          ) : (
            ""
          )}
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
                  {/* {candidatePhotos?.map((item: any, index: number) => ( */}
                  <Image
                    priority
                    src={
                      candidatePhotos[name.split(" ")[0]] || "/images/user.png"
                    }
                    alt={name}
                    unoptimized={false}
                    width={600}
                    height={600}
                    className="h-48 w-48 rounded-full object-cover"
                    // onError={(e) => {
                    //   (e.target as HTMLImageElement).src = "/images/user.png";
                    // }}
                  />
                  {/* ))} */}
                  <div className="lg:flex items-center gap-4">
                    <div>
                      <p className="text-[20px] font-semibold text-gray-800">
                        {name}
                      </p>
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
