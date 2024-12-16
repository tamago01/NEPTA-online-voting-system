import Header from "@/components/Header/Header";
import Results from "@/components/Otp/Results";
import React from "react";

const page = () => {
  return (
    <div className=" relative">
      <div className="bg-slate-100  sticky top-0 w-full mx-auto">
        <Header />
      </div>

      <div className="w-full  lg:h-screen flex-1 justify-center items-center">
        <Results />
      </div>
    </div>
  );
};

export default page;
