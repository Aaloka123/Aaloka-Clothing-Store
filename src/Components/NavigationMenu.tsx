import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { logout, isLoggedIn } from "../services/backend/auth"; // assuming isLoggedIn exists

const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/ToppicksPage" },
    { name: "NEW", path: "/new" },
    { name: "ABOUT", path: "/about" },
    { name: "BAG", path: "/cart" },
    { name: "ACCOUNT", path: "/Accountpage" },
  ];

  useEffect(() => {
    setLoggedIn(isLoggedIn()); // check login status on mount
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/Loginpage");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-block border-b-2 border-transparent transition-all duration-300 ${
      isActive ? "border-white" : "hover:border-white"
    }`;

  return (
    <div className="px-4 sm:px-8 lg:px-20">
      <div className="bg-primary p-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-white font-bold md:hidden">USER</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center w-full">
          <div className="flex-grow flex justify-center gap-[32px] font-normal text-white">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={linkClass}
                end={item.path === "/"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Logout Button only if logged in */}
          {loggedIn && (
            <div className="ml-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-white font-semibold"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
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
              className="py-3 w-full text-center"
              end={item.path === "/"}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Logout Button (Mobile) only if logged in */}
          {loggedIn && (
            <div className="w-full mt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
