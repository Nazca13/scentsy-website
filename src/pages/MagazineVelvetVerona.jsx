import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const Wrapper = styled.div`
  background-color: #000;
  color: white;
  font-family: "Georgia", serif;
`;

const Content = styled.div`
  max-width: 820px;
  margin: 0 auto;
  padding: 30px 16px;
`;

const Article = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  line-height: 1.4;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 14px;
`;

const Quote = styled.blockquote`
  font-style: italic;
  font-weight: bold;
  margin-bottom: 14px;
  font-size: 15px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

const ReadMore = styled.a`
  color: #d6b341;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #444;
  width: 80%;
  margin: 36px auto;
`;

const MagazinePage = () => {
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
    <Wrapper>
      <Navbar />
      <Content>
        <Article>
          <Title>
            Velvet Verona: A Romantic Classic Wrapped in Warm Sophistication
          </Title>
          <Image
            src="/images/magazine/Velvet Verona magazine.png"
            alt="Velvet Verona"
          />
          <Quote>
            "Softness is a strength, and nostalgia is the most beautiful form of
            elegance."
          </Quote>
          <Description>
            Velvet Verona is a fragrance that whispers timeless romance through
            a veil of velvet warmth and refined femininity. Inspired by the soul
            of Verona the city of love this scent feels like poetry made
            perfume.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            It opens with juicy bergamot, ripe plum, and pear nectar, a fruity
            touch that is both fresh and inviting. The heart notes unfold with a
            delicate blend of Turkish rose, heliotrope, and iris butter,
            creating a soft powdery floral embrace.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            It opens with juicy bergamot, ripe plum, and pear nectar, a fruity
            touch that is both fresh and inviting. The heart notes unfold with a
            delicate blend of Turkish rose, heliotrope, and iris butter,
            creating a soft powdery floral embrace.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            The base settles into comforting richness with tonka bean, vanilla
            absolute, and cashmere woods, offering a long-lasting finish that's
            cozy yet sensual. Velvet Verona is made for slow afternoons, special
            evenings, or simply days when you want to feel beautiful,
            effortlessly.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            It's that perfect balance between modern luxury and classic softness
            never loud, always captivating. Lovers of vintage-modern blends will
            appreciate its nostalgic grace and graceful projection.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            This is not a scent that demands attention it earns it, quietly and
            surely. Velvet Verona is a celebration of quiet power, of timeless
            beauty, of love that lingers. A perfect fragrance for the elegant
            heart with a timeless soul.
          </Description>
        </Article>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default MagazinePage;