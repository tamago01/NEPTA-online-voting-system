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
      router.push("/dashboard"); 
     
    }
  }, []);

  return (
    <>
      <div>
        <div className="bg-slate-100 sticky top-0 w-full z-10">
          <Header />
        </div>
        <div className="relative w-full  h-auto">
          <Login />
        </div>
      </div>
    </>
  );
}
