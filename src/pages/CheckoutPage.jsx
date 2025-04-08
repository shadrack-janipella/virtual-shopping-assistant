import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, setCartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.email || !formData.address) {
      toast.warning('Please fill all the fields');
      return;
    }

    setShowSuccessModal(true);
    localStorage.removeItem('cartItems');
    setCartItems([]);

  
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/');
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl relative">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cartItems.map(item => (
              <li key={item._id} className="flex justify-between items-center border-b py-2">
                <span>{item.name} (x{item.quantity})</span>
                <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="text-lg font-semibold mb-4">Total: ₹{getTotalPrice().toFixed(2)}</div>

          <div className="space-y-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg w-full"
          >
            Place Order
          </button>
        </>
      )}

      {showSuccessModal && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-green-600 mb-2">🎉 Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-2">Thank you for shopping with us.</p>
            <p className="text-sm text-gray-500">Redirecting to Home in 3 seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
