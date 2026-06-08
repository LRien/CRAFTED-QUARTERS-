import React, { useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

const initialCart = {
  products: [
    { productId: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, quantity: 1, size: "Medium", color: "Walnut", image: "https://picsum.photos/500/500?random=101" },
    { productId: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, quantity: 2, size: "Standard", color: "Emerald", image: "https://picsum.photos/500/500?random=109" },
    { productId: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, quantity: 1, size: "Compact", color: "White", image: "https://picsum.photos/500/500?random=115" },
  ],
};

const CartContents = ({ cart: propCart, userId, guestId }) => {
  const [cart, setCart] = useState(propCart || initialCart);

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setCart((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.productId === productId && p.size === size && p.color === color
            ? { ...p, quantity: newQuantity }
            : p
        ),
      }));
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    setCart((prev) => ({
      ...prev,
      products: prev.products.filter(
        (p) => !(p.productId === productId && p.size === size && p.color === color)
      ),
    }));
  };

  return (
    <div>
      {cart?.products?.length > 0 ? (
        cart.products.map((product, index) => (
          <div key={index} className="flex items-start justify-between py-4 border-b">
            <div className="flex items-start">
              <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded" />
              <div className="ml-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Variation {product.size} | Color {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >-</button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(product.productId, +1, product.quantity, product.size, product.color)}
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >+</button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 mr-2">PHP {product.price.toLocaleString()}</p>
              <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}>
                <FaRegTrashAlt className="h-6 w-6 text-red-600" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContents;