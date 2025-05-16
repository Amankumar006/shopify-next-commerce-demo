
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetail from "./pages/CollectionDetail";
import WishlistPage from "./pages/WishlistPage";
import { ShopProvider } from "./context/ShopContext";

function App() {
  return (
    <ShopProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collection/:handle" element={<CollectionDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ShopProvider>
  );
}

export default App;
