// src/pages/HomePage.jsx
import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import productsData from "../data/products-data";

// --- Hero Section Styles ---
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
  position: relative;
  margin-top: -85px; // Pull under navbar
  z-index: 1;
`;

const HeroSubtitle = styled.p`
  font-size: 14px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  font-size: 64px;
  line-height: 1.2;
  margin: 0 0 40px 0;
  color: white;
  font-weight: normal;

  span {
    display: block;
    font-size: 72px;
    font-weight: bold;
  }
`;

const HeroButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const PrimaryButton = styled.button`
  padding: 12px 30px;
  background-color: #D6B341;
  color: #090909;
  border: 1px solid #D6B341;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: #b8912f;
    border-color: #b8912f;
  }
`;

const SecondaryButton = styled.button`
  padding: 12px 30px;
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// --- General Layout ---
const PageContainer = styled.div`
  font-family: "Noto Serif", serif;
  background-color: #091018;
  color: #F5F5F5;
  width: 100%;
  overflow-x: hidden;
`;

const SectionTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #D6B341;
    margin-top: 10px;
  }
`;

const SectionTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;
  margin-top: 60px;
`;

// --- Products Grid ---
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Ensure 3 columns as per screenshot
  gap: 30px;
  padding: 0 80px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #091018;
  border: 1px solid #333; // Subtle border like screenshot
  border-radius: 2px;
  overflow: hidden;
  color: white;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  padding: 15px;
  box-sizing: border-box;
  transition: transform 0.3s;
  
  &:hover {
    border-color: #D6B341;
  }
`;

const ProductImageWrapper = styled.div`
  position: relative;
  border: 1px solid #D6B341;
  border-radius: 2px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle, #2a2a2a 0%, #000 100%); // Background for image
  margin-bottom: 15px;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ff0000;
  color: white;
  font-weight: bold;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  box-sizing: border-box;
`;

const ProductCat = styled.div`
  color: #D6B341;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
`;

const ProductName = styled.div`
  color: #fff;
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
  font-size: 10px;
  color: red;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceInfo = styled.div`
  text-align: left;
`;

const StrikePrice = styled.div`
  text-decoration: line-through;
  color: #888;
  font-size: 10px;
`;

const FinalPrice = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const BuyBtn = styled.button`
  background: #D6B341;
  color: black;
  border: none;
  padding: 6px 15px;
  font-weight: bold;
  font-size: 10px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 2px;

  &:hover {
    background: #b8912f;
  }
`;

// --- Top Gender Section ---
const TopGenderSection = styled.section`
  padding: 60px 80px;
  text-align: center;
`;

const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GenderCard = styled.div`
  cursor: pointer;
`;

const GenderImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1; // Changed to square to accommodate tall bottles better
  background: radial-gradient(circle at center, #ffd70050 0%, #000 70%);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GenderImage = styled.img`
  width: 80%; // Ensure it doesn't touch edges
  height: 80%; // Ensure it doesn't touch edges
  object-fit: contain; // Ensure full bottle is visible
  transition: transform 0.3s;

  ${GenderCard}:hover & {
    transform: scale(1.05);
  }
`;

const GenderTitle = styled.h3`
  font-size: 18px;
  color: #fff;
  text-align: left;
  margin-bottom: 8px;
  font-weight: bold;
`;

const GenderDesc = styled.p`
  font-size: 12px;
  color: #ccc;
  text-align: left;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const SeeProductBtn = styled.button`
  background: #D6B341;
  color: #000;
  border: none;
  padding: 8px 20px;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  cursor: pointer;
  float: right; // Align to right like screenshot? Or keep regular flow? Screenshot had it below description.
  
  &:hover {
    background: #b8912f;
  }
`;

const HomePage = () => {
  const { products, loading, error } = useProducts({ newArrival: true });
  const navigate = useNavigate();

  // Find featured products for Top Gender section
  // Fallback to indices if IDs don't match exactly, but we updated IDs in data
  const obsidian = productsData.find(p => p._id === 'bloom-opsidian') || productsData[0];
  const verona = productsData.find(p => p._id === 'velvet-verona') || productsData[1];

  if (loading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', paddingTop: '100px' }}>{error}</div>;

  return (
    <PageContainer>
      <Navbar />

      {/* Hero Section */}
      <HeroSection>
        <HeroSubtitle>FRAGRANCE THAT DEFINE YOU</HeroSubtitle>
        <HeroTitle>
          The Perfect<br />
          <span>Fragrance For You</span>
        </HeroTitle>
        <HeroButtonGroup>
          <PrimaryButton onClick={() => document.getElementById('new-arrival').scrollIntoView({ behavior: 'smooth' })}>
            EXPLORE MORE
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/collection')}>
            BUY NOW
          </SecondaryButton>
        </HeroButtonGroup>
      </HeroSection>

      {/* New Arrival Section */}
      <section id="new-arrival">
        <SectionTitleWrapper>
          <SectionTitle>NEW ARRIVAL</SectionTitle>
        </SectionTitleWrapper>

        <ProductGrid>
          {products.slice(0, 6).map((product) => (
            <Card key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
              <ProductImageWrapper>
                {product.discount && <DiscountBadge>{product.discount}</DiscountBadge>}
                <ProductImage src={product.image} alt={product.name} />
              </ProductImageWrapper>

              <ProductCat>{product.name}</ProductCat>
              <ProductName>{product.description}</ProductName>
              <RatingRow>
                ★ {product.rating} ({product.volume})
              </RatingRow>

              <PriceRow>
                <PriceInfo>
                  {product.originalPrice && <StrikePrice>${product.originalPrice}</StrikePrice>}
                  <FinalPrice>${product.price}</FinalPrice>
                </PriceInfo>
                <BuyBtn>BUY NOW</BuyBtn>
              </PriceRow>
            </Card>
          ))}
        </ProductGrid>
      </section>

      {/* Top Gender Section */}
      <TopGenderSection>
        <SectionTitleWrapper>
          <SectionTitle>SCENTSY TOP GENDER</SectionTitle>
        </SectionTitleWrapper>

        <GenderGrid>
          {/* Item 1 */}
          <GenderCard onClick={() => navigate(`/product/${obsidian._id}`)}>
            <GenderImageWrapper>
              <GenderImage src={obsidian.image} alt={obsidian.name} />
            </GenderImageWrapper>
            <GenderTitle>Obsidian Bloom: A Floral Darkness with a Bold, Sensual Twist</GenderTitle>
            <GenderDesc>{obsidian.description}</GenderDesc>
            <SeeProductBtn>SEE PRODUCT</SeeProductBtn>
          </GenderCard>

          {/* Item 2 */}
          <GenderCard onClick={() => navigate(`/product/${verona._id}`)}>
            <GenderImageWrapper>
              <GenderImage src={verona.image} alt={verona.name} />
            </GenderImageWrapper>
            <GenderTitle>Velvet Verona: A Romantic Classic Wrapped in Warm Sophistication</GenderTitle>
            <GenderDesc>{verona.description}</GenderDesc>
            <SeeProductBtn>SEE PRODUCT</SeeProductBtn>
          </GenderCard>
        </GenderGrid>
      </TopGenderSection>

      <Footer />
    </PageContainer>
  );
};
export default HomePage;
