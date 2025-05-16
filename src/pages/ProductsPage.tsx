
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
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
        setError("Failed to load products. Please configure your Shopify API credentials.");
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
            <div className="space-y-4 py-10">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Shopify API Configuration</h3>
                  <p className="mb-4">This demo requires Shopify API credentials to be configured:</p>
                  
                  <ol className="list-decimal pl-5 space-y-2 mb-4">
                    <li>Create a Shopify development store</li>
                    <li>Install the "Storefront API" app in your Shopify store</li>
                    <li>Obtain your Storefront API access token</li>
                    <li>Configure the following environment variables:</li>
                  </ol>
                  
                  <div className="bg-gray-100 p-4 rounded font-mono text-sm mb-4">
                    <p>VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token</p>
                    <p>VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com</p>
                  </div>
                  
                  <p>
                    Until you configure these credentials, the application will use
                    placeholder data for demonstration purposes.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <Link 
                  to="/"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Return to Home
                </Link>
              </div>
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
