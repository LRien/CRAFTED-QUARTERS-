import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';

const OrdersConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Clear cart after successful order
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem('cart');
    }
  }, [checkout, dispatch]);

  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You For Your Order
      </h1>

      {checkout ? (
        <div className='p-6 rounded-lg border'>
          {/* Order Info */}
          <div className='flex justify-between mb-12'>
            <div>
              <h2 className='text-xl font-semibold'>Order ID: {checkout._id}</h2>
              <p className='text-gray-500'>
                Order Date: {checkout.createdAt ? new Date(checkout.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-emerald-700 text-sm'>
                Estimated Delivery: {checkout.createdAt ? calculateEstimateDelivery(checkout.createdAt) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className='mb-12'>
            {checkout.checkoutItems?.map((item) => (
              <div key={item.productId} className='flex items-center mb-4 border-b pb-4'>
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name || 'Product'}
                  className='w-16 h-16 object-cover rounded-md mr-4'
                />
                <div>
                  <h4 className='text-md font-semibold'>{item.name}</h4>
                  <p className='text-sm text-gray-500'>
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className='ml-auto text-right'>
                  <p className='text-md'>₱{item.price?.toLocaleString()}</p>
                  <p className='text-sm text-gray-500'>QTY: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Info */}
          <div className='mb-6'>
            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
            <p className='text-gray-600'>PayPal</p>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className='text-lg font-semibold mb-2'>Delivery Address</h4>
            <p className='text-gray-600'>{checkout.shippingAddress?.address}</p>
            <p className='text-gray-600'>
              {checkout.shippingAddress?.city}, {checkout.shippingAddress?.country}
            </p>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500'>No order details found.</p>
      )}
    </div>
  );
};

export default OrdersConfirmationPage;
