import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "../services/backend/auth";

const AdminNavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "DASHBOARD", path: "/admin/Dashboard" },
    { name: "PRODUCTS", path: "/admin/products" },
    { name: "USERS", path: "/admin/users" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/Loginpage"); // Redirect to login
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-block border-b-2 border-transparent transition-all duration-300 ${
      isActive ? "border-white" : "hover:border-white"
    }`;

  return (
    <div className="px-4 sm:px-8 lg:px-20">
      <div className="bg-primary p-4 flex justify-between items-center">
        {/* Admin Title (mobile only) */}
        <div className="text-white font-bold md:hidden">ADMIN</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center w-full">
          {/* Centered Menu Items */}
          <div className="flex-grow flex justify-center gap-[32px] text-white font-normal">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={linkClass}
                end={item.path === "/admin"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Separate Logout Button */}
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white font-semibold"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="bg-primary flex flex-col items-center text-white md:hidden w-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="py-3 w-full text-center border-b border-white last:border-none"
              end={item.path === "/admin"}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Separate Logout Button (Mobile) */}
          <div className="w-full mt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-red-700 transition text-white font-semibold rounded"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavigationMenu;
