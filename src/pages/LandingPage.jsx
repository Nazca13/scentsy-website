import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Noto Serif', serif;
  background-color: black;
  color: white;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
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
`;
const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  margin-top: -30px;
  padding-bottom: 5px;

  a {
    color: white;
    text-decoration: none;
    position: relative;
    padding-bottom: 4px;

    &:hover {
      color: #D6B341;
    }

    &:hover::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #D6B341;
    }
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

  &:hover {
    background-color: #b8912f;
  }
`;

const Footer = styled.footer`
  background-color: #090909;
  padding: 60px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
  border-top: 0.5px solid #333;
`;

const FooterTopBar = styled.div`
  width: 1100px;
  height: 1px;
  background-color: white;
  margin: 0 auto 30px auto;
  border-radius: 1px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  margin: 10px 20px;
`;

const FooterHeading = styled.h4`
  color: #D6B341;
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

  return (
    <Container>
      <Navbar>
        <Logo src="/images/SCENTSY TITLE.png" alt="SCENTSY Logo" />
        <NavLinks>
          <LeftNav>
            <a href="/login">COLLECTION</a>
            <a href="/login">NEW</a>
            <a href="/login">SALE</a>
          </LeftNav>
          <RightNav>
            <a href="/login">MAGAZINE</a>
            <a href="/login">ABOUT SCENTSY</a>
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
        <FooterTopBar />
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