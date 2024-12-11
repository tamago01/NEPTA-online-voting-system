import Dashboard from "@/components/Dashboard/Dashboard";
import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex relative">
      <div className="w-64 lg:w-96 lg:sticky lg:top-0 h-screen lg:overflow-y-auto bg-white">
        <Sidebar />
      </div>
      <div className="w-full flex-1">
        <Dashboard />
      </div>
    </div>
  );
};

export default page;
