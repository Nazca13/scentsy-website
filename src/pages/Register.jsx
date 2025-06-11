import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {BrowserRouter, useNavigate, Link } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Noto Serif', serif;
  background-color: #01080F;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  touch-action: none;
`;

const LoginBox = styled.div`
  display: flex;
  width: 700px;
  height: 480px;
  background: #091018;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(214, 175, 65, 0.3);
  border: 2px solid #FAFAFA;
  user-select: none;
`;

const FormSection = styled.div`
  width: 350px;
  padding: 1.5rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  gap: 0.5rem; /* Reduced from 0.8rem to move elements up */
`;

const ImageSection = styled.div`
  width: 350px;
  background: url('/images/2774d934efde1c114f3bdefe2c8aecfd.jpg') no-repeat center center;
  background-size: cover;
  opacity: 0.8;
`;

const Logo = styled.div`
  margin-bottom: -18px; /* Adjusted from -12px to move logo up */
  display: flex;
  justify-content: center;

  img {
    height: 120px;
    width: auto;
    object-fit: contain;
  }
`;

const SectionTitle = styled.h2`
  color: #D6B341;
  font-size: 1.1rem;
  font-weight: normal;
  margin: -10px 0 0.3rem 0; /* Adjusted margins to move up */
  user-select: none;
  width: 80%;
  text-align: left;
`;

const InputGroup = styled.div`
  position: relative;
  width: 80%;
  margin-bottom: 
`;

const InputLabel = styled.label`
  display: block;
  color: #D6B341;
  margin-bottom: 0.3rem; 
  font-size: 10px;
  user-select: none;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  padding-right: 2.5rem;
  background: #000000;
  border: 1px solid #FAFAFA;
  border-radius: 15px;
  font-size: 12px;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: #555555;
  }
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 10px;
  top: 30px;
  cursor: pointer;
  color: #D6B341;
  user-select: none;
`;

const RegisterButton = styled.button`
  width: 80%;
  padding: 0.6rem;
  background-color: #D6B341;
  color: #000000;
  border: none;
  border-radius: 30px;
  font-size: 0.85rem;
  cursor: pointer;
  margin-top: 0.2rem; /* Reduced from 0.5rem */
  transition: all 0.3s;
  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  &:hover {
    background-color: #c9a235;
    color: #ffffff;
  }
`;

const SignInText = styled.div`
  margin-top: 0.3rem; /* Reduced from 0.5rem */
  font-size: 10px;
  color: #ffffff;
  user-select: none;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;
    margin-left: 4px;
    transition: color 0.3s;

    &:hover {
      color: #D6B341;
    }
  }
`;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = "public/images/SCENTSY TITLE.png";

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const preventZoom = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('gesturestart', preventZoom);

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('gesturestart', preventZoom);
    };
  }, []);

  const handleRegister = () => {
    console.log("Register:", { name, email, password });
    alert("Registrasi berhasil!");
    navigate("/login"); 
  };

  return (
    <LoginContainer>
      <LoginBox>
        <FormSection>
          <Logo>
            <img src="/images/SCENTSY TITLE.png" alt="SCNTSY Logo" />
          </Logo>

          <SectionTitle>Sign up</SectionTitle>

          <InputGroup>
            <InputLabel>Name</InputLabel>
            <InputField 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Email</InputLabel>
            <InputField 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>Password</InputLabel>
            <InputField 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <TogglePassword onClick={() => setShowPassword(!showPassword)}>
              <img 
                src={showPassword ? "/images/after.png" : "/images/before.png"} 
                alt="toggle password visibility" 
                style={{ width: "20px", height: "16px" }}
              />
            </TogglePassword>
          </InputGroup>

          <RegisterButton onClick={handleRegister}>SIGN UP</RegisterButton>

          <SignInText>
            Already have an account?
            <Link to="/login">Sign in now</Link>
          </SignInText>
        </FormSection>

        <ImageSection />
      </LoginBox>
    </LoginContainer>
  );
};

export default RegisterPage;