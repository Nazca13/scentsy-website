import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/Login';
import RegisterPage from "./pages/Register";
import Collection from "./pages/collection";
import New from "./pages/New";
import Sale from "./pages/Sale";
import MagazinePage from "./pages/Magazine";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import MagazineOpsidian from "./pages/MagazineOpsidian";
import MagazineVelvetVerona from "./pages/MagazineVelvetVerona";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDAshboard";
import AddProduct from "./pages/AddProduct"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/collection" element={<Collection />} />   
      <Route path="/new" element={<New />} /> 
      <Route path="/sale" element={<Sale />} />
      <Route path="/magazine" element={<MagazinePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/magazinevelvetverona" element={<MagazineVelvetVerona />} /> 
      <Route path="/magazineopsidian" element={<MagazineOpsidian />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/about" element={<AboutPage />} /> 
      <Route path="/admin" element={<AdminDashboard />} /> 
      <Route path="/addproduct" element={<AddProduct />} /> 

      </Routes>
  );
}

export default App;