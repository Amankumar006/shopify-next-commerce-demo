
import { useState, useEffect } from "react";
import { getCollections } from "@/lib/shopify";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { MockCollection } from "@/lib/mockData";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<MockCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollections() {
      try {
        setIsLoading(true);
        const fetchedCollections = await getCollections();
        setCollections(fetchedCollections);
        setError(null);
      } catch (err) {
        console.error("Error loading collections:", err);
        setError("Failed to load collections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCollections();
  }, []);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <div className="bg-gray-50 py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold">Collections</h1>
            <p className="text-gray-600 mt-2">Browse our curated collections</p>
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
              {collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {collections.map((collection) => (
                    <Link 
                      key={collection.id}
                      to={`/collection/${collection.handle}`}
                      className="collection-card group"
                    >
                      <div className="relative h-80 overflow-hidden rounded-lg">
                        <img 
                          src={collection.image?.url || '/placeholder.svg'}
                          alt={collection.image?.altText || collection.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                          <h2 className="text-white text-2xl font-bold">{collection.title}</h2>
                          <p className="text-white/80 mt-2 line-clamp-2">{collection.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-600">No collections found.</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
