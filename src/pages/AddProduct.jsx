import styled from "styled-components";
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'products'
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState({ name: '', description: '', stock: 0, price: '' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const users = [
    {
      name: "Ahmad Fauzi",
      email: "ahmad@example.com",
      joinDate: "15-04-2025"
    },
    {
      name: "Dewi Ayu",
      email: "dewi@example.com",
      joinDate: "14-04-2025"
    }
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    // tambahin logic log out contohkek redirect:
    // window.location.href = "/login";
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = () => {
    if (product.name && product.description && product.price) {
      setLoading(true);
      setTimeout(() => {
        setProducts([...products, { ...product, image }]);
        setProduct({ name: '', description: '', stock: 0, price: '' });
        setImage(null);
        setLoading(false);
      }, 1000);
    }
  };

  const handleDeleteProduct = () => {
    setProduct({ name: '', description: '', stock: 0, price: '' });
    setImage(null);
  };

  const handleRemoveProduct = (index) => {
    setProductToRemove(index);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    const updated = [...products];
    updated.splice(productToRemove, 1);
    setProducts(updated);
    setShowConfirmation(false);
    setProductToRemove(null);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setProductToRemove(null);
  };

  return (
    <Wrapper>
      <Navbar>
        <Logo src="/images/SCENTSY TITLE.png" alt="Logo" />
        <NavBarTop>
          <NavLink 
            href="#" 
            $isActive={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </NavLink>
          <RightItems>
            <NavLink 
              href="#" 
              $isActive={activeTab === 'products'} 
              onClick={() => setActiveTab('products')}
            >
              Products
            </NavLink>
            <IconWrapper onClick={handleLogout}>
              <img className="default" src="/icons/log-out.svg" alt="Logout" />
              <img className="hover" src="/icons/log-out-gold.svg" alt="Logout" />
            </IconWrapper>
          </RightItems>
        </NavBarTop>
      </Navbar>

      <Content>
        {activeTab === 'users' ? (
          <>
            <Title>Active Users</Title>
            {users.map((user, index) => (
              <UserCard key={index}>
                <UserInfo>
                  <strong>Name:</strong> {user.name}
                </UserInfo>
                <UserInfo>
                  <strong>Email:</strong> {user.email}
                </UserInfo>
                <UserInfo>
                  <strong>Password:</strong> ••••••••
                </UserInfo>
                <UserInfo>
                  <strong>Join Date:</strong> {user.joinDate}
                </UserInfo>
                <Divider />
              </UserCard>
            ))}
          </>
        ) : (
          <>
            {loading && <Loader />}
            {showConfirmation && (
              <ConfirmationModal>
                <ConfirmationBox>
                  <p>Are you sure you want to remove this product?</p>
                  <ConfirmationButtons>
                    <ConfirmButton onClick={confirmRemove}>OK</ConfirmButton>
                    <CancelButton onClick={cancelRemove}>Cancel</CancelButton>
                  </ConfirmationButtons>
                </ConfirmationBox>
              </ConfirmationModal>
            )}
            <ProductManagement>
              <LeftCard>
                <ImageUpload>
                  <label htmlFor="imageInput">
                    {image ? (
                      <img src={image} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    ) : (
                      <UploadBox>+</UploadBox>
                    )}
                  </label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </ImageUpload>

                <Label>Name Product :</Label>
                <Input name="name" value={product.name} onChange={handleProductChange} placeholder="Name Product..." />

                <Label>Description :</Label>
                <Textarea name="description" value={product.description} onChange={handleProductChange} placeholder="Description..." />

                <FlexRow>
                  <MiniInput
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleProductChange}
                    placeholder="Stock"
                  />
                  <MiniInput
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleProductChange}
                    placeholder="Price"
                  />
                </FlexRow>

                <ButtonRow>
                  <DeleteButton onClick={handleDeleteProduct}>Delete</DeleteButton>
                  <SaveButton onClick={handleSaveProduct}>Save</SaveButton>
                </ButtonRow>
              </LeftCard>

              <ProductList>
                {products.map((p, i) => (
                  <ProductCard key={i}>
                    <img src={p.image} alt="product" />
                    <strong>{p.name}</strong>
                    <p>{p.description}</p>
                    <p className="price">${p.price}</p>
                    <RemoveButton onClick={() => handleRemoveProduct(i)}>Remove</RemoveButton>
                  </ProductCard>
                ))}
              </ProductList>
            </ProductManagement>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default AdminDashboard;

// Styled Components
const Wrapper = styled.div`
  background-color: #0d0d0d;
  min-height: 100vh;
  color: white;
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0 60px 5px;
  align-items: center;
  background-color: #090909;
  position: relative;
  z-index: 2;
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

const NavBarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -30px;
  padding-bottom: 5px;
`;

const NavLink = styled.a`
  color: ${props => props.$isActive ? '#D6B341' : '#FAFAFA'};
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: all 0.3s ease;
  font-weight: ${props => props.$isActive ? '500' : 'normal'};
  font-size: 18px;

  &:hover {
    color: #D6B341;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: #D6B341;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const RightItems = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img.default {
    display: block;
  }

  img.hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover img.default {
    display: none;
  }

  &:hover img.hover {
    display: block;
  }
`;

const Content = styled.div`
  padding: 40px 60px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #D6B341;
  margin-bottom: 20px;
`;

const UserCard = styled.div`
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

const UserInfo = styled.p`
  margin: 5px 0;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #333;
  margin-top: 15px;
`;

const ProductManagement = styled.div`
  display: flex;
  padding: 20px 0;
`;

const LeftCard = styled.div`
  width: 400px;
  background: #151515;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
  margin-right: 30px;
`;

const ImageUpload = styled.div`
  margin-bottom: 20px;
`;

const UploadBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid gold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  background: #1a1a1a;
  border: 1px solid gold;
  color: white;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  background: #1a1a1a;
  border: 1px solid gold;
  color: white;
  min-height: 80px;
`;

const MiniInput = styled.input`
  width: 48%;
  padding: 8px;
  background: #1a1a1a;
  border: 1px solid gold;
  color: white;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  display: block;
  color: #ccc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButton = styled.button`
  background: #28a745;
  padding: 8px 20px;
  border: none;
  color: white;
  border-radius: 6px;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  padding: 8px 20px;
  border: none;
  color: white;
  border-radius: 6px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  flex: 1;
`;

const ProductCard = styled.div`
  background: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  text-align: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  width: 200px;
  height: 280px;

  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 3px solid gold;
  }

  strong {
    display: block;
    color: gold;
    font-size: 1rem;
    margin-bottom: 6px;
    font-weight: bold;
  }

  p {
    color: #ddd;
    font-size: 0.9rem;
    margin: 6px 0;
  }

  .price {
    color: #d6b341;
    font-weight: bold;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  background: #dc3545;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #c82333;
  }
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

const LoaderAnimation = styled.div`
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

const Loader = () => (
  <LoaderOverlay>
    <LoaderWrapper>
      <LoaderAnimation />
    </LoaderWrapper>
  </LoaderOverlay>
);

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ConfirmationBox = styled.div`
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #d6b341;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;