
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import { ShopProvider } from "./context/ShopContext";

function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ShopProvider>
  );
}

export default App;
