import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart(); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        console.log("Fetched response full object:", response);
        console.log("Fetched response.data:", response.data);
        console.log("Type of response.data:", typeof response.data);
        if (Array.isArray(response.data)) {
          console.log("✅ response.data is an array");
        } else {
          console.log("❌ response.data is NOT an array");
          console.log("👉 Trying to extract array from inside response.data.products:", response.data.products);
        }
        setProducts(Array.isArray(response.data) ? response.data : response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Clicked Add to Cart');
    console.log('Product:', product);
    console.log('CartContext addToCart:', addToCart);
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`, { autoClose: 1500 });
  };

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  const isProductInCart = (productId) => {
    return cartItems.some(item => item._id === productId);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Catalog</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate('/cart')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
          >
            View Cart 🛒
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
          >
            Talk to Assistant 💬
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl p-4 shadow-lg bg-white hover:shadow-xl transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold text-lg text-green-600 mb-3">₹{product.price.toFixed(2)}</p>
              {isProductInCart(product._id) ? (
                <button
                  disabled
                  className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                >
                  ✅ Added to Cart
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
