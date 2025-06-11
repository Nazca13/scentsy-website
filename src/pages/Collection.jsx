import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useProducts } from '../hooks/useProducts';

const PageWrapper = styled.div`
  font-family: "Noto Serif", serif;
  background: #091018;
  color: #F5F5F5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GenderBanner = styled.div`
  width: 100%;
  height: 300px;
  background-image: ${props => props.gender === 'men' 
    ? "url('/images/banner/banner for men.png')" 
    : "url('/images/banner/banner for women.png')"};
  background-size: cover;
  background-position: center;
  margin-bottom: 40px;
  transition: opacity 0.5s ease;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const GenderTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 40px;
`;

const GenderTab = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? '#d6b341' : 'white'};
  font-size: 18px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  padding-bottom: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: #d6b341;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  padding: 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #091018;
  border-radius: 8px;
  overflow: hidden;
  color: white;
  box-shadow: 0 0 6px rgba(214, 179, 65, 0.25);
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100%;
`;

const ProductImageWrapper = styled.div`
  position: relative;
  border: 2px solid #d6b341;
  border-radius: 8px;
  overflow: hidden; 
  width: 100%; 
  aspect-ratio: 1/1; 
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
  gap: 2px;
`;

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

const Collection = () => {
  const [gender, setGender] = useState("men");
  const navigate = useNavigate();
  const { products, loading, error } = useProducts({ gender });

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
    return (
      <PageWrapper>
        <Navbar />
        <div style={{ padding: "20px", color: "red", textAlign: "center" }}>{error}</div>
        <Footer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Navbar />
      <GenderBanner gender={gender} />
      <GenderTabs>
        <GenderTab active={gender === "men"} onClick={() => setGender("men")}>
          MEN
        </GenderTab>
        <GenderTab active={gender === "women"} onClick={() => setGender("women")}>
          WOMEN
        </GenderTab>
      </GenderTabs>

      <ProductGrid>
        {products.map((product) => (
          <Card key={product._id}>
            <ProductImageWrapper>
              {product.discount && <DiscountBadge>{product.discount}</DiscountBadge>}
              <ProductImage 
                src={product.image} 
                alt={product.name} 
                onError={(e) => (e.target.style.display = "none")}
              />
            </ProductImageWrapper>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <DescriptionRow>
                <Rating>★ {product.rating} <span>({product.ratingCount})</span></Rating>
                <ProductVolume>{product.volume}</ProductVolume>
              </DescriptionRow>
              <BottomWrapper>
                <PriceWrapper>
                  <OldPrice>${product.originalPrice?.toFixed(2)}</OldPrice>
                  <NewPrice>${product.price?.toFixed(2)}</NewPrice>
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

export default Collection;