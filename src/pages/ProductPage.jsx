import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/ProductsData";

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
  font-family: 'Georgia', serif;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  border: 3px solid #d6b341;
  border-radius: 8px;
`;

const DiscountLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: 12px;
`;

const PriceRow = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 14px;
  color: #ccc;
  margin-left: 10px;
`;

const Description = styled.p`
  margin-bottom: 12px;
  font-size: 15px;
  color: #eee;
  line-height: 1.5;
`;

const Rating = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #f87171;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const VolumePrice = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const QtyButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 4px;

  span {
    margin: 0 10px;
    min-width: 20px;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #333;
      border-radius: 50%;
    }
  }
`;

const GoldButton = styled.button`
  background-color: #d6b341;
  color: black;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e8c75a;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Notes = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #ccc;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = products.find((p) => p.id === id);
      setProduct(foundProduct);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <LoaderOverlay>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </LoaderOverlay>
    );
  }

  if (!product) {
    return (
      <Wrapper>
        <Navbar />
        <div style={{ color: "white", padding: "2rem", textAlign: "center" }}>
          Product not found.
        </div>
        <Footer />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      <Container>
        <ImageWrapper>
          <ProductImage src={product.image} alt={product.name} />
          {product.discount && <DiscountLabel>{product.discount}</DiscountLabel>}
        </ImageWrapper>
        <Info>
          <Title>{product.name}</Title>
          <PriceRow>
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <OldPrice>${product.originalPrice.toFixed(2)}</OldPrice>
            )}
          </PriceRow>
          <Description>{product.description}</Description>
          <Rating>
            ★ {product.rating} ({product.reviews} reviews)
          </Rating>
          <VolumePrice>
            Volume: {product.volume} • ${product.price.toFixed(2)}
          </VolumePrice>
          <ButtonGroup>
            <QtyButton>
              <button 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </QtyButton>
            <GoldButton>Add to Cart</GoldButton>
            <GoldButton>Buy Now</GoldButton>
          </ButtonGroup>
          <Notes>
            <strong>Fragrance Notes:</strong>{"\n"}
            Top: {product.notes.top}{"\n"}
            Heart: {product.notes.heart}{"\n"}
            Base: {product.notes.base}{"\n"}
            Evokes: {product.notes.evokes}
          </Notes>
        </Info>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default ProductPage;