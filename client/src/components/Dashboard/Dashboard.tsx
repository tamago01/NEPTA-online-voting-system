"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OtpModal from "../Otp/OtpModal";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import { candidatePhotos } from "../Constants/Photos";
import { useTimer } from "@/app/context/TimeProvider";
type CandidateCategories = {
  President: string;
  VicePresident: string;
  VicePresidentFemale: string;
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
  const [user, setUser] = useState<any>(null);
  const { sendOtp } = useHandleVotes();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const userSaved = localStorage.getItem("user");
    const storedAuthToken = localStorage.getItem("authToken");

    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  const [selectedCandidates, setSelectedCandidates] = useState<{
    [key in keyof CandidateCategories]: string;
  }>({
    President: "",
    VicePresident: "",
    VicePresidentFemale: "",
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

  useEffect(() => {
    const newSelectedCandidates = { ...selectedCandidates };

    Object.entries(candidates).forEach(([category, names]) => {
      if (names.length === 1) {
        newSelectedCandidates[category as keyof CandidateCategories] = names[0];
      }
    });

    setSelectedCandidates(newSelectedCandidates);
  }, []);

  const handleSelect = (
    category: keyof CandidateCategories,
    candidate: string
  ) => {
    setSelectedCandidates((prev) => {
      const currentValue = prev[category];
      let updatedValue;

      if (
        category === "CommitteeMemberOpen" ||
        category === "NationalCommitteeMember"
      ) {
        const currentSelection = currentValue ? currentValue.split(",") : [];
        if (currentSelection.includes(candidate)) {
          // Remove candidate if already selected
          updatedValue = currentSelection
            .filter((c) => c !== candidate)
            .join(",");
        } else if (currentSelection.length < 5) {
          // Add candidate if under limit
          updatedValue = [...currentSelection, candidate].join(",");
        } else {
          // No update if limit exceeded
          updatedValue = currentValue;
        }
      } else {
        updatedValue = currentValue === candidate ? "" : candidate;
      }

      return {
        ...prev,
        [category]: updatedValue,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("user", user);
    console.log("authToken", authToken);
    setIsModalOpen(true);
    await sendOtp(user.email);
  };

  const candidates: Record<keyof CandidateCategories, string[]> = {
    President: ["Shamed Katila Shrestha"],
    VicePresident: ["Shyam Sundar Yadav", "Binaya Kandel"],
    VicePresidentFemale: ["Manju Gyawali"],
    SecretaryGeneral: ["Subarna Thapa Chhetri"],
    Secretary: ["Bibek Ghimire", "Jyanendra Jha"],
    Treasurer: ["Sujit Yadav", "Sujeet Singh"],
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
      "Sakuna Dani",
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

  if (user?.hasVoted) {
    return (
      <p className="text-center font-bold mt-10 text-2xl bg-green-200 rounded-lg p-16 mx-32 shadow-lg">
        Your vote has been recorded. Thank you!!!
      </p>
    );
  }
  return (
    <div className="px-12 lg:mt- ld:px-24 py-10 mx-auto">
      {Object.entries(candidates).map(([category, names]) => (
        <div key={category} className="mb-10 lg:px-10">
          <div className="border-l-4 border-red-400 px-6">
            <h2 className=" mb-4 text-[24px] font-bold capitalize text-gray-700">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {names.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-100 ${
                  selectedCandidates[category as keyof CandidateCategories]
                    ?.split(",")
                    .includes(name)
                    ? "bg-blue-200"
                    : ""
                }`}
              >
                <input
                  type={
                    category === "CommitteeMemberOpen" ||
                    category === "NationalCommitteeMember"
                      ? "checkbox"
                      : "radio"
                  }
                  name={category}
                  value={name}
                  checked={selectedCandidates[
                    category as keyof CandidateCategories
                  ]
                    ?.split(",")
                    .includes(name)}
                  onChange={() =>
                    handleSelect(category as keyof CandidateCategories, name)
                  }
                  className="w-5 h-5 cursor-pointer"
                />
                <div className="flex items-center gap-4">
                  <Image
                    src={candidatePhotos[name]?.src || "/default-image.jpg"} // Fallback to default image if not found
                    alt={name}
                    width={600}
                    height={600}
                    className="h-24 w-24 lg:h-48 lg:w-48 rounded-full object-cover"
                  />
                  <p className="text-[20px] font-semibold text-gray-800">
                    {name}
                  </p>
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
      <OtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCandidates={selectedCandidates}
      />
    </div>
  );
};

export default Dashboard;
