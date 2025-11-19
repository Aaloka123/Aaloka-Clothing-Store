import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

interface LayoutTypes {
  children: React.ReactNode;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
