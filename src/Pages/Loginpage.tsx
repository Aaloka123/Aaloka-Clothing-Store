import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import google from "../assets/google.svg";

import { X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doLogin } from "../services/backend/auth";

const Loginpage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const loginSuccess = doLogin(formData.email, formData.password);
      if (loginSuccess) {
        const role = localStorage.getItem("ROLE");
        toast.success("Logged in successfully 🎉");
        setFormData({ email: "", password: "" });

        if (role === "admin") {
          setTimeout(() => navigate("/admin/Dashboard"), 1500);
        } else {
          setTimeout(() => navigate("/Dashboard"), 1500);
        }
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("Please fix the errors and try again");
    }
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
          Log In
        </h1>
        <p className="text-center text-gray-500 mb-8">
          New to this site?{" "}
          <NavLink
            to="/Signup"
            className="text-red-600 underline hover:text-red-800"
          >
            Sign Up
          </NavLink>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <NavLink
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-red-600"
            >
              Forgot password?
            </NavLink>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#5c1621] transition"
          >
            Log In
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
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
