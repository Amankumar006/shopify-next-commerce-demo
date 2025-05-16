
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MockProduct } from "@/lib/mockData";

const ProductsPage = () => {
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
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
        <div className="bg-gray-50 py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
          </div>
        </div>

        <section className="container-custom py-12">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <Link 
                to="/"
                className="text-primary hover:text-primary/80 underline"
              >
                Return to Home
              </Link>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {products.length > 0 ? (
                <div className="product-grid">
                  {products.map((product: any) => (
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

export default ProductsPage;
