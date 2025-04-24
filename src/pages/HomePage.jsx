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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  font-family: "Noto Serif", serif;
  background-color: black;
  color: white;
  width: 100%;
  overflow-x: hidden;
`;

const Hero = styled.section`
  background: url("/images/background landing.png") center center/cover
    no-repeat;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #fff;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #d6b341;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#D6B341" : "transparent")};
  color: ${(props) => (props.primary ? "#000" : "#fff")};
  border: ${(props) => (props.primary ? "none" : "1px solid white")};
  padding: 12px 30px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? "#b8912f" : "#fff")};
    color: #000;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  text-align: center;
  margin: 60px 0 10px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 198px;
    height: 3px;
    background-color: #d6b341;
    margin: 8px auto 0;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 36px;
  row-gap: 30px;
  padding: 40px 80px;
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

const MagazineSection = styled.section`
  padding: 60px 80px;
`;

const MagazineTitle = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 292px;
    height: 3px;
    background-color: #d6b341;
    margin: 8px auto 0;
  }
`;

const MagazineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5px;
  row-gap: 40px;
  margin-top: 52px;
`;

const MagazineCard = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MagazineImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: contain;
  border-radius: 8px;
`;

const MagazineContent = styled.div`
  padding: 20px;
`;

const MagazineHeadline = styled.h3`
  font-size: 24px;
  color: #fafafa;
  margin-bottom: 1px;
  width: 75%;
  margin-left: 76px;
`;

const MagazineText = styled.p`
  font-size: 12px;
  color: #a09e9e;
  line-height: 1.4;
  width: 72%;
  margin-left: 76px;

  a {
    color: #d6b341;
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
    opacity: 100%;

    &:hover {
      color: #b8912f;
    }
  }
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        _id: "bloom-opsidian",
        name: "Bloom Opsidian EDP",
        description: "Bold, Rare, Exotic",
        price: 208.0,
        originalPrice: 278.0,
        discount: "-25%",
        rating: 4.9,
        ratingCount: 634,
        image: "/images/parfumes/BLOOM OPSIDIAN.png",
        volume: "125 ml",
      },
      {
        _id: "crimson-elan",
        name: "crimson-elan",
        description: "Sensuous, Confident, Bold",
        price: 160.0,
        originalPrice: 198.0,
        discount: "-20%",
        rating: 4.8,
        ratingCount: 410,
        image: "/images/parfumes/Crimson Elan.png",
        volume: "75 ml",
      },
      {
        _id: "cuir-dor",
        name: "Cuir D.OR",
        description: "Exquisite, Signature, Rich",
        price: 138.0,
        originalPrice: 172.0,
        discount: "-20%",
        rating: 4.7,
        ratingCount: 390,
        image: "/images/parfumes/cuir d.or.png",
        volume: "90 ml",
      },
      {
        _id: "royale-saphir",
        name: "Royale Saphir",
        description: "Bright, Clean, Refined",
        price: 148.0,
        originalPrice: 165.0,
        discount: "-10%",
        rating: 4.6,
        ratingCount: 200,
        image: "/images/parfumes/Royale Saphir.png",
        volume: "90 ml",
      },
      {
        _id: "riche-essence",
        name: "Riche Essence",
        description: "Elegant, Subtle, Warm",
        price: 120.0,
        originalPrice: 145.0,
        discount: "-15%",
        rating: 4.8,
        ratingCount: 320,
        image: "/images/parfumes/Riche Essence.png",
        volume: "100 ml",
      },
    ];

    setProducts(dummyData);
    setLoading(false);
  }, []);

  return (
    <Container>
      {loading ? (
        <LoaderOverlay>
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        </LoaderOverlay>
      ) : (
        <>
          <Navbar />
          <Hero>
            <Title>Discover the Essence of Luxury</Title>
            <Sub>Exclusive Perfumes for Every Occasion</Sub>
            <ButtonGroup>
              <Button primary onClick={() => navigate("/collection")}>
                Shop Now
              </Button>
              <Button onClick={() => navigate("/about")}>Learn More</Button>
            </ButtonGroup>
          </Hero>

          <SectionTitle>New Arrival</SectionTitle>
          <ProductGrid>
            {products.map((product) => (
              <Card key={product._id}>
                <ProductImageWrapper>
                  {product.discount && (
                    <DiscountBadge>{product.discount}</DiscountBadge>
                  )}
                  <ProductImage src={product.image} alt={product.name} />
                </ProductImageWrapper>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <DescriptionRow>
                    <Rating>
                      {Array.from({ length: Math.round(product.rating) }).map(
                        (_, index) => (
                          <span key={index}>★</span>
                        )
                      )}
                    </Rating>
                    <ProductVolume>{product.volume}</ProductVolume>
                  </DescriptionRow>
                  <BottomWrapper>
                    <OldPrice>${product.originalPrice}</OldPrice>
                    <NewPrice>${product.price}</NewPrice>
                  </BottomWrapper>
                  <BuyButton>Add to Cart</BuyButton>
                </ProductInfo>
              </Card>
            ))}
          </ProductGrid>

          <MagazineSection>
            <MagazineTitle>Magazine</MagazineTitle>
            <MagazineGrid>
              <MagazineCard>
                <MagazineImage
                  src="/images/magazine/BLOOM OPSIDIAN magazine.png"
                  alt="Magazine 1"
                />
                <MagazineContent>
                  <MagazineHeadline>Obsidian Bloom: A Floral Darkness with a Bold, Sensual Twist</MagazineHeadline>
                  <MagazineText>
                    Obsidian Bloom is a bold and mysterious fragrance where
                    florals take on a deeper, more powerful form. This isn't a
                    typical bouquet it's elegance cloaked in shadow, made for
                    those who love complexity and crave a scent that lingers in
                    memory. Opening with blackcurrant, saffron, and pink pepper,
                    Obsidian Bloom immediately evokes a warm, spicy intrigue.{" "}
                    <a href="/magazine">Read more</a>
                  </MagazineText>
                </MagazineContent>
              </MagazineCard>
              <MagazineCard>
                <MagazineImage
                  src="/images/magazine/Velvet Verona magazine.png"
                  alt="Magazine 2"
                />
                <MagazineContent>
                  <MagazineHeadline>Velvet Verona: A Romantic Classic Wrapped in Warm Sophistication
</MagazineHeadline>
                  <MagazineText>
                  Velvet Verona is a fragrance that whispers timeless romance through a veil of velvet warmth and refined femininity. Inspired by the soul of Verona the city of love this scent feels like poetry made perfume.

It opens with juicy bergamot, ripe plum, and pear nectar, a fruity touch that is both fresh and inviting{" "}
                    <a href="/magazine">Read more</a>
                  </MagazineText>
                </MagazineContent>
              </MagazineCard>
            </MagazineGrid>
          </MagazineSection>
        </>
      )}
      <Footer />
    </Container>
  );
};

export default HomePage;
