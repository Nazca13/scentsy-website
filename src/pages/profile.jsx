import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ProfileContainer = styled.div`
  background-color: #000;
  color: white;
  font-family: 'Georgia', serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TopLine = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 1px;
  background-color: white;
`;

const BottomLine = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: white;
`;

const WelcomeText = styled.div`
  font-size: 20px;
  letter-spacing: 5px;
  margin-bottom: 5px;
  color: #fff;
  text-align: center;
`;

const NameText = styled.div`
  font-size: 40px;
  letter-spacing: 10px;
  color: #D6B341;
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
`;

const ProfilePage = () => {
  const userName = "ANNABELLE"; 

  return (
    <ProfileContainer>
      <Navbar /> 
      
      <ContentWrapper>
        <TopLine />
        
        <div style={{ textAlign: 'center' }}>
          <WelcomeText>WELCOME</WelcomeText>
          <NameText>{userName}</NameText>
        </div>
        
        <BottomLine />
      </ContentWrapper>
      
      <Footer /> 
    </ProfileContainer>
  );
};

export default ProfilePage;