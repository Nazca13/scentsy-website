import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

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

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
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

const LeftNav = styled.div`
  display: flex;
  gap: 40px;
  justify-content: flex-start;
`;

const RightNav = styled.div`
  display: flex;
  gap: 40px;
  justify-content: flex-end;
`;

const TopRightWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 84px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #FAFAFA;
  border-radius: 20px;
  padding: 2px 12px;
  height: 26px;
  background-color: transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #D6B341;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #FAFAFA;
  outline: none;
  width: 180px;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
    opacity: 50%;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.2s ease-in-out;
    width: 100%;
    height: 100%;
  }

  .default {
    opacity: 1;
  }

  .hover {
    opacity: 0;
  }

  &:hover .default {
    opacity: 0;
  }

  &:hover .hover {
    opacity: 1;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.includes(path);
  };

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    navigate('/');
  }, [navigate]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);

      // kalau mau langsung fetch:
      // fetch(`/api/search?query=${searchQuery}`)
      //   .then(res => res.json())
      //   .then(data => console.log(data));

      setSearchQuery('');
    }
  };

  return (
    <Navbar>
      <TopRightWrapper>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyPress}
          />
          <img src="/icons/search.svg" alt="Search" width={18} height={18} />
        </SearchContainer>

        <IconWrapper onClick={() => navigate('/profile')}>
          <img className="default" src="/icons/user.svg" alt="Profile" />
          <img className="hover" src="/icons/user-gold.svg" alt="Profile" />
        </IconWrapper>

        <IconWrapper onClick={() => navigate('/cart')}>
          <img className="default" src="/icons/shopping-cart.svg" alt="Cart" />
          <img className="hover" src="/icons/shopping-cart-gold.svg" alt="Cart" />
        </IconWrapper>

        <IconWrapper onClick={handleLogout}>
          <img className="default" src="/icons/log-out.svg" alt="Logout" />
          <img className="hover" src="/icons/log-out-gold.svg" alt="Logout" />
        </IconWrapper>
      </TopRightWrapper>

      <Logo
        src="/images/SCENTSY TITLE.png"
        alt="SCENTSY Logo"
        onClick={() => navigate('/homepage')}
      />

      <NavLinks>
        <LeftNav>
          <NavLink
            href="/collection"
            $isActive={isActive('/collection')}
            onClick={(e) => handleNavigation('/collection', e)}
          >
            COLLECTION
          </NavLink>
          <NavLink
            href="/new"
            $isActive={isActive('/new')}
            onClick={(e) => handleNavigation('/new', e)}
          >
            NEW
          </NavLink>
          <NavLink
            href="/sale"
            $isActive={isActive('/sale')}
            onClick={(e) => handleNavigation('/sale', e)}
          >
            HOT SALE
          </NavLink>
        </LeftNav>
        <RightNav>
          <NavLink
            href="/magazine"
            $isActive={isActive('/magazine')}
            onClick={(e) => handleNavigation('/magazine', e)}
          >
            MAGAZINE
          </NavLink>
          <NavLink
            href="/about"
            $isActive={isActive('/about')}
            onClick={(e) => handleNavigation('/about', e)}
          >
            ABOUT SCENTSY
          </NavLink>
        </RightNav>
      </NavLinks>
    </Navbar>
  );
};

export default Header;
