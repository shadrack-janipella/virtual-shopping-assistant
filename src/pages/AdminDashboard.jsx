import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const correctPassword = 'admin123'; // Set your admin password here

  // Handle password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      fetchProducts(); // Fetch products after successful authentication
    } else {
      toast.error('Incorrect password');
    }
  };

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/all");
      setProducts(res.data.products || res.data); // Handle both { products: [...] } and [...] formats
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  // Add a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/products", newProduct);
      toast.success("Product added!");
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts(); // Fetch updated product list
    } catch (err) {
      toast.error("Error adding product.");
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Product deleted!");
      fetchProducts(); // Fetch updated product list
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Enter Admin Password</h2>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <div className="mb-10 space-y-2">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded p-4 shadow-md flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600 mb-2">₹ {product.price}</p>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
