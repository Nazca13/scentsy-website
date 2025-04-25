import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Register from "./pages/Register";
import Collection from "./pages/Collection";
import New from "./pages/New";
import Sale from "./pages/Sale";
import Magazine from "./pages/Magazine";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import MagazineOpsidian from "./pages/MagazineOpsidian";
import MagazineVelvetVerona from "./pages/MagazineVelvetVerona";
import Profile from "./pages/profile";
import Cart from "./pages/Cart";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/new" element={<New />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/magazine" element={<Magazine />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/magazinevelvetverona" element={<MagazineVelvetVerona />} />
      <Route path="/magazineopsidian" element={<MagazineOpsidian />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<AboutPage />} />
      
      {/* Protected admin routes */}
      <Route 
        path="/admin" 
        element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin/products/add" 
        element={user?.isAdmin ? <AddProduct /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;