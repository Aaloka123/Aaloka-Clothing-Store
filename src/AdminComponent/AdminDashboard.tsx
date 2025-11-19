import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import Adminhome from "./Adminhome";
import AdminChart from "./Adminchart";

const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
        <AdminChart />
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
