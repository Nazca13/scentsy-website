import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/auth';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Noto Serif', serif;
  background-color: #000000;
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
  background: #121212;
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
  gap: 0.8rem;
`;

const ImageSection = styled.div`
  width: 350px;
  background: url('/images/6a773e7338eab9e01c6251945163b3ce.jpg') no-repeat center center;
  background-size: cover;
  opacity: 0.8;
`;

const Logo = styled.div`
  margin-bottom: -12px;
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
  margin: -5px 0 0.5rem 0;
  user-select: none;
  width: 80%;
  text-align: left;
`;

const InputGroup = styled.div`
  position: relative;
  width: 80%;
`;

const InputLabel = styled.label`
  display: block;
  color: #D6B341;
  margin-bottom: 0.4rem;
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

const LoginButton = styled.button`
  width: 80%;
  padding: 0.6rem;
  background-color: #D6B341;
  color: #000000;
  border: none;
  border-radius: 30px;
  font-size: 0.85rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s;
  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  &:hover {
    background-color: #c9a235;
    color: #ffffff;
  }
`;

const SignUpText = styled.div`
  margin-top: 0.5rem;
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
const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await login({ email, password });
      authLogin(user, token);
      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <FormSection>
          <Logo>
            <img src="/images/SCENTSY TITLE.png" alt="SCENTSY Logo" />
          </Logo>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SectionTitle>Sign in</SectionTitle>

          <form onSubmit={handleLogin}>
            <InputGroup>
              <InputLabel>Email</InputLabel>
              <InputField 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputField 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                <img 
                  src={showPassword ? "/images/after.png" : "/images/before.png"} 
                  alt="toggle password visibility" 
                  style={{ width: "20px", height: "16px" }}
                />
              </TogglePassword>
            </InputGroup>

            <LoginButton type="submit">SIGN IN</LoginButton>
          </form>

          <SignUpText>
            Don't have an account?
            <Link to="/register">Sign up now</Link>
          </SignUpText>
        </FormSection>

        <ImageSection />
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;