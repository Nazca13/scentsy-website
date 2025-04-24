import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 80px;
  background-color: #0e0e0e;
  min-height: 100vh;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 30px;
`;

const CartItemsContainer = styled.div`
  flex: 3;
`;

const CartItem = styled.div`
  background-color: #161616;
  border-radius: 8px;
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 2;
`;

const ProductName = styled.h3`
  margin: 0 0 8px 0;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: #fff;
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DetailInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const SummaryWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 84px; /* Adjust this to align vertically */
`;

const SummaryCard = styled.div`
  background-color: #161616;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 300px;
  margin-left: 10px;
  margin-bottm: 100px;
`;

const SummaryTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  background-color: red;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
`;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Nocturne Elexir EDP',  price: 171, image: '/images/parfumes/BLOOM OPSIDIAN.png' },
    { id: 2, name: 'Noir EDP',price: 164, image: '/images/noir.png' },
    { id: 3, name: 'Bloom Opsidan',price: 163, image: '/images/bloom.png' },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  

  return (
    <Container>
      <CartItemsContainer>
        <Title>Shoopping cart items</Title>
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ProductImage src={item.image} alt={item.name} />
            <ProductInfo>
              <Label>Product</Label>
              <ProductName>{item.name}</ProductName>
              <RemoveButton onClick={() => handleRemove(item.id)}>
                <img src="/icons/remove.png" alt="Remove" width="16" height="16" />
                Remove
              </RemoveButton>
            </ProductInfo>
            <DetailInfo>
              <Label>Quantity</Label>
              <div>1</div>
            </DetailInfo>
            <DetailInfo>
              <Label>Price</Label>
              <div>${item.price.toFixed(2)}</div>
            </DetailInfo>
          </CartItem>
        ))}
      </CartItemsContainer>

      <SummaryWrapper>
        <SummaryCard>
          <SummaryTitle>Summary</SummaryTitle>
          <SummaryItem>
            <div>Total Products :</div>
            <div>${totalPrice.toFixed(2)}</div>
          </SummaryItem>
          <SummaryItem>
            <div>Total Products :</div>
            <div>{cartItems.length}</div>
          </SummaryItem>
          <SummaryItem>
            <div>Total :</div>
            <div>${totalPrice.toFixed(2)}</div>
          </SummaryItem>
          <CheckoutButton>CHECKOUT</CheckoutButton>
        </SummaryCard>
      </SummaryWrapper>
    </Container>
  );
};

export default CartPage;
