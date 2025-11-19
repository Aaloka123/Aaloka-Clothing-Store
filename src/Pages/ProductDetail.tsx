import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
import axios from "axios";
import { isLoggedIn } from "../services/backend/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Variant {
  type: string;
  options: string[];
}

interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  variants?: Variant[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Product>(
          `http://localhost:5000/products/${id}`
        );
        setProduct(res.data);

        // Set default size if available
        const sizeVariant = res.data.variants?.find((v) => v.type === "size");
        if (sizeVariant && sizeVariant.options.length > 0) {
          setSelectedSize(sizeVariant.options[0]);
        }

        const relatedRes = await axios.get<Product[]>(
          "http://localhost:5000/products"
        );
        setRelatedProducts(
          relatedRes.data.filter((p) => p.id !== id).slice(0, 4)
        );
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({ ...product, selectedVariants: { size: selectedSize } })
      );
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn()) {
      toast.warn("You must log in to buy products!");
      setTimeout(() => navigate("/Loginpage"), 1500);
      return;
    }

    if (product) {
      dispatch(
        addToCart({ ...product, selectedVariants: { size: selectedSize } })
      );
      toast.success(`${product.name} added to cart!`);
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-20 text-primary text-lg">
          Loading product...
        </p>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <p className="text-center mt-20 text-red-600 text-lg">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer />
      <div className="bg-secondaray min-h-screen relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-12">
          <nav className="text-gray-500 mb-6 text-sm">
            <button
              onClick={() => window.history.back()}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ← Back
            </button>{" "}
            / {product.name}
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Image */}
            <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-4 shadow-lg">
              <img
                src={product.img}
                alt={product.name}
                className="w-full max-w-md h-auto object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl text-primary font-semibold mb-6">
                  Rs {product.price}
                </p>

                <h2 className="text-lg font-semibold mb-2">Description:</h2>
                <p className="text-gray-700 mb-6">{product.description}</p>

                {/* Size Selector */}
                {product.variants?.find((v) => v.type === "size") && (
                  <div className="mb-4">
                    <label className="font-semibold text-lg">Size:</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 ml-2"
                    >
                      {product.variants
                        .find((v) => v.type === "size")!
                        .options.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#7a1e2c] text-white px-6 py-3 rounded-lg hover:bg-[#5c1621] transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-[#7a1e2c] text-[#7a1e2c] px-6 py-3 rounded-lg hover:bg-[#7a1e2c] hover:text-white transition"
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-8 text-gray-500 text-sm">
                <p>SKU: {product.id}</p>
                <p>Category: {product.category}</p>
                <p>
                  Availability:{" "}
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/ProductDetail/${p.id}`)}
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col cursor-pointer"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-56 object-contain mb-4"
                  />
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-primary font-bold">Rs {p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
