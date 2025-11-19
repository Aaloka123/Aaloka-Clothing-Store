import { Search } from "lucide-react";
import logo from "../assets/logo.svg";

const TopBar = () => {
  return (
    <div className="px-20">
      <div className="flex justify-between items-center py-[15px] font-blastula">
        <div>
          <p className="font-bold text-xl ">
            aaloka
            <br />
            <span className="font-poppins font-normal">clothing store</span>
          </p>
        </div>

        <img src={logo} alt="Logo" />

        <div className="relative w-64">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-secondaray focus:outline-none"
            placeholder="Search"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
