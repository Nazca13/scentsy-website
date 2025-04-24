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
            Obsidian Bloom: A Floral Darkness with a Bold, Sensual Twist
          </Title>
          <Image
            src="/images/magazine/BLOOM OPSIDIAN magazine.png"
            alt="Obsidian Bloom"
          />
          <Quote>
            "Florals don't always have to be light sometimes, the most
            unforgettable ones bloom in the dark."
          </Quote>
          <Description>
            Obsidian Bloom is a bold and mysterious fragrance where florals take
            on a deeper, more powerful form. This isn't a typical bouquet it's
            elegance cloaked in shadow, made for those who love complexity and
            crave a scent that lingers in memory.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            Opening with blackcurrant, saffron, and pink pepper, Obsidian Bloom
            immediately evokes a warm, spicy intrigue. The heart unfolds into a
            lush garden of night-blooming jasmine, Bulgarian rose, and soft
            violet, capturing a nocturnal floral elegance. Finally, the base
            grounds the perfume in depth with patchouli, black amber, and creamy
            sandalwood sensual, smoky, and unforgettable.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            Often described as a "midnight garden," this scent is perfect for
            evenings, intimate dinners, or moments when you want to stand out
            without speaking. It's made for those who want to wear confidence,
            mystery, and beauty all at once. What sets Obsidian Bloom apart is
            its ability to take a traditionally delicate theme flowers and give
            it power, boldness, and sensual depth.
          </Description>
          <div style={{ marginBottom: "10px" }}></div>
          <Description>
            It's not a fragrance for everyone, and that's exactly why it
            captivates. Obsidian Bloom is for the strong yet soft, the elegant
            yet daring. It's a scent that blooms after dark and refuses to be
            forgotten.
          </Description>
        </Article>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default MagazinePage;