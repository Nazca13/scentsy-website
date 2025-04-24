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
  background: #090909;
  color: white;
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
  outline: none;

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
  background: #1d1d1c;
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
  object-fit: cover; 
  display: block;
  border: 1px solid #d6b341; 
  
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
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
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductName = styled.h6`
  color: #d6b341;
  font-size: 14px;
  margin: 0 0 8px 0;
  text-align: left;
`;

const ProductDescription = styled.p`
  font-size: 11px;
  color: #ccc;
  margin: 0 0 8px 0;
  text-align: left;
  line-height: 1.3;
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProductVolume = styled.div`
  font-size: 10px;
  color: #ccc;
`;

const Rating = styled.div`
  color: #d6b341;
  font-size: 10px;
  margin-bottom: 12px;

  span {
    color: #888;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
`;

const OldPrice = styled.div`
  color: #888;
  text-decoration: line-through;
  font-size: 10px;
`;

const NewPrice = styled.div`
  color: #d6b341;
  font-weight: bold;
  font-size: 14px;
`;

const BuyButton = styled.button`
  background: #d6b341;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;

  &:hover {
    background: #b8912f;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Collection = () => {
  const [gender, setGender] = useState("men");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const genderData = {
    men: {
      products: [
        {
          _id: "bloom-opsidian",
          name: "Bloom Opsidian EDP",
          description: "Bold, Error Exotic",
          volume: "125ml",
          rating: "4.9",
          ratingCount: 634,
          originalPrice: 327.00,
          price: 163.00,
          discount: "-50%",
          image: "/images/parfumes/BLOOM OPSIDIAN.png",
        },
        {
          _id: "velour-noire",
          name: "Velour Noire EDP",
          description: "Smooth, Sensual, NightTime",
          volume: "65ml",
          rating: "4.9",
          ratingCount: 471,
          originalPrice: 187.00,
          price: 149.0,
          discount: "-20%",
          image: "/images/parfumes/VELOUR.png",
        },
        {
          _id: "royale-saphir",
          name: "Royale Saphir EDP",
          description: "Regal, Clean, Refined",
          volume: "65ml",
          rating: "4.9",
          ratingCount: 579,
          originalPrice: 185.00,
          price: 148.0,
          discount: "-20%",
          image: "/images/parfumes/Royale Saphir.png",
        },
        {
          _id: "imperium-nature",
          name: "Imperium Nature EDP",
          description: "Noble, Wild, Majestic",
          volume: "50ml",
          rating: "4.9",
          ratingCount: 482,
          originalPrice: 167.00,
          price: 133.0,
          discount: "-20%",
          image: "/images/parfumes/Imperium Nature.png",
        },
        {
          _id: "jardin-sauvage",
          name: "Jardin Sauvage EDP",
          description: "Fresh, Natural, Bohemian",
          volume: "85ml",
          rating: "4.9",
          ratingCount: 412,
          originalPrice: 180.00,
          price: 135.0,
          discount: "-25%",
          image: "/images/parfumes/Jardin Sauvage.png",
        },
        {
          _id: "nocturne-elexir",
          name: "Nocturne Elexir EDP",
          description: "Smok, Romantic, Deep",
          volume: "85ml",
          rating: "4.9",
          ratingCount: 712,
          originalPrice: 428.00,
          price: 171.00,
          discount: "-60%",
          image: "/images/parfumes/Imperium Nature.png",
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
          discount: "-60%",
          image: "/images/parfumes/NOIR.png",
        },
  
      ]
    },
    women: {
      products: [
        {
          _id: "riche-essence",
          name: "Riche Essence EDP",
          description: "Floral elegance",
          volume: "125ml",
          rating: "4.9",
          ratingCount: 561,
          originalPrice: 247.00,
          price: 172.00,
          discount: "-30%",
          image: "/images/parfumes/Riche Essence.png",
        },
        {
          _id: "crimson-elan",
          name: "Crimson Élan EDP",
          description: "Glamorous, Confident, Rich",
          volume: "75ml",
          rating: "4.9",
          ratingCount: 446,
          originalPrice: 176.00,
          price: 149.00,
          discount: "-20%",
          image: "/images/parfumes/Crimson Elan.png",
        },
        {
          _id: "cuir-dor",
          name: "Cuir D.OR EDP",
          description: "Opulent, SIgnature, Rich",
          volume: "65ml",
          rating: "4.9",
          ratingCount: 411,
          originalPrice: 198.00,
          price: 138.00,
          discount: "-30%",
          image: "/images/parfumes/cuir d.or.png",
        },
        {
          _id: "maison-celeste",
          name: "Maison Celeste EDP",
          description: "Elegant, Soft, Light",
          volume: "50ml",
          rating: "4.9",
          ratingCount: 399,
          originalPrice: 169.00,
          price: 135.00,
          discount: "-20%",
          image: "/images/parfumes/Maison Celeste.png",
        },
        {
          _id: "seraphine-mist",
          name: "Seraphine Mist EDP",
          description: "Peaceful, Feminine, Angelic",
          volume: "45ml",
          rating: "4.9",
          ratingCount: 511,
          originalPrice: 181.00,
          price: 126.00,
          discount: "-30%",
          image: "/images/parfumes/Seraphine Mist.png",
        },
        {
          _id: "velvet-verona",
          name: "Velvet Verona EDP",
          description: "Romantic, Warm, Italian",
          volume: "65ml",
          rating: "4.9",
          ratingCount: 471,
          originalPrice: 189.00,
          price: 132.00,
          discount: "-30%",
          image: "/images/parfumes/Velvet Verona.png",
        },
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [gender]);

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
    <PageWrapper>
      <Navbar />
      
      <GenderBanner gender={gender} />
      
      <GenderTabs>
        <GenderTab 
          active={gender === "men"} 
          onClick={() => setGender("men")}
        >
          MEN
        </GenderTab>
        <GenderTab 
          active={gender === "women"} 
          onClick={() => setGender("women")}
        >
          WOMEN
        </GenderTab>
      </GenderTabs>

      <ProductGrid>
        {genderData[gender].products.map((product) => (
          <Card key={product._id}>
            <ProductImageWrapper>
              {product.discount && <DiscountBadge>{product.discount}</DiscountBadge>}
              <ProductImage 
                src={product.image} 
                alt={product.name} 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </ProductImageWrapper>
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <DescriptionRow>
                <Rating>
                  ★ {product.rating} <span>({product.ratingCount})</span>
                </Rating>
                <ProductVolume>{product.volume}</ProductVolume>
              </DescriptionRow>
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

export default Collection;