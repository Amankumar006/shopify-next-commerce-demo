
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCollectionByHandle, getProductsByCollection } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MockCollection, MockProduct } from "@/lib/mockData";

export default function CollectionDetail() {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<MockCollection | null>(null);
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sorting and filtering
  const [sortKey, setSortKey] = useState("featured");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function loadCollectionAndProducts() {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        // Get collection details
        const collectionData = await getCollectionByHandle(handle);
        
        if (!collectionData) {
          setError("Collection not found");
          setCollection(null);
          return;
        }
        
        setCollection(collectionData);
        
        // Get products in this collection
        const collectionProducts = await getProductsByCollection(handle);
        setProducts(collectionProducts);
        
        setError(null);
      } catch (err) {
        console.error("Error loading collection:", err);
        setError("Failed to load collection details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCollectionAndProducts();
  }, [handle]);

  // Handle sorting change
  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products];
      
      switch (sortKey) {
        case "price":
          sortedProducts.sort((a, b) => {
            const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
            const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
          });
          break;
        case "title":
          sortedProducts.sort((a, b) => {
            return sortOrder === "asc" 
              ? a.title.localeCompare(b.title) 
              : b.title.localeCompare(a.title);
          });
          break;
        default: // featured - use default order
          break;
      }
      
      setProducts(sortedProducts);
    }
  }, [sortKey, sortOrder]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !collection) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-16">
          <div className="text-center py-10">
            <p className="text-red-500">{error || "Collection not found"}</p>
            <Link 
              to="/collections"
              className="text-primary hover:text-primary/80 underline mt-4 inline-block"
            >
              Browse All Collections
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <main>
        <div className="bg-gray-50 py-8">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/collections">Collections</Link>
              <span>/</span>
              <span className="font-medium text-gray-700">{collection.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{collection.title}</h1>
            <p className="text-gray-600 mt-2">{collection.description}</p>
          </div>
        </div>

        <section className="container-custom py-12">
          {/* Sorting and filtering */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <p className="text-gray-500">{products.length} products</p>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-sm text-gray-500">Sort by:</label>
              <select 
                id="sort"
                className="border rounded-md px-3 py-1.5 text-sm"
                value={`${sortKey}-${sortOrder}`}
                onChange={(e) => {
                  const [key, order] = e.target.value.split('-');
                  setSortKey(key);
                  setSortOrder(order);
                }}
              >
                <option value="featured-asc">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No products found in this collection.</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
