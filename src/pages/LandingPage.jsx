import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Noto Serif', serif;
  background-color: #091018;
  color: #F5F5F5;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 60px 5px;
  align-items: center;
  background-color: #091018;
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
  color: ${props => props.$isActive ? '#D6B341' : '#F5F5F5'};
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


const HeroSection = styled.section`
  background: url('/images/background landing.png') no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: -20px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  color: #D6B341;
  margin-bottom: 30px;
  text-transform: uppercase;
`;

const HeroText = styled.h1`
  font-size: 80px;
  line-height: 1.2;
  margin: 10px 0;
  color: white;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Button = styled.button`
  padding: 12px 30px;
  background-color: #D6B341;
  color: #090909;
  border: none;
  font-weight: bold;
  cursor: pointer;
  margin-top: 30px;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: #b8912f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Footer = styled.footer`
  background-color: #090909;
  padding: 60px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  margin: 10px 20px;
`;

const FooterHeading = styled.h4`
  color: #090909;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #D6B341;
    }
  }
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Copyright = styled.p`
  width: 100%;
  margin-top: 30px;
  font-size: 12px;
  color: #D6B341;
  margin-left: 20px;
`;

const LandingPage = () => {
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
      setSearchQuery('');
    }
  };

  return (
    <Container>
      <Navbar>
        
        <Logo
          src="/images/SCENTSY TITLE.png"
          alt="SCENTSY Logo"
          onClick={() => navigate('/login')}
        />

        <NavLinks>
          <LeftNav>
            <NavLink
              href="/login"
              $isActive={isActive('/login')}
              onClick={(e) => handleNavigation('/login', e)}
            >
              HOME
            </NavLink>
            <NavLink
              href="/login"
              $isActive={isActive('/login')}
              onClick={(e) => handleNavigation('/login', e)}
            >
              NEW
            </NavLink>
            <NavLink
              href="/login"
              $isActive={isActive('/login')}
              onClick={(e) => handleNavigation('/login', e)}
            >
              HOT SALE
            </NavLink>
            <NavLink
              href="/login"
              $isActive={isActive('/login')}
              onClick={(e) => handleNavigation('/login', e)}
            >
              ABOUT
            </NavLink>
          </LeftNav>
          
          <RightNav>
            <NavLink
               href="/login"
               $isActive={isActive('/login')}
               onClick={(e) => handleNavigation('/login', e)}
            >
              MAN
            </NavLink>
            <NavLink
               href="/login"
               $isActive={isActive('/login')}
               onClick={(e) => handleNavigation('/login', e)}
            >
              WOMAN
            </NavLink>
          </RightNav>
        </NavLinks>
      </Navbar>

      <HeroSection>
        <Subtitle>FRAGRANCE THAT DEFINE YOU</Subtitle>
        <HeroText>
          The Perfect<br />Fragrance For You
        </HeroText>
        <Button onClick={() => navigate('/login')}>EXPLORE MORE</Button>
      </HeroSection>

      <Footer>
        <Column>
          <FooterHeading>Scentsy: The Perfect Fragrance For You</FooterHeading>
          <p>
            Scentsy is a global luxury fragrance brand committed to delivering elegant, refined scents that embody depth, quality, and personal expression. Each fragrance is carefully crafted with premium ingredients and an artistic approach, offering a signature experience that is both timeless and unforgettable.
            <br /><br />
            At Scentsy, we believe that fragrance is more than a scent – it's a story, a feeling, and a reflection of who you are. With a passion for creating "The Perfect Fragrance for You," we design each perfume to feel personal, yet universally luxurious. Our collections blend tradition and innovation, resulting in sophisticated compositions with lasting power and distinct identity.
          </p>
        </Column>
        <Column>
          <FooterHeading>About Scentsy</FooterHeading>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
        </Column>
        <Column>
          <FooterHeading>Follow Us</FooterHeading>
          <SocialIcons>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SocialIcon src="/icons/instagram logo.png" alt="Instagram" />
              scentsy.official
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <SocialIcon src="/icons/twitter logo.png" alt="Twitter" />
              @scentsy.official
            </a>
          </SocialIcons>
        </Column>
        <Copyright>
          Copyright © 2025 by SCENTSY. All Rights Reserved
        </Copyright>
      </Footer>
    </Container>
  );
};

export default LandingPage;