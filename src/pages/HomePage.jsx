// src/pages/HomePage.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProducts } from "../hooks/useProducts";

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 8, 15, 0.8);
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
  text-align: center;
`;

const PageContainer = styled.div`
  font-family: "Noto Serif", serif;
  background-color: #091018;
  color: #F5F5F5;
  width: 100%;
  overflow-x: hidden;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  padding: 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
`;

const Card = styled.div`
  background: #091018;
  border-radius: 8px;
  overflow: hidden;
  color: white;
  box-shadow: 0 0 6px rgba(214, 179, 65, 0.25);
  display: flex;
  flex-direction: column;
  font-size: 10px;
  width: 220px;
`;

const ProductImageWrapper = styled.div`
  position: relative;
  border: 1.5px solid #d6b341;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background: red;
  color: white;
  font-weight: bold;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  padding: 6px 8px;
`;

const ProductName = styled.h6`
  color: #d6b341;
  font-size: 12px;
  margin: 0;
  text-align: left;
`;

const ProductDescription = styled.p`
  font-size: 9px;
  color: #ccc;
  margin: 2px 0;
  text-align: left;
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 6px;
`;

const ProductVolume = styled.div`
  font-size: 9px;
  color: #ccc;
  text-align: right;
`;

const Rating = styled.div`
  color: red;
  font-size: 9px;
  margin-bottom: 6px;
  span {
    color: red;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 8px 10px;
`;

const OldPrice = styled.div`
  color: #888;
  text-decoration: line-through;
  font-size: 8px;
`;

const NewPrice = styled.div`
  color: #d6b341;
  font-weight: bold;
  font-size: 11px;
`;

const BuyButton = styled.button`
  background: #d6b341;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #b8912f;
  }
`;

const HomePage = () => {
  const { products, loading, error } = useProducts({ newArrival: true });
  const navigate = useNavigate();

  if (loading) {
    return (
      <LoaderOverlay>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </LoaderOverlay>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <PageContainer>
      <Navbar />
      <section style={{ padding: "40px" }}>
        <h2>New Arrival</h2>
        {products.length === 0 ? (
          <p>Tidak ada produk</p>
        ) : (
          <ProductGrid>
            {products.map((product) => (
              <Card key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                <ProductImageWrapper>
                  {product.discount && <DiscountBadge>{product.discount}</DiscountBadge>}
                  <ProductImage src={`${import.meta.env.VITE_API_BASE_URL}${product.image}`} alt={product.name} />
                </ProductImageWrapper>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <DescriptionRow>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductVolume>{product.volume}</ProductVolume>
                  </DescriptionRow>
                  <Rating>★ {product.rating} <span>({product.ratingCount})</span></Rating>
                  <BottomWrapper>
                    <OldPrice>${product.originalPrice.toFixed(2)}</OldPrice>
                    <NewPrice>${product.price.toFixed(2)}</NewPrice>
                    <BuyButton>BUY NOW</BuyButton>
                  </BottomWrapper>
                </ProductInfo>
              </Card>
            ))}
          </ProductGrid>
        )}
      </section>
      <Footer />
    </PageContainer>
  );
};

export default HomePage;