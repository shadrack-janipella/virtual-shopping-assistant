import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products/all');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('/api/admin/products', formData);
      setFormData({ name: '', description: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛍️ Admin Product Manager</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border rounded-xl p-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border rounded-xl p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="border rounded-xl p-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          className="border rounded-xl p-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white rounded-xl px-4 py-2 hover:bg-green-700 col-span-full"
        >
          ➕ Add Product
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-3">📦 Product List</h3>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((prod) => (
            <div key={prod._id} className="border rounded-xl p-4 shadow-sm flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg">{prod.name}</h4>
                <p>{prod.description}</p>
                <p className="text-sm text-gray-600">${prod.price}</p>
              </div>
              <button
                onClick={() => handleDeleteProduct(prod._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
