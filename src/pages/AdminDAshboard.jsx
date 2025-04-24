import styled from "styled-components";
import React, { useState } from 'react';

const users = [
  {
    name: "Ahmad Fauzi",
    email: "ahmad@example.com",
    joinDate: "15-04-2025"
  },
  {
    name: "Dewi Ayu",
    email: "dewi@example.com",
    joinDate: "14-04-2025"
  }
];

const AdminDashboard = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // tambahin logic log out contohkek redirect:
    // window.location.href = "/login";
  };

  return (
    <Wrapper>
      <Navbar>
        <Logo src="/images/SCENTSY TITLE.png" alt="Logo" />
        <NavBarTop>
          <NavLink href="/" $isActive>Preview</NavLink>
          <RightItems>
            <NavLink href="/addproduct">Product</NavLink>
            <IconWrapper onClick={handleLogout}>
              <img className="default" src="/icons/log-out.svg" alt="Logout" />
              <img className="hover" src="/icons/log-out-gold.svg" alt="Logout" />
            </IconWrapper>
          </RightItems>
        </NavBarTop>
      </Navbar>

      <Content>
        <Title>Active Users</Title>
        {users.map((user, index) => (
          <UserCard key={index}>
            <UserInfo>
              <strong>Name:</strong> {user.name}
            </UserInfo>
            <UserInfo>
              <strong>Email:</strong> {user.email}
            </UserInfo>
            <UserInfo>
              <strong>Password:</strong> ••••••••
            </UserInfo>
            <UserInfo>
              <strong>Join Date:</strong> {user.joinDate}
            </UserInfo>
            <Divider />
          </UserCard>
        ))}
      </Content>
    </Wrapper>
  );
};

export default AdminDashboard;

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
