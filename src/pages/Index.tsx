
import { useState, useEffect, useRef } from "react";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { MockProduct, MockCollection } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<MockProduct[]>([]);
  const [collections, setCollections] = useState<MockCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reveal on scroll
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [products, fetchedCollections] = await Promise.all([
          getProducts(),
          getCollections()
        ]);
        
        setFeaturedProducts(products.slice(0, 4));
        setCollections(fetchedCollections.slice(0, 4));
        setError(null);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const addToReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <HeroSection />

        {/* Featured Collections */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div 
              ref={addToReveal}
              className="reveal flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Collections
                </p>
                <h2 className="font-serif text-4xl md:text-5xl">Shop by Category</h2>
              </div>
              <Link 
                to="/collections" 
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 link-underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {collections.map((collection, index) => (
                  <Link 
                    key={collection.id}
                    to={`/collection/${collection.handle}`}
                    ref={addToReveal}
                    className="reveal group"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                      <img 
                        src={collection.image?.url || '/placeholder.svg'}
                        alt={collection.image?.altText || collection.title}
                        className="w-full h-full object-cover transition-all duration-700 ease-out-expo group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl text-background">{collection.title}</h3>
                        <p className="text-background/80 text-sm mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore <ArrowRight className="h-3 w-3" />
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-secondary/50">
          <div className="container-custom">
            <div 
              ref={addToReveal}
              className="reveal flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Curated Selection
                </p>
                <h2 className="font-serif text-4xl md:text-5xl">Featured Products</h2>
              </div>
              <Link 
                to="/products" 
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 link-underline"
              >
                Shop All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
              </div>
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-destructive">{error}</p>
              </div>
            )}

            {!isLoading && !error && (
              <>
                {featuredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product: MockProduct, index) => (
                      <div
                        key={product.id}
                        ref={addToReveal}
                        className="reveal"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No products found.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Brand Story / Values */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div 
              ref={addToReveal}
              className="reveal max-w-3xl mx-auto text-center mb-20"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Our Promise
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Crafted with Care,<br />Delivered with Love
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in the power of simplicity and the beauty of well-crafted products. 
                Every piece in our collection is thoughtfully curated to bring elegance to your everyday life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div 
                ref={addToReveal}
                className="reveal text-center p-8 border border-border bg-background hover:shadow-lg transition-shadow duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full">
                  <Truck className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-3">Free Shipping</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Complimentary shipping on all orders above ₹999. Fast and reliable delivery across India.
                </p>
              </div>
              
              <div 
                ref={addToReveal}
                className="reveal text-center p-8 border border-border bg-background hover:shadow-lg transition-shadow duration-500"
                style={{ transitionDelay: '100ms' }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full">
                  <Shield className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-3">Secure Payments</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Shop with confidence. All transactions are encrypted and your data is always protected.
                </p>
              </div>
              
              <div 
                ref={addToReveal}
                className="reveal text-center p-8 border border-border bg-background hover:shadow-lg transition-shadow duration-500"
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full">
                  <RotateCcw className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl mb-3">Easy Returns</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Not satisfied? Return within 30 days for a full refund. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section 
          ref={addToReveal}
          className="reveal py-24 bg-foreground text-background"
        >
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4">
                Stay Connected
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Join Our Community
              </h2>
              <p className="text-background/70 mb-8">
                Subscribe to receive updates on new arrivals, exclusive offers, and curated style inspiration.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-background text-foreground text-sm uppercase tracking-widest hover:bg-background/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
