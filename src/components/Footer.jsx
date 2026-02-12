//components/Footer.js

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #090909;
  padding: 60px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 12px;
  border-top: 1px solid #333;
`;

const Column = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  margin: 10px 20px;
`;

const FooterHeading = styled.h4`
  color: #D6B341; // Using the gold color for headings as seen in LandingPage
  margin-bottom: 20px;
`;

const FooterLink = styled.p`
color: #F5F5F5;
margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #D6B341;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #D6B341;
  }
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;

  ${SocialLink}:hover & {
    transform: scale(1.1);
  }
`;

const Copyright = styled.p`
  width: 100%;
  margin-top: 30px;
  font-size: 12px;
  color: #D6B341;
  text-align: left; // Match LandingPage specific alignment if needed, usually center or left
  margin-left: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Column>
        <FooterHeading>Scentsy: The Perfect Fragrance For You</FooterHeading>
        <p style={{ color: '#F5F5F5' }}>
          Scentsy is a global luxury fragrance brand committed to delivering elegant, refined scents that embody depth, quality, and personal expression. Each fragrance is carefully crafted with premium ingredients and an artistic approach, offering a signature experience that is both timeless and unforgettable.
          <br /><br />
          At Scentsy, we believe that fragrance is more than a scent – it's a story, a feeling, and a reflection of who you are. With a passion for creating "The Perfect Fragrance for You," we design each perfume to feel personal, yet universally luxurious. Our collections blend tradition and innovation, resulting in sophisticated compositions with lasting power and distinct identity.
        </p>
      </Column>
      <Column>
        <FooterHeading>About Scentsy</FooterHeading>
        <FooterLink>About Us</FooterLink>
        <FooterLink>Contact Us</FooterLink>
        <FooterLink>Privacy Policy</FooterLink>
      </Column>
      <Column>
        <FooterHeading>Follow Us</FooterHeading>
        <SocialIcons>
          <SocialLink href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon src="/icons/instagram logo.png" alt="Instagram" />
            scentsy.official
          </SocialLink>
          <SocialLink href="#" target="_blank" rel="noopener noreferrer">
            <SocialIcon src="/icons/twitter logo.png" alt="Twitter" />
            @scentsy.official
          </SocialLink>
        </SocialIcons>
      </Column>
      <Copyright>
        Copyright © 2025 by SCENTSY. All Rights Reserved
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;