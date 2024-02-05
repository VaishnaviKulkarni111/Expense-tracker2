import { Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import Products from "./pages/Products";
import AuthPage from "./components/Authentication/Auth";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
      
      <Route path="/home" element={<HomePage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
