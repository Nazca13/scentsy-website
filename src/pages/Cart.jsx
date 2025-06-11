import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #01080F;
  min-height: 100vh;
  color: #F5F5F5;
`;

const Logo = styled.img`
  height: 240px;
  margin-top: -75px;
  margin-bottom: -70px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const CartContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 30px;
`;

const CartItemsContainer = styled.div`
  flex: 2;
`;

const CartItem = styled.div`
  background-color: #091018;
  border-radius: 8px;
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
`;

const ProductCheckbox = styled.input`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 20px;
  margin-left: 10px;
`;

const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const Volume = styled.div`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 8px;
`;

const RemoveButton = styled.button`
  background: none;
  color: red;
  padding: 0;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  margin-top: 10px;
`;

const DetailInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 14px;
  color: #ccc;
`;

const Value = styled.div`
  font-size: 16px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const QuantityButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
`;

const SummaryWrapper = styled.div`
  flex: 1;
`;

const SummaryCard = styled.div`
  background-color: #091018;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
`;

const SummaryTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: red;
`;

const SummaryItem = styled.div`
  margin-bottom: 16px;
  font-size: 14px;
`;

const SummaryLabel = styled.div`
  color: #ccc;
  margin-bottom: 4px;
`;

const SummaryValue = styled.div`
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  margin-top: 30px;
  background-color: red;
  color: #fff;
  padding: 12px;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  transition: opacity 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #091018;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: red;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: red;
  text-align: center;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.$selected ? '#1a1a1a' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    border-color: red;
  }
`;

const PaymentLabel = styled.label`
  margin-left: 15px;
  font-size: 16px;
  cursor: pointer;
`;

const PaymentIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
`;

const ConfirmButton = styled.button`
  background-color: red;
  color: #fff;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: opacity 0.3s;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const SuccessIcon = styled.div`
  font-size: 50px;
  color: red;
  margin-bottom: 20px;
`;

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { 
      id: 1, 
      name: 'Nocturne Electr EDP', 
      volume: '85ml',
      price: 171.00, 
      quantity: 1,
      image: '/images/parfumes/BLOOM OPSIDIAN.png',
      selected: true
    },
    { 
      id: 2, 
      name: 'Noir EDP',
      volume: '100ml',
      price: 164.00, 
      quantity: 1,
      image: '/images/noir.png',
      selected: true
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) return;
    setShowModal(true);
    setOrderConfirmed(false);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    
    // Remove only selected items after confirmation
    setTimeout(() => {
      setCartItems(cartItems.filter(item => !item.selected));
      setShowModal(false);
    }, 3000);
  };

  const toggleSelectItem = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, selected: !item.selected} : item
    ));
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalProducts = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Container>
      <Logo
        src="/images/SCENTSY TITLE.png"
        alt="SCENTSY Logo"
        onClick={() => navigate('/homepage')}
      />
      
      <CartContent>
        <CartItemsContainer>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <p>Your cart is empty</p>
              <button 
                onClick={() => navigate('/collection')}
                style={{
                  background: 'red',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  marginTop: '20px',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id}>
                <ProductCheckbox 
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelectItem(item.id)}
                />
                <ProductImage src={item.image} alt={item.name} />
                <ProductInfo>
                  <ProductName>{item.name}</ProductName>
                  <Volume>{item.volume}</Volume>
                  <RemoveButton onClick={() => handleRemove(item.id)}>
                    Remove
                  </RemoveButton>
                </ProductInfo>
                <DetailInfo>
                  <Label>Volume</Label>
                  <Value>{item.volume}</Value>
                </DetailInfo>
                <DetailInfo>
                  <Label>Quantity</Label>
                  <QuantityControl>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      -
                    </QuantityButton>
                    <Value>{item.quantity}</Value>
                    <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      +
                    </QuantityButton>
                  </QuantityControl>
                </DetailInfo>
                <DetailInfo>
                  <Label>Price</Label>
                  <Value>${(item.price * item.quantity).toFixed(2)}</Value>
                </DetailInfo>
              </CartItem>
            ))
          )}
        </CartItemsContainer>

        {cartItems.length > 0 && (
          <SummaryWrapper>
            <SummaryCard>
              <SummaryTitle>Summary</SummaryTitle>
              <SummaryItem>
                <SummaryLabel>Selected Products</SummaryLabel>
                <SummaryValue>
                  {selectedItems.map(item => item.name).join(', ')}
                </SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Total Products</SummaryLabel>
                <SummaryValue>{totalProducts}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>${totalPrice.toFixed(2)}</SummaryValue>
              </SummaryItem>
              <CheckoutButton 
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
              >
                CHECKOUT
              </CheckoutButton>
            </SummaryCard>
          </SummaryWrapper>
        )}
      </CartContent>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            
            {!orderConfirmed ? (
              <>
                <ModalTitle>Select Payment Method</ModalTitle>
                
                <PaymentOption 
                  $selected={paymentMethod === 'cash'}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <PaymentIcon>$</PaymentIcon>
                  <PaymentLabel>Cash on Delivery</PaymentLabel>
                </PaymentOption>

                <ConfirmButton onClick={handleConfirmOrder}>
                  CONFIRM ORDER
                </ConfirmButton>
              </>
            ) : (
              <SuccessMessage>
                <SuccessIcon>✓</SuccessIcon>
                <ModalTitle>Order Confirmed!</ModalTitle>
                <p>Your order has been placed successfully.</p>
                <p>Thank you for shopping with SCENTSY!</p>
              </SuccessMessage>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default CartPage;