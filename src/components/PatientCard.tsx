import React from "react";
import { ArrowRight } from "lucide-react";

interface PatientCardProps {
  name: string;
  image: string;
  entryCount: number;
  onClick: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ name, image, entryCount, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-gray-500">Entries: {entryCount}</div>
        </div>
      </div>
      <ArrowRight className="text-gray-400 w-5 h-5" />

      {/* <FaArrowRight className="text-gray-400" /> */}
    </div>
  );
};

export default PatientCard;