import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-lg mb-6">Thank you for shopping with us!</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccessPage;
