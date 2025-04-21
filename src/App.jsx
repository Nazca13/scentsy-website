import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/Login';
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/homepage" element={<HomePage />} />
      {/* <Route path="/test" element={<Test />} /> */}
    </Routes>
  );
}

export default App;