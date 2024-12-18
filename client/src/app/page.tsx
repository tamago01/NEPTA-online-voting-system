"use client";
import Login from "@/components/Auth/Login";
import { Banners } from "@/components/Constants/Photos";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token found:", token);

    if (!token) {
    } else {
      router.push("/dashboard"); // Redirect to login if no token found
      // Optional: Validate token with server
    }
  }, []);

  return (
    <>
      <div>
        <div className="bg-slate-100 sticky top-0 w-full z-10">
          <Header />
        </div>

        {/* <div className="relative w-full h-auto">
          <Image
            src={Banners["BannerImage"]}
            alt="Voters"
            className="h-[100vh] lg:h-[90vh] w-full object-cover shadow-lg"
            width={800}
            height={600}
          />

          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-black text-sm sm:text-base md:text-lg w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 py-3 rounded-lg font-semibold hover:bg-green-600">
            Voting Has Not Started Yet!
          </button>
        </div> */}
        <div className="relative w-full h-auto">
          <Login />
        </div>
      </div>
    </>
  );
}
