import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyCart = {
  products: [
    { productId: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, quantity: 1, size: "Medium", color: "Walnut", image: "https://picsum.photos/500/500?random=101" },
    { productId: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, quantity: 2, size: "Standard", color: "Emerald", image: "https://picsum.photos/500/500?random=109" },
    { productId: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, quantity: 1, size: "Compact", color: "White", image: "https://picsum.photos/500/500?random=115" },
  ],
  totalPrice: 1079.96,
};

const dummyUser = {
  email: "leon@example.com",
};

const Checkout = () => {
  const navigate = useNavigate();
  const cart = dummyCart;
  const user = dummyUser;

  const [checkoutId, setCheckoutId] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    // Simulate checkout creation
    setCheckoutId("DUMMY-CHECKOUT-001");
  };

  const handlePaymentSuccess = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      navigate("/order-confirmation");
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6 font-medium">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full p-2 border rounded bg-gray-100"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Payment</h3>
                <button
                  type="button"
                  onClick={handlePaymentSuccess}
                  className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-300 transition"
                >
                  {isFinalizing ? "Finalizing..." : "Pay with PayPal (Demo)"}
                </button>
                {isFinalizing && (
                  <p className="mt-4 text-center text-blue-600">Finalizing payment, please wait...</p>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-2 border-b">
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                  <p className="text-gray-500">Qty: {product.quantity}</p>
                </div>
              </div>
              <p className="text-xl">PHP {(product.price * product.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal:</p>
          <p>PHP {cart.totalPrice.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Shipping:</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between items-center text-lg font-semibold mb-4">
          <p>Total:</p>
          <p>PHP {cart.totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;