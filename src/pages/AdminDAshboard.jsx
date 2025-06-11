import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { 
  fetchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers } from '../services/userService';


// Styled Components (keep your existing styles)
const Wrapper = styled.div`
  font-family: 'Noto Serif', serif;
  background-color: #091018;
  color: #F5F5F5;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #091018;
  border-bottom: 1px solid #333;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: ${props => props.$isActive ? '#D6B341' : '#F5F5F5'};
  text-decoration: none;
  cursor: pointer;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
`;

const RightItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const Content = styled.div`
  padding: 2rem;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #D6B341;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
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
  const [loading, setLoading] = useState(false);
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
      
      const [productsResponse, usersResponse] = await Promise.all([
        fetchProducts(),
        fetchUsers()
      ]);

      if (!productsResponse.success || !usersResponse.success) {
        throw new Error('Failed to fetch dashboard data');
      }

      setProducts(productsResponse.data || []);
      setUsers(usersResponse.data || []);
      
      // Calculate stats based on fetched data
      setStats({
        totalUsers: usersResponse.data?.length || 0,
        totalProducts: productsResponse.data?.length || 0,
        totalSales: 0, // You'll need to implement this
        pendingPayments: 0, // You'll need to implement this
        totalReviews: 0 // You'll need to implement this
      });

    } catch (err) {
      console.error('Dashboard load error:', err);
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
        setProducts(products.map(p => p._id === productData._id ? response.data : p));
      } else {
        response = await createProduct(formData);
        setProducts([...products, response.data]);
      }

      resetProductForm();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const resetProductForm = () => {
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProductData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
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
        <Navbar>
          <Logo src="/images/SCENTSY_TITLE.png" alt="Logo" />
          <NavLinksContainer>
            <NavLink onClick={() => window.location.reload()}>Refresh</NavLink>
          </NavLinksContainer>
        </Navbar>
        <ErrorMessage>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData}>Retry</button>
        </ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar>
        <Logo src="/images/SCENTSY_TITLE.png" alt="Logo" />
        <NavLinksContainer>
          <NavLink 
            $isActive={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </NavLink>
          <NavLink 
            $isActive={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </NavLink>
          <NavLink 
            $isActive={activeTab === 'products'} 
            onClick={() => setActiveTab('products')}
          >
            Products
          </NavLink>
        </NavLinksContainer>
        <RightItems>
          <span style={{ color: '#D6B341' }}>{user?.name || 'Admin'}</span>
          <IconWrapper onClick={logout}>
            <img src="/icons/log-out.svg" alt="Logout" />
          </IconWrapper>
        </RightItems>
      </Navbar>

      <Content>
        {activeTab === 'overview' && (
          <div>
            <h2>Dashboard Overview</h2>
            <div>
              <p>Total Users: {stats.totalUsers}</p>
              <p>Total Products: {stats.totalProducts}</p>
              <p>Total Sales: {stats.totalSales}</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2>User Management</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h2>Product Management</h2>
            <form onSubmit={handleProductSubmit}>
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              
              <button type="submit">
                {productData._id ? 'Update Product' : 'Add Product'}
              </button>
            </form>

            <div>
              <h3>Product List</h3>
              {products.map(product => (
                <div key={product._id}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    width="100"
                  />
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                  <button onClick={() => setProductData(product)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Content>
    </Wrapper>
  );
};

export default AdminDashboard;