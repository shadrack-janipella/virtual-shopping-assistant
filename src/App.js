import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { CartContextProvider } from './context/CartContext'; 
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <CartContextProvider>
      <Routes>
      <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </CartContextProvider>
  );
};

export default App;
