import React from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Link } from "react-router-dom";

const Adminsetting = () => {
  return (
    <div>
      <AdminLayout>
        <Link to="/">
          <button>Logout</button>
        </Link>
      </AdminLayout>
    </div>
  );
};

export default Adminsetting;
