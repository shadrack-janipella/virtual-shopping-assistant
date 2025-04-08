import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  console.log("Cart Items in CartPage:", cartItems);
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Checkout clicked!");
    navigate('/checkout');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-blue-600 underline">
            Go to Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-4 border"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                <p className="text-lg font-bold text-green-600 mb-2">₹{item.price}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-lg font-medium">
                  Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-2xl font-bold">
              Total: ₹{getTotalPrice().toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-3 bg-green-600 text-white text-lg rounded-xl hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
