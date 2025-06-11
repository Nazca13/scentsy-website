import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

// Loader Styles
const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 8, 15, 0.8);
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

// Main Container Styles
const Wrapper = styled.div`
  background-color: #01080F;
  color: #F5F5F5;
  font-family: 'Noto Serif', serif;
  min-height: 100vh;
`;

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

// Product Image Styles
const ImageWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  border: 3px solid #d6b341;
  border-radius: 8px;
  object-fit: contain;
  background-color: #000;
`;

const DiscountLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: red;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
`;

// Product Info Styles
const Info = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: bold;
  margin-bottom: 12px;
`;

const PriceRow = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 14px;
  color: #ccc;
  margin-left: 10px;
`;

const Description = styled.p`
  margin-bottom: 12px;
  font-size: 15px;
  color: #eee;
  line-height: 1.5;
`;

const Rating = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  color: #f87171;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const VolumePrice = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  color: #ccc;
`;

// Button Styles
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const QtyButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a1a1a;
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 4px;

  span {
    margin: 0 10px;
    min-width: 20px;
    text-align: center;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #333;
      border-radius: 50%;
    }
  }
`;

const GoldButton = styled.button`
  background-color: #d6b341;
  color: black;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e8c75a;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const AdminButton = styled(GoldButton)`
  background-color: #dc3545;
  color: white;
  
  &:hover {
    background-color: #c82333;
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(id);
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    // Implement your cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`${quantity} ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please login to proceed with purchase");
      navigate("/login");
      return;
    }
    // Implement your checkout logic here
    navigate("/checkout", { state: { product, quantity } });
  };

  const handleEditProduct = () => {
    navigate(`/admin/product/${id}`);
  };

  const handleDeleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Implement your delete API call here
        // await deleteProduct(id);
        alert("Product deleted successfully");
        navigate("/collection");
      } catch (err) {
        alert("Failed to delete product");
        console.error("Error deleting product:", err);
      }
    }
  };

  if (loading) {
    return (
      <LoaderOverlay>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </LoaderOverlay>
    );
  }

  if (error || !product) {
    return (
      <Wrapper>
        <Navbar />
        <DetailContainer>
          <div style={{ color: "white", textAlign: "center", width: "100%", padding: "40px" }}>
            <h2>{error || "Product not found"}</h2>
            <button 
              onClick={() => navigate("/collection")} 
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#d6b341",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Back to Collection
            </button>
          </div>
        </DetailContainer>
        <Footer />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Navbar />
      <DetailContainer>
        <ImageWrapper>
          <ProductImage
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "/images/default-product.jpg";
            }}
          />
          {product.discount && <DiscountLabel>{product.discount}</DiscountLabel>}
        </ImageWrapper>

        <Info>
          <Title>{product.name}</Title>
          
          <PriceRow>
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <OldPrice>${product.originalPrice.toFixed(2)}</OldPrice>
            )}
          </PriceRow>
          
          <Description>{product.description}</Description>
          
          <Rating>
            ★ {product.rating} ({product.reviews} reviews)
          </Rating>
          
          <VolumePrice>
            Volume: {product.volume} • ${product.price.toFixed(2)}
          </VolumePrice>
          
          <ButtonGroup>
            <QtyButton>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </QtyButton>
            
            <GoldButton onClick={handleAddToCart}>Add to Cart</GoldButton>
            <GoldButton onClick={handleBuyNow}>Buy Now</GoldButton>
            
            {user?.role === "admin" && (
              <>
                <GoldButton onClick={handleEditProduct}>Edit Product</GoldButton>
                <AdminButton onClick={handleDeleteProduct}>Delete Product</AdminButton>
              </>
            )}
          </ButtonGroup>
        </Info>
      </DetailContainer>
      <Footer />
    </Wrapper>
  );
};

export default ProductPage;