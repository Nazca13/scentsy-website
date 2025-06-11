// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import New from "./pages/New";
import Sale from "./pages/Sale";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/profile";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";

import { useAuth } from './contexts/AuthContext';

// Komponen untuk protected routes
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Protected Routes - untuk user yang sudah login */}
      <Route path="/homepage" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/collection" element={
        <ProtectedRoute>
          <Collection />
        </ProtectedRoute>
      } />
      <Route path="/new" element={
        <ProtectedRoute>
          <New />
        </ProtectedRoute>
      } />
      <Route path="/sale" element={
        <ProtectedRoute>
          <Sale />
        </ProtectedRoute>
      } />
      <Route path="/product/:id" element={
        <ProtectedRoute>
          <ProductPage />
        </ProtectedRoute>
      } />
      <Route path="/product/:productId" element={
        <ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />

      {/* Admin Only Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Redirect /admin/product ke /admin supaya tidak error */}
      <Route path="/admin/product" element={<Navigate to="/admin" replace />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
