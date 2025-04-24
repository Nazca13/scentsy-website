import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const PageWrapper = styled.div`
  font-family: "Noto Serif", serif;
  background: #0f0f0f;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 40px;
  color: #d6b341;
  margin-top: 40px;
  margin-bottom: 24px;
`;

const LineDivider = styled.div`
  width: 1100px;
  height: 1px;
  background-color: white;
  margin: 0 auto 30px auto;
  border-radius: 1px;

  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  margin-right: 240px;
  grid-template-columns: repeat(4, auto);
  column-gap: 36px;
  row-gap: 30px;
  padding: 20px 80px;
  justify-content: center;
`;

const Card = styled.div`
  background: #1d1d1c;
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
  width: 90%;
  height: 90%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  background-color: #000;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  color: #000;
  border: none;
  padding: 8px 22px;
  border-radius: 1px;
  font-weight: bold;
  font-size: 9px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #b8912f;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Sale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dummyData = [
    {
      _id: "bloom-opsidian",
      name: "Bloom Opsidian EDP",
      description: "Bold, Rare, Exotic",
      price: 163.00,
      originalPrice: 327.00,
      discount: " -50%",
      rating: 4.9,
      ratingCount: 634,
      image: "/images/parfumes/BLOOM OPSIDIAN.png",
      volume: "125 ml",
    },
    {
      _id: "nocturne-elexir",
      name: "Nocturne Elexir EDP",
        description: "Smoku, Romantic, Deep",
        volume: "85ml",
        rating: "4.9",
        ratingCount: 712,
        originalPrice: 428.00,
        price: 171.0,
        discount: " -60%",
        image: "/images/parfumes/Nocturne Elexir.png",
    },
    {
      _id: "noir",
      name: "Noir EDP",
      description: "Masculine, Iconic, Classic",
      volume: "90ml",
      rating: "4.9",
      ratingCount: 677,
      originalPrice: 412.00,
      price: 164.00,
      discount: " -60%",
      image: "/images/parfumes/NOIR.png",
    },
  ];

  useEffect(() => {
    setLoading(true);
    try {
      setTimeout(() => {
        setProducts(dummyData);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
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

  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper>
      <Navbar />

      <SectionTitle>Hot Sale</SectionTitle>
      <LineDivider />

      <ProductGrid>
        {products.map((product) => (
          <Card key={product._id}>
            <ProductImageWrapper>
              <DiscountBadge>{product.discount}</DiscountBadge>
              <ProductImage src={product.image} alt={product.name} />
            </ProductImageWrapper>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <DescriptionRow>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductVolume>{product.volume}</ProductVolume>
              </DescriptionRow>
              <Rating>
                ★ {product.rating} <span>({product.ratingCount})</span>
              </Rating>
              <BottomWrapper>
                <PriceWrapper>
                  <OldPrice>${product.originalPrice.toFixed(2)}</OldPrice>
                  <NewPrice>${product.price.toFixed(2)}</NewPrice>
                </PriceWrapper>
                <BuyButton onClick={() => navigate(`/product/${product._id}`)}>
                  BUY NOW
                </BuyButton>
              </BottomWrapper>
            </ProductInfo>
          </Card>
        ))}
      </ProductGrid>

      <Footer />
    </PageWrapper>
  );
};

export default Sale;

