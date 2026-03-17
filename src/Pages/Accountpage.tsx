import React from "react";
import { NavLink } from "react-router-dom";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import { X } from "lucide-react";

const Accountpage = () => {
  return (
    <div className="min-h-screen w-full bg-[#FFF8F8] flex items-center justify-center px-4 relative">
      <NavLink
        to="/Home"
        className="absolute top-6 right-6 z-20 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition"
      >
        <X className="cursor-pointer text-gray-700" />
      </NavLink>

      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white shadow-xl border border-gray-100 px-8 py-10 md:px-10 md:py-12">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.35em] uppercase text-gray-500 mb-3">
            Welcome to Aaloka
          </p>
          <h1 className="font-blastula text-4xl md:text-5xl text-gray-900 mb-3">
            Log in
          </h1>
          <p className="text-sm text-gray-500">
            New to this site?{" "}
            <NavLink
              to="/Signup"
              className="font-medium text-primary hover:text-[#5c1621] underline underline-offset-4"
            >
              Sign up
            </NavLink>
          </p>
        </div>

        <div className="space-y-4">
          <button className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl w-full h-[52px] px-4 cursor-pointer bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
            <img src={google} className="h-5 w-5" alt="Google" />
            <span className="text-sm font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          <button className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl w-full h-[52px] px-4 cursor-pointer bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
            <img src={facebook} className="h-5 w-5" alt="Facebook" />
            <span className="text-sm font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 my-7">
          <div className="h-px flex-1 bg-gray-200" />
          <span>or continue with</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <NavLink to="/Loginpage">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white h-[52px] text-sm font-semibold tracking-wide shadow-sm hover:bg-[#5c1621] hover:shadow-md active:scale-[0.99] transition-all duration-200">
            Continue with email
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Accountpage;
