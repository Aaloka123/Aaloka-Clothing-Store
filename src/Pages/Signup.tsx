import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import google from "../assets/google.svg";
import facebbok from "../assets/face.svg";
import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const newUser: User = {
      id: Date.now().toString(),
      fullName,
      email,
      password,
      role: "user",
    };

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("ROLE", "user");

    toast.success("Signup successful! Redirecting to Home...");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="bg-secondaray min-h-screen flex flex-col justify-center items-center relative">
      <ToastContainer position="top-right" autoClose={3000} />
      <NavLink
        to="/Accountpage"
        className="absolute top-5 right-5 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
      >
        <X size={24} />
      </NavLink>

      <div className="bg-white shadow-lg rounded-xl w-[400px] md:w-[450px] p-8 md:p-10">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Already have an account?{" "}
          <NavLink
            to="/Loginpage"
            className="text-red-600 underline hover:text-red-800"
          >
            Log In
          </NavLink>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#5c1621] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center gap-6">
          <button className="hover:scale-105 transition transform">
            <img src={google} alt="Google Login" className="h-12 w-12" />
          </button>
          <button className="hover:scale-105 transition transform">
            <img src={facebbok} alt="Facebook Login" className="h-12 w-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
