
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const products = await getProducts();
        setFeaturedProducts(products.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <HeroSection />

        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {featuredProducts.length > 0 ? (
                <div className="product-grid">
                  {featuredProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600">No products found.</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
