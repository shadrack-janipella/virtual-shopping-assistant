import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ChatPage from './pages/ChatPage';
import AdminProductManager from './pages/AdminProductManager';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminProductManager />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductsPage />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
    
  );
};

export default App;
