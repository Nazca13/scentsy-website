import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 15, 15, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderWrapper = styled.div`
  width: 80px;
  height: 80px;
`;

const Loader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 6px solid transparent;
  border-top: 6px solid #d6b341;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border: 4px solid #ffffff10;
    border-radius: 50%;
    box-shadow: 0 0 20px #d6b34150;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AboutContainer = styled.div`
  background-color: #000;
  color: white;
  font-family: 'Georgia', serif;
  min-height: 100vh;
`;

const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MissionSection = styled.div`
  h1 {
    font-size: 36px;
    color: #D6B341;
    margin-bottom: 30px;
    letter-spacing: 2px;
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
    color: #eee;
  }
`;

const GallerySection = styled.div`
  display: grid;
  grid-template-areas:
    "top top"
    "bottom-left bottom-right";
  grid-template-columns: 1fr 1fr;
  column-gap: 0px;
  row-gap: 24px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-areas:
      "top"
      "bottom-left"
      "bottom-right";
    grid-template-columns: 1fr;
  }
`;

const ImageTop = styled.img`
  grid-area: top;
  width: 100%;
  max-width: 500px;
  height: 300px;
  object-fit: cover;
  border-top-left-radius: 100px;
`;

const ImageBottomLeft = styled.img`
  grid-area: bottom-left;
  width: 100%;
  max-width: 232px;
  height: 300px;
  object-fit: cover;
`;

const ImageBottomRight = styled.img`
  grid-area: bottom-right;
  width: 100%;
  max-width: 232px;
  height: 300px;
  object-fit: cover;
  border-bottom-right-radius: 100px;
`;

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoaderOverlay>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </LoaderOverlay>
    );
  }

  return (
    <AboutContainer>
      <Navbar />
      
      <AboutWrapper>
        <MissionSection>
          <h1>OUR MISSION</h1>
          <p>
            At Scentsy, our mission is to craft and deliver exceptional luxury fragrances that go beyond scent—they tell stories, evoke emotions, and express individuality. We are dedicated to creating timeless, refined compositions using only the finest ingredients and artistic craftsmanship, resulting in perfumes that are both deeply personal and universally elegant.
          </p>
          <p>
            We believe that fragrance is identity—a silent signature that speaks louder than words. With our philosophy of "The Perfect Fragrance for You," each Scentsy creation is designed to resonate with character, sophistication, and soul. Our collections blend heritage and innovation, capturing the essence of beauty, confidence, and lasting impression. Whether bold or delicate, every Scentsy scent is meant to become a part of you—enhancing your presence and telling your story.
          </p>
        </MissionSection>

        <GallerySection>
          <ImageTop src="/images/about/p3 1.png" alt="Scentsy product" />
          <ImageBottomLeft src="/images/about/p2 1.png" alt="Scentsy ingredients" />
          <ImageBottomRight src="/images/about/p1 1.png" alt="Scentsy packaging" />
        </GallerySection>
      </AboutWrapper>

      <Footer />
    </AboutContainer>
  );
};

export default AboutPage;