import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';

const dummyCart = {
  products: [
    { productId: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, quantity: 1, size: "Medium", color: "Walnut", image: "https://picsum.photos/500/500?random=101" },
    { productId: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, quantity: 2, size: "Standard", color: "Emerald", image: "https://picsum.photos/500/500?random=109" },
    { productId: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, quantity: 1, size: "Compact", color: "White", image: "https://picsum.photos/500/500?random=115" },
  ],
};

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const cart = dummyCart;

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
      drawerOpen ? "translate-x-0" : "translate-x-full"
    }`}>

      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoIosCloseCircle className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={null} guestId={null} />
        ) : (
          <p>Your Cart is empty</p>
        )}
      </div>

      <div className="p-4 bg-white sticky bottom-0">
        {cart?.products?.length > 0 && (
          <>
            <p className="text-right font-semibold mb-2">
              Total: PHP {cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-sm tracking-tighter text-gray-500">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;