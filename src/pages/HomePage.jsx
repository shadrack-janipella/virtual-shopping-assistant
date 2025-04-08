import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🛒 Welcome to the Virtual Shopping Assistant</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-xl">
        Your smart AI assistant is here to help you explore products, manage your cart, and simulate purchases—all with a friendly chat or a few clicks!
      </p>

      <div className="flex gap-4">
        <Link to="/products">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
            Browse Products
          </button>
        </Link>
        <Link to="/chat">
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition">
            Talk to AI Assistant
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
