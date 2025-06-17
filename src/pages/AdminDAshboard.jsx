//pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Services/API
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService';

import {
  fetchUsers
} from '../services/userService';

import {
  fetchStatsOverview,
  fetchSalesReport
} from '../Api/statsApi';

// Auth
import { useAuth } from '../contexts/AuthContext';

const Wrapper = styled.div`
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
`;

const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #D6B341;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    stock: 0,
    price: '',
    volume: '',
    rating: 4.9,
    discount: '',
    image: null
  });
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
    pendingPayments: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch semua data sekaligus
      const [productsRes, usersRes, statsRes, salesRes] = await Promise.all([
        fetchProducts(),
        fetchUsers(),
        fetchStatsOverview(),
        fetchSalesReport()
      ]);

      setProducts(productsRes || []);
      setUsers(usersRes || []);
      setStats(statsRes || {});

    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      Object.entries(productData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      let response;
      if (productData._id) {
        response = await updateProduct(productData._id, formData);
        setProducts(products.map(p => p._id === productData._id ? response : p));
      } else {
        response = await createProduct(formData);
        setProducts([...products, response]);
      }

      setProductData({
        name: '',
        description: '',
        stock: 0,
        price: '',
        volume: '',
        rating: 4.9,
        discount: '',
        image: null
      });

    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0]
    });
  };

  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData}>Retry</button>
        </ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>Admin Dashboard</h2>

      <nav>
        <button onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button onClick={() => setActiveTab('users')}>
          Users
        </button>
        <button onClick={() => setActiveTab('products')}>
          Products
        </button>
        <button onClick={() => setActiveTab('reports')}>
          Reports
        </button>
      </nav>

      {activeTab === 'overview' && (
        <div>
          <h3>Overview</h3>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Products: {stats.totalProducts}</p>
          <p>Total Sales: ${stats.totalSales?.toFixed(2) || 0}</p>
          <p>Pending Payments: {stats.pendingPayments}</p>
          <p>Total Reviews: {stats.totalReviews}</p>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h3>User Management</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h3>Product Management</h3>

          <form onSubmit={handleProductSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={productData.stock}
              onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
              required
            />
            <input
              type="file"
              onChange={handleImageChange}
            />
            <button type="submit">
              {productData._id ? 'Update Product' : 'Add Product'}
            </button>
          </form>

          <h3>Product List</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.map((product) => (
              <div key={product._id}>
                <img src={product.image} alt={product.name} width="100" />
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <button onClick={() => setProductData(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <h3>Sales Report</h3>
          <p>{salesRes?.report || 'No report available'}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminDashboard;