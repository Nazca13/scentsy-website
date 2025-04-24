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
  font-size: 30px;
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

const GenderTitle = styled.h3`
  text-align: start;
  font-size: 28px;
  color: #ffffff;
  margin-top: 40px;
  margin-bottom: 2px;
  margin-left: 84px;
  font-family: "Noto Serif", serif;
`;

const GenderDivider = styled.div`
  width: ${(props) => props.width || "64px"};
  height: 4px;
  background-color: #d6b341;
  margin: 0 auto 25px auto;
  border-radius: 2px;
  margin-left: 84px;
  margin-bottom: 10px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 36px;
  row-gap: 30px;
  padding: 20px 80px;
  justify-content: center;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 20px 30px;
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

const New = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dummyData = [
    {
      _id: "bloom-opsidian",
      name: "Bloom Opsidian EDP",
      description: "Bold, Rare, Exotic",
      price: 163.0,
      originalPrice: 327.0,
      discount: "-45%",
      rating: 4.9,
      ratingCount: 634,
      image: "/images/parfumes/BLOOM OPSIDIAN.png",
      volume: "125 ml",
    },
    {
      _id: "royale-saphir",
      name: "Royale Saphir EDP",
      description: "Bright, Clean, Refined",
      price: 148.0,
      originalPrice: 165.0,
      discount: "-30%",
      rating: 4.9,
      ratingCount: 312,
      image: "/images/parfumes/Royale Saphir.png",
      volume: "90 ml",
    },
    {
      _id: "imperium-nature",
      name: "Imperium Nature EDP",
      description: "Noble, Wild, Majestic",
      volume: "50ml",
      rating: 4.9,
      ratingCount: 482,
      originalPrice: 167.0,
      price: 133.0,
      discount: "-20%",
      image: "/images/parfumes/Imperium Nature.png",
    },
    {
      _id: "velour-noire",
      name: "Velour Noire EDP",
      description: "Smooth, Sensual, NightTime",
      volume: "65ml",
      rating: 4.9,
      ratingCount: 471,
      originalPrice: 187.0,
      price: 149.0,
      discount: "-20%",
      image: "/images/parfumes/VELOUR.png",
    },
    {
      _id: "cuir-dor",
      name: "Cuir D.OR EDP",
      description: "Exquisite, Signature, Rich",
      price: 138.0,
      originalPrice: 172.0,
      discount: "-30%",
      rating: 4.9,
      ratingCount: 390,
      image: "/images/parfumes/cuir d.or.png",
      volume: "90 ml",
    },
    {
      _id: "crimson-elan",
      name: "Crimson Elan EDP",
      description: "Sensuous, Confident, Bold",
      price: 160.0,
      originalPrice: 198.0,
      discount: "-20%",
      rating: 4.9,
      ratingCount: 410,
      image: "/images/parfumes/Crimson Elan.png",
      volume: "75 ml",
    },
    {
      _id: "riche-essence",
      name: "Riche Eseence EDP",
      description: "Radiant, Orange, Rich",
      price: 172.0,
      originalPrice: 199.0,
      discount: "-30%",
      rating: 4.9,
      ratingCount: 475,
      image: "/images/parfumes/Riche Essence.png",
      volume: "95 ml",
    },
    {
      _id: "maison-celeste",
      name: "Maison Celeste EDP",
      description: "Glamour, Soft, Lift",
      price: 135.0,
      originalPrice: 165.0,
      discount: "-20%",
      rating: 4.9,
      ratingCount: 332,
      image: "/images/parfumes/Maison Celeste.png",
      volume: "90 ml",
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(dummyData);
      setLoading(false);
    }, 500);
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
      <SectionTitle>NEW COLLECTION</SectionTitle>
      <LineDivider />

      <GenderTitle>MEN</GenderTitle>
      <GenderDivider width="64px" />
      <ProductGrid>
        {products.slice(0, 4).map((product) => (
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

      <GenderTitle>WOMEN</GenderTitle>
      <GenderDivider width="116px" />
      <ProductGrid>
        {products.slice(4).map((product) => (
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

export default New;
