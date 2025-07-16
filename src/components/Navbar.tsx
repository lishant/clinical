// import React from "react";

// const Navbar = () => {
//   return (
//     <header className="bg-white shadow-md w-full px-4 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Patient Dashboard</h1>
//     </header>
//   );
// };

// export default Navbar;
import React from "react";
import { ArrowLeft } from "lucide-react";
interface Navbarprops {
  title : string;
  onBack : () => void;
}
const Navbar: React.FC<Navbarprops> = ({ title, onBack}) => {
  return (
    <header className="bg-white shadow-md w-full px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Navbar;