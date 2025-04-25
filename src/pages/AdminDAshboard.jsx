import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useAuth } from '../contexts/AuthContext';
import { fetchUsers } from '../services/users';

const Wrapper = styled.div`
  background-color: #0d0d0d;
  min-height: 100vh;
  color: white;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 60px 5px;
  align-items: center;
  background-color: #090909;
  position: relative;
  z-index: 2;
`;

const Logo = styled.img`
  height: 240px;
  margin-top: -75px;
  margin-bottom: -70px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const NavBarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -30px;
  padding-bottom: 5px;
`;

const NavLink = styled.a`
  color: ${props => props.$isActive ? '#D6B341' : '#FAFAFA'};
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: all 0.3s ease;
  font-weight: ${props => props.$isActive ? '500' : 'normal'};
  font-size: 18px;

  &:hover {
    color: #D6B341;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: #D6B341;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const RightItems = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img.default {
    display: block;
  }

  img.hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover img.default {
    display: none;
  }

  &:hover img.hover {
    display: block;
  }
`;

const Content = styled.div`
  padding: 40px 60px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #D6B341;
  margin-bottom: 20px;
`;

const UserCard = styled.div`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

const UserInfo = styled.p`
  margin: 5px 0;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #333;
  margin-top: 15px;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <Wrapper>
      <Navbar>
        <Logo src="/images/SCENTSY TITLE.png" alt="Logo" />
        <NavBarTop>
          <NavLink href="/admin" $isActive>Users</NavLink>
          <RightItems>
            <NavLink href="/admin/products/add">Products</NavLink>
            <IconWrapper onClick={handleLogout}>
              <img className="default" src="/icons/log-out.svg" alt="Logout" />
              <img className="hover" src="/icons/log-out-gold.svg" alt="Logout" />
            </IconWrapper>
          </RightItems>
        </NavBarTop>
      </Navbar>

      <Content>
        {loading && <Loader />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Title>Active Users</Title>
        {users.map((user) => (
          <UserCard key={user._id}>
            <UserInfo>
              <strong>Name:</strong> {user.name}
            </UserInfo>
            <UserInfo>
              <strong>Email:</strong> {user.email}
            </UserInfo>
            <UserInfo>
              <strong>Join Date:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </UserInfo>
            <Divider />
          </UserCard>
        ))}
      </Content>
    </Wrapper>
  );
};

export default AdminDashboard; 