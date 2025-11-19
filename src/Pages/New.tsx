import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
}

const API_URL = "http://localhost:5000/products";

const ToppicksPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setProducts(res.data))
      .catch(() => setError("Unable to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (productId: string) => {
    navigate(`/ProductDetail/${productId}`);
  };

  return (
    <Layout>
      <div className="bg-secondaray px-4 sm:px-8 lg:px-24 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center font-blastula text-primary">
          NEW
        </h1>

        {loading ? (
          <p className="text-center w-full text-primary text-lg">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-center w-full text-red-600 text-lg">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center w-full text-primary text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-6 rounded-xl shadow-lg flex flex-col bg-secondaray transition cursor-pointer hover:shadow-xl"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-80 object-contain rounded bg-secondaray"
                  onClick={() => handleViewDetails(product.id)}
                />
                <h3
                  className="font-semibold text-lg mt-4 text-center"
                  onClick={() => handleViewDetails(product.id)}
                >
                  {product.name}
                </h3>
                <p className="text-primary font-bold mt-2 text-center">
                  Rs {product.price}
                </p>
                <button
                  onClick={() => handleViewDetails(product.id)}
                  className="mt-4 px-6 py-3 bg-[#7a1e2c] text-white rounded-lg hover:bg-[#5c1621] transition-colors text-center mx-auto"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ToppicksPage;
