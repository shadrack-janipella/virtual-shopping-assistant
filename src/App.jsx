// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ChatPage from './pages/ChatPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import AdminPasswordPage from './pages/AdminPasswordPage';  // Import the new password page
import AdminDashboard from './pages/AdminDashboard';  // Admin Dashboard
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin-password" element={<AdminPasswordPage />} />  {/* Route for password entry */}
        <Route path="/admin" element={<AdminDashboard />} />  {/* Admin dashboard */}
      </Routes>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
