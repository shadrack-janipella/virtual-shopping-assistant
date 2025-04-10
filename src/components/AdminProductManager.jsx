import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductManager = () => {
  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  
  const [products, setProducts] = useState([]);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products: ' + err.message);
      }
    };
    fetchProducts();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productName') {
      setProductName(value);
    } else if (name === 'productDescription') {
      setProductDescription(value);
    } else if (name === 'productPrice') {
      setProductPrice(value);
    } else if (name === 'productImage') {
      setProductImage(value);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productDescription || !productPrice) {
      setError('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/admin/products', {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage,
      });

      setSuccessMessage('Product added successfully!');
      setError('');
     
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
      const updatedProducts = await axios.get('http://localhost:5000/api/admin/products');
      setProducts(updatedProducts.data);
    } catch (err) {
      setError('Error adding product: ' + err.message);
      setSuccessMessage('');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      setSuccessMessage('Product deleted successfully!');
      setError('');
      
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      setError('Error deleting product: ' + err.message);
      setSuccessMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Product Manager</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      {successMessage && <div style={styles.success}>{successMessage}</div>}

      <form onSubmit={handleAddProduct} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Description:</label>
          <input
            type="text"
            name="productDescription"
            value={productDescription}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Price:</label>
          <input
            type="text"
            name="productPrice"
            value={productPrice}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Image URL:</label>
          <input
            type="text"
            name="productImage"
            value={productImage}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      <h3 style={styles.header}>Product List</h3>
      <ul style={styles.productList}>
        {products.map((product) => (
          <li key={product._id} style={styles.productItem}>
            <div>{product.name} - ${product.price}</div>
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  productList: {
    listStyleType: 'none',
    padding: 0,
  },
  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminProductManager;
