import React from "react";
import { BrainCircuit, Users, LogOut } from "lucide-react";

const Sidebar = ({ onBack }: any) => {
  return (
    <div className="w-full md:w-64 bg-blue-900 text-white p-4 flex flex-col   min-h-screen">
      <div className="space-y-4">
        <a
          href="#"
          className="flex items-center space-x-2 text-white hover:text-blue-300"
        >
          <BrainCircuit className="w-5 h-5" />
          <span>Dementia Care</span>
        </a>
        <a
          onClick={onBack}
          href="#"
          className="flex items-center space-x-2 text-white hover:text-blue-300"
        >
          <Users className="w-5 h-5" />
          <span>My Patients</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 text-white hover:text-red-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
