import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-md font-bold text-green-600 mb-2">₹ {product.price}</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
      >
        <ShoppingCart size={18} /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
