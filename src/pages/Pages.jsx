import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanelPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products/all');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
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
      await axios.post('/api/admin/products/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', description: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  const handleEditProduct = product => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image
    });
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`/api/admin/products/update/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      setFormData({ title: '', description: '', price: '', image: '' });
      fetchProducts();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDeleteProduct = async id => {
    try {
      await axios.delete(`/api/admin/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🛠 Admin Product Panel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleInputChange}
          className="border p-2 rounded-xl"
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 rounded-xl"
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="border p-2 rounded-xl"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          className="border p-2 rounded-xl"
        />
        <button
          onClick={editingId ? handleUpdateProduct : handleAddProduct}
          className="col-span-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-xl font-semibold mb-3">📦 Existing Products</h3>
        {products.map(product => (
          <div
            key={product._id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <p><strong>{product.title}</strong> - ₹{product.price}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="bg-yellow-400 px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelPage;
