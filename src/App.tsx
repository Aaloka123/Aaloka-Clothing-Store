import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToppicksPage from "./Pages/ToppicksPage";
import AddToCartPage from "./Pages/AddToCartPage";
import Accountpage from "./Pages/Accountpage";
import Signup from "./Pages/Signup";
import Loginpage from "./Pages/Loginpage";
import Dashboard from "./Pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminToppicksPage from "./Adminpages/AdminToppickspage";
import AdminDashboard from "./AdminComponent/AdminDashboard";
import ProductDetail from "./Pages/ProductDetail";
import AdminUserPage from "./Adminpages/AdminUserpage";
import New from "./Pages/New";
import Aboutus from "./Pages/Aboutus";
import Adminsetting from "./Adminpages/Adminsetting";

import ProtectedRoute from "./Components/ProtectedRoute";
import ThankYouPage from "./Pages/ThankYouPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="Home" element={<Dashboard />} />
        <Route path="/ToppicksPage" element={<ToppicksPage />} />
        <Route path="/cart" element={<AddToCartPage />} />
        <Route path="/accountpage" element={<Accountpage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/new" element={<New />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/thankyou" element={<ThankYouPage />} />

        {/* User Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <AdminToppicksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <Adminsetting />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
