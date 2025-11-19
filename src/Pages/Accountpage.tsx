import React from "react";
import { NavLink } from "react-router-dom";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import { X } from "lucide-react";

const Accountpage = () => {
  return (
    <div className="bg-secondaray">
      <div className="flex justify-end items-start p-5 mt">
        <NavLink to="/Home">
          <X className="cursor-pointer" />
        </NavLink>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="font-blastula text-[40px] text-center mb-[20px]">
            LOG IN
          </p>

          <p className="mb-[50px]">
            New to this site?{" "}
            <NavLink
              to="/Signup"
              className="underline text-red-600 hover:text-red-800"
            >
              Signup
            </NavLink>
          </p>

          <div>
            <p className="flex items-center gap-[20px] border-[1px] w-[450px] h-[55px] p-2 cursor-pointer hover:bg-gray-100 transition-all duration-200">
              <img src={google} className="h-6 w-6 ml-4" />
              Log in with Google
            </p>
          </div>

          <div>
            <p className="flex items-center gap-[20px]  w-[450px] h-[55px] p-2 bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-all duration-200 mt-[40px]">
              <img src={facebook} className="h-6 w-6 ml-4" />
              Log in with Facebook
            </p>
          </div>

          <div className="flex items-center my-6 w-[450px] mx-auto">
            <hr className="flex-grow border-t border-gray-400" />
            <span className="px-3 text-black">OR</span>
            <hr className="flex-grow border-t border-gray-400" />
          </div>
          <NavLink to="/Loginpage">
            <p className="flex items-center justify-center gap-[20px] border-[1px] w-[450px] h-[55px] p-2 cursor-pointer hover:bg-gray-100 transition-all duration-200 mt-[40px]">
              Log in with Email
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Accountpage;
