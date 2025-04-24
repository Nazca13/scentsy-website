import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const dummyData = [
  {
    _id: "m1",
    name: "Bloom Opsidian EDP",
    description: "Bold, Error Exotic",
    volume: "125ml",
    rating: "4.9",
    ratingCount: 634,
    originalPrice: 327.0,
    price: 163.0,
    image: "/images/parfumes/BLOOM OPSIDIAN.png",
  },
  {
    _id: "m7",
    name: "Noir EDP",
    description: "Masculine, Iconic, Classic",
    volume: "90ml",
    rating: "4.9",
    ratingCount: 677,
    originalPrice: 412.0,
    price: 164.0,
    image: "/images/parfumes/NOIR.png",
  },
];

const Wrapper = styled.div`
  background-color: black;
  color: white;
  padding: 60px 20px;
  min-height: 100vh;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  border: 2px solid #d6b341;
  padding: 10px;
  background: black;
`;

const Info = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  color: #d6b341;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 20px;
  margin: 20px 0;
`;

const BuyButton = styled.button`
  padding: 10px 30px;
  background-color: #d6b341;
  color: black;
  border: none;
  cursor: pointer;
`;

const ProductDetail = () => {
  const { productId } = useParams();
  const product = dummyData.find((item) => item._id === productId);

  if (!product) {
    return <Wrapper>Product not found.</Wrapper>;
  }

  return (
    <Wrapper>
      <DetailContainer>
        <Image src={product.image} alt={product.name} />
        <Info>
          <Title>{product.name}</Title>
          <p>{product.description}</p>
          <p>Volume: {product.volume}</p>
          <p>
            Rating: {product.rating} ({product.ratingCount} reviews)
          </p>
          <Price>
            ${product.price}{" "}
            <span style={{ textDecoration: "line-through", color: "gray" }}>
              ${product.originalPrice}
            </span>
          </Price>
          <BuyButton onClick={() => alert("BUY clicked!")}>BUY NOW</BuyButton>
        </Info>
      </DetailContainer>
    </Wrapper>
  );
};

export default ProductDetail;
