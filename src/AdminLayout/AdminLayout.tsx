import React, { ReactNode } from "react";
import AdminNavbar from "../AdminComponent/AdminNavbar";
import AdminFooter from "../AdminComponent/AdminFooter";

interface LayoutTypes {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      {children}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
