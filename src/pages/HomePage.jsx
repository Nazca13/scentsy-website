import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Noto Serif', serif;
  background-color: black;
  color: white;
  width: 100%;
  overflow-x: hidden;
`;

const Hero = styled.section`
  background: url('/images/home-hero.png') center center/cover no-repeat;
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
  color: #D6B341;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? '#D6B341' : 'transparent')};
  color: ${(props) => (props.primary ? '#000' : '#fff')};
  border: ${(props) => (props.primary ? 'none' : '1px solid white')};
  padding: 12px 30px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? '#b8912f' : '#fff')};
    color: #000;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 60px 0 30px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 60px 60px;
`;

const Card = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const ProductName = styled.h3`
  color: #fff;
  font-size: 18px;
`;

const ProductPrice = styled.p`
  color: #D6B341;
  font-weight: bold;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        name: "Amber Woods",
        description: "Warm, woody and subtly spicy fragrance.",
        price: 39.99,
        image: "/images/amber-woods.jpg",
      },
      {
        _id: "2",
        name: "Citrus Bloom",
        description: "Fresh and energizing citrus scent.",
        price: 29.99,
        image: "/images/citrus-bloom.jpg",
      },
      {
        _id: "3",
        name: "Midnight Oud",
        description: "Bold and luxurious for evening wear.",
        price: 49.99,
        image: "/images/midnight-oud.jpg",
      },
    ];
    setProducts(dummyData);

    // Uncomment if backend ready:
    // axios.get('http://localhost:5000/api/products')
    //   .then(res => setProducts(res.data))
    //   .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Navbar />
      <Hero>
        <Sub>FRAGRANCE THAT DEFINE YOU</Sub>
        <Title>The Perfect Fragrance For You</Title>
        <ButtonGroup>
          <Button primary onClick={() => navigate('/shop')}>EXPLORE MORE</Button>
          <Button onClick={() => navigate('/shop')}>BUY NOW</Button>
        </ButtonGroup>
      </Hero>
      <SectionTitle>NEW ARRIVAL</SectionTitle>
      <ProductGrid>
        {products.map(product => (
          <Card key={product._id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <p>{product.description}</p>
            <ProductPrice>${product.price}</ProductPrice>
            <Button primary onClick={() => navigate(`/product/${product._id}`)}>BUY NOW</Button>
          </Card>
        ))}
      </ProductGrid>
      <Footer />
    </Container>
  );
};

export default HomePage;
