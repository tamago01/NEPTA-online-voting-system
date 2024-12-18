"use client";
import { useHandleVotes } from "@/hooks/useHandleVotes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { candidatePhotos } from "../Constants/Photos";
import OtpModal from "../Otp/OtpModal";
import { useTimer } from "@/app/context/TimeProvider";
import { useRouter } from "next/navigation";

type CandidateCategories = {
  President: string[];
  VicePresident: string[];
  VicePresidentFemale: string[];
  SecretaryGeneral: string[];
  Secretary: string[];
  Treasurer: string[];
  CoTreasurer: string[];
  CommitteeMemberOpen: string[];
  CommitteeMemberFemale: string[];
  CommitteeMemberMadheshi: string[];
  CommitteeMemberJanajati: string[];
  NationalCommitteeMember: string[];
};

const defaultValues: Record<keyof CandidateCategories, string[]> = {
  President: [],
  VicePresident: [],
  VicePresidentFemale: [],
  SecretaryGeneral: [],
  Secretary: [],
  Treasurer: [],
  CoTreasurer: [],
  CommitteeMemberOpen: [],
  CommitteeMemberFemale: [],
  CommitteeMemberMadheshi: [],
  CommitteeMemberJanajati: [],
  NationalCommitteeMember: [],
};

export const candidates: CandidateCategories = {
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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postVote, sendOtp, verifyOtp } = useHandleVotes();
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const { timerValue, startTimer, showBackdrop } = useTimer();
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      console.log("Token found:", token);
    }
  }, []);

  useEffect(() => {
    const userSaved = localStorage.getItem("user");
    // const storedAuthToken = localStorage.getItem("authToken");

    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<keyof CandidateCategories, string[]>
  >(() => {
    const initialState = { ...defaultValues };
    Object.entries(candidates).forEach(([category, names]) => {
      if (names.length === 1) {
        initialState[category as keyof CandidateCategories] = [names[0]];
      }
    });
    return initialState;
  });

  const handleCheckboxChange = (
    category: keyof CandidateCategories,
    candidate: string
  ) => {
    setSelectedCandidates((prev) => {
      if (
        category === "CommitteeMemberOpen" ||
        category === "NationalCommitteeMember"
      ) {
        const currentSelected = prev[category];
        const isCurrentlySelected = currentSelected.includes(candidate);

        if (isCurrentlySelected) {
          return {
            ...prev,
            [category]: currentSelected.filter((name) => name !== candidate),
          };
        }

        if (currentSelected.length < 5) {
          return {
            ...prev,
            [category]: [...currentSelected, candidate],
          };
        }

        return {
          ...prev,
          [category]: [...currentSelected.slice(1), candidate],
        };
      }

      if (candidates[category].length > 1) {
        const currentSelected = prev[category];
        const isCurrentlySelected = currentSelected.includes(candidate);

        if (isCurrentlySelected) {
          return {
            ...prev,
            [category]: [],
          };
        }

        return {
          ...prev,
          [category]: [candidate],
        };
      }

      return prev;
    });
  };

  console.log("user", user);
  const handleSendOtp = async () => {
    if (!user?.email) {
      setOtpError("No user email found");
      return;
    }

    try {
      setIsOtpSending(true);
      setOtpError(null);

      await sendOtp(user?.email);

      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to send OTP", err);
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setIsOtpSending(false);
    }
  };

  // In OTP Verification
  const handleSubmit = async () => {
    if (!user?.email) {
      setOtpError("No user email found");
      return;
    }

    try {
      setIsLoading(true);
      await verifyOtp(otp, user?.email);

      await postVote(selectedCandidates);

      setIsModalOpen(false);
      router.push("/results");
    } catch (err) {
      console.error("Verification failed", err);
      setOtpError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  if (user?.hasVoted ?? false) {
    return (
      <p className="text-center font-bold mx-14 text-lg md:text-2xl bg-green-200 rounded-lg p-6 md:mx-48 mt-20 shadow-lg">
        Your vote has been recorded. Thank you!!!
      </p>
    );
  }
  return (
    <div className="max-sm:px-6 md:px-12 lg:mt- lg:px-24 py-10 mx-auto">
      {/* {!showBackdrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg">
          {timerValue > 0 ? (
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">
                {user?.email === "test@gmail.com" && (
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
      )} */}
      <div className="md:px-10 mb-14 w-full border-b py-3 border-gray-300">
        <label className=" max-sm:text-[14px] md:text-[24px] font-bold  text-gray-700">
          <a className="text-green-400">Welcome,</a> to the NEPTA election of
          2024
        </label>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendOtp();
        }}
        className="space-y-6"
      >
        {Object.entries(candidates).map(([category, names]) => (
          <div key={category} className="mb-10 lg:px-10">
            <div className="border-l-4 border-red-400 px-6">
              <h2 className="mb-4 text-[18px] md:text-[24px] font-bold capitalize text-gray-700">
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {names.map((name) => {
                const isDisabled = names.length <= 1;
                const isSelected =
                  selectedCandidates[
                    category as keyof CandidateCategories
                  ].includes(name);

                return (
                  <label
                    key={name}
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors duration-200 
              ${
                isDisabled
                  ? "bg-blue-200 cursor-not-allowed"
                  : "hover:bg-blue-100"
              }
              ${isSelected ? "bg-blue-200" : ""}`}
                  >
                    <input
                      type="checkbox"
                      value={name}
                      disabled={isDisabled}
                      checked={isSelected}
                      onChange={() =>
                        !isDisabled &&
                        handleCheckboxChange(
                          category as keyof CandidateCategories,
                          name
                        )
                      }
                      className={`w-5 h-5 ${
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    />
                    <Image
                      priority
                      src={candidatePhotos[name] || "/images/user.png"}
                      alt={name}
                      unoptimized={false}
                      width={600}
                      height={600}
                      className="h-24 w-24 lg:h-48 lg:w-48 rounded-full object-cover"
                    />
                    <div className="lg:flex items-center gap-4">
                      <div>
                        <p
                          className={`max-sm:text-[14px] mdtext-[20px] font-semibold ${
                            isDisabled ? "text-gray-500" : "text-gray-800"
                          }`}
                        >
                          {name}
                        </p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-center py-14">
          <button
            type="submit"
            disabled={isOtpSending}
            className={`px-4 w-48 py-3 text-white text-lg font-bold rounded-lg flex items-center justify-center transition duration-200 ${
              isOtpSending
                ? "bg-green-400 opacity-50 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isOtpSending ? (
              <div className="flex items-center space-x-2">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-6 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="animate-pulse">Sending OTP...</span>
              </div>
            ) : (
              "Vote Now"
            )}
          </button>
          {otpError && <p className="text-red-500 mt-2 text-sm">{otpError}</p>}
        </div>
      </form>
      <OtpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        data={otp}
        setData={setOtp}
        error={otpError}
        setError={setOtpError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dashboard;
