
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionDetail from "./pages/CollectionDetail";
import WishlistPage from "./pages/WishlistPage";
import { ShopProvider } from "./context/ShopContext";
import { PageTransition } from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <About />
          </PageTransition>
        } />
        <Route path="/products" element={
          <PageTransition>
            <ProductsPage />
          </PageTransition>
        } />
        <Route path="/product/:handle" element={
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        } />
        <Route path="/collections" element={
          <PageTransition>
            <CollectionsPage />
          </PageTransition>
        } />
        <Route path="/collection/:handle" element={
          <PageTransition>
            <CollectionDetail />
          </PageTransition>
        } />
        <Route path="/wishlist" element={
          <PageTransition>
            <WishlistPage />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ShopProvider>
      <AnimatedRoutes />
    </ShopProvider>
  );
}

export default App;
