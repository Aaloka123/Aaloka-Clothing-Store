import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-secondaray min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-primary/80 mb-6">
            Your order has been successfully placed. 
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-white rounded hover:bg-[#5c1621] transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouPage;
