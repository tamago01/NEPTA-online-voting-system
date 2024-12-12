import Dashboard from "@/components/Dashboard/Dashboard";
import Header from "@/components/Header/Header";
import React from "react";

const page = () => {

  return (
    <div className=" relative">
      <div className="bg-slate-100  sticky top-0 w-full mx-auto">
        <Header />
      </div>

      <div className="w-full flex-1">
        <Dashboard
         
        />
      </div>
    </div>
  );
};

export default page;
