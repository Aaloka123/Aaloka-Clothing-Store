import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearCart, removeFromCart, updateQuantity } from "../cartSlice";
import Layout from "../Layout/Layout";
import { Trash } from "lucide-react";
import { isLoggedIn } from "../services/backend/auth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const cartRaw = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = cartRaw.map((item) => ({
    ...item,
    price: item.price || 0,
    qty: Number(item.qty) || 1,
    img: item.img || "",
    description: item.description || "",
    category: item.category || "Clothing",
    selectedVariants: item.selectedVariants || {},
  }));

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleBuyNow = (itemId: string, itemName: string) => {
    if (!isLoggedIn()) {
      toast.warn("You must log in to buy a product!");
      setTimeout(() => navigate("/loginpage"), 1500);
      return;
    }

    toast.success(`You bought ${itemName} successfully!`);
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (!isLoggedIn()) {
      toast.warn("You must log in to checkout!");
      setTimeout(() => navigate("/loginpage"), 1500);
      return;
    }

    toast.success("Checkout successful!");
    setTimeout(() => {
      dispatch(clearCart());
      navigate("/thankyou"); // <-- updated path to match App.tsx
    }, 1500);
  };

  const handleDecrease = (id: string, qty: number) => {
    dispatch(updateQuantity({ id, qty: qty > 1 ? qty - 1 : 1 }));
  };

  const handleIncrease = (id: string, qty: number) => {
    dispatch(updateQuantity({ id, qty: qty + 1 }));
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-secondaray min-h-screen p-4 sm:p-6 md:p-8">
        <h2 className="text-primary text-[32px] sm:text-[36px] md:text-[40px] font-semibold text-center mb-8 sm:mb-10 md:mb-12">
          Your Cart
        </h2>

        <div className="max-w-6xl mx-auto border border-primary p-4 sm:p-6 md:p-6 rounded">
          {/* Table Header */}
          <div className="hidden md:flex text-primary font-semibold mb-4 text-sm md:text-base">
            <div className="basis-3/6">PRODUCT</div>
            <div className="basis-2/6 flex justify-center items-center">
              QUANTITY
            </div>
            <div className="basis-1/12"></div>
            <div className="basis-1/6 flex justify-end">TOTAL</div>
            <div className="basis-1/6 flex justify-end">BUY NOW</div>
          </div>

          {/* Cart Items */}
          {cart.length === 0 ? (
            <p className="text-primary text-center py-6">No items in cart.</p>
          ) : (
            cart.map(
              ({
                id,
                name,
                price,
                qty,
                img,
                description,
                category,
                selectedVariants,
              }) => (
                <div
                  key={id}
                  className="flex flex-col md:flex-row items-center md:items-start mb-6 last:mb-0 border-b border-primary pb-4 md:gap-4"
                >
                  {/* PRODUCT */}
                  <div className="flex md:basis-3/6 items-center gap-4 w-full md:w-auto">
                    <img
                      src={img}
                      alt={name}
                      className="w-full md:w-20 h-40 md:h-20 object-contain rounded"
                    />
                    <div className="text-center md:text-left">
                      <p className="font-semibold text-primary">{name}</p>
                      <p className="text-primary/70 text-sm">Rs {price}.00</p>
                      <p className="text-gray-500 text-xs">{category}</p>
                      {description && (
                        <p className="text-gray-400 text-xs truncate max-w-[200px]">
                          {description}
                        </p>
                      )}
                      {/* Display selected size */}
                      {selectedVariants.size && (
                        <p className="text-gray-500 text-sm">
                          Size: {selectedVariants.size}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* QUANTITY CONTROL */}
                  <div className="flex md:basis-2/6 justify-center items-center border border-primary h-10 text-primary my-2 md:my-0 w-full md:w-auto">
                    <button
                      onClick={() => handleDecrease(id, qty)}
                      className="px-3 text-lg font-semibold hover:text-[#5c1621] transition"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={qty}
                      className="w-12 text-center outline-none bg-transparent"
                    />
                    <button
                      onClick={() => handleIncrease(id, qty)}
                      className="px-3 text-lg font-semibold hover:text-[#5c1621] transition"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE BUTTON */}
                  <div className="flex md:basis-1/12 justify-center my-2 md:my-0">
                    <button
                      onClick={() => dispatch(removeFromCart(id))}
                      className="text-primary hover:text-red-600 transition"
                    >
                      <Trash />
                    </button>
                  </div>

                  {/* TOTAL */}
                  <div className="flex md:basis-1/6 justify-end text-primary font-semibold mt-2 md:mt-0 w-full md:w-auto">
                    Rs {price * qty}.00
                  </div>

                  {/* BUY NOW */}
                  <div className="flex md:basis-1/6 justify-end mt-2 md:mt-0 w-full md:w-auto">
                    <button
                      onClick={() => handleBuyNow(id, name)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              )
            )
          )}

          {/* Cart Summary & Checkout */}
          {cart.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between mt-6 items-start md:items-center gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-[#5c1621] w-full md:w-auto text-center transition"
              >
                Clear Cart
              </button>

              <div className="text-right text-primary font-semibold w-full md:w-auto">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: Rs {totalPrice}.00</p>
                <button
                  onClick={handleCheckout}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-full md:w-auto"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
