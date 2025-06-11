import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProfile } from "../hooks/useProfile";

// --- Styled Components (diambil dari versi pertama) ---
const ProfileContainer = styled.div`
  background-color: #091018;
  color: #F5F5F5;
  font-family: 'Noto Serif', serif;
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
  padding: 40px 20px;
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-top: 40px;
  width: 100%;
  max-width: 1000px;
  background-color: #0f1924;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
`;

const ProfilePictureContainer = styled.div`
  border: 2px solid gold;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
`;

const ProfileIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`;

const ProfilePicture = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid gold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #D6B341;
  position: relative;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SelectPhotoButton = styled.button`
  background-color: #091018;
  color: #D6B341;
  border: 2px solid gold;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: gold;
    color: black;
  }
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: #D6B341;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`;

const Label = styled.label`
  font-size: 16px;
  color: #ccc;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  background: #1a1a1a;
  border: 1px solid gold;
  color: #fff;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #D6B341;
  color: black;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  &:hover {
    background-color: #b8912f;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 15px;
  color: ${props => props.success ? 'green' : 'red'};
`;

// --- Component ---
const ProfilePage = () => {
  const { profile, loading, error, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setSuccess("Password confirmation does not match.");
      return;
    }

    const updateData = {
      name: formData.name,
      email: formData.email,
      ...(formData.password && { password: formData.password }),
    };

    const result = await updateProfile(updateData);
    if (result?.success) {
      setSuccess("Profile updated successfully");
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } else {
      setSuccess("Failed to update profile");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <ProfileContainer>
      <Navbar />
      <ContentWrapper>
        <ProfileSection>
          {/* LEFT: Avatar */}
          <div>
            <ProfilePictureContainer>
              <ProfileIcon src="/icons/user.svg" alt="User Icon" />
              <ProfilePicture>
                {selectedImage ? (
                  <PreviewImage src={selectedImage} />
                ) : (
                  <PreviewImage src="/default-profile.jpg" />
                )}
              </ProfilePicture>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <SelectPhotoButton onClick={triggerFileSelect}>
                Select Photo
              </SelectPhotoButton>
            </ProfilePictureContainer>
          </div>

          {/* RIGHT: Form */}
          <div>
            <SectionTitle>Profile Settings</SectionTitle>
            <form onSubmit={handleSubmit}>
              <InfoRow>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </InfoRow>

              <InfoRow>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InfoRow>

              <InfoRow>
                <Label>New Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InfoRow>

              <InfoRow>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </InfoRow>

              <Button type="submit">Update Profile</Button>
            </form>

            {(error || success) && (
              <Message success={success && !error}>
                {error || success}
              </Message>
            )}
          </div>
        </ProfileSection>
      </ContentWrapper>
      <Footer />
    </ProfileContainer>
  );
};

export default ProfilePage;
