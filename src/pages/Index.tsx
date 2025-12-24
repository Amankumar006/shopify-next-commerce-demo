
import { useState, useEffect } from "react";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { MockProduct, MockCollection } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  AnimatedSection, 
  AnimatedItem, 
  StaggerContainer, 
  StaggerItem,
  AnimatedLine 
} from "@/components/AnimatedElements";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<MockProduct[]>([]);
  const [collections, setCollections] = useState<MockCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <HeroSection />

        {/* Featured Collections */}
        <section className="py-24 bg-background">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
              <AnimatedSection>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Collections
                </p>
                <h2 className="font-serif text-4xl md:text-5xl">Shop by Category</h2>
              </AnimatedSection>
              <AnimatedItem delay={0.2} direction="left">
                <Link 
                  to="/collections" 
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 link-underline"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimatedItem>
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
              <StaggerContainer 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                staggerDelay={0.15}
              >
                {collections.map((collection) => (
                  <StaggerItem key={collection.id}>
                    <Link 
                      to={`/collection/${collection.handle}`}
                      className="group block"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        <motion.img 
                          src={collection.image?.url || '/placeholder.svg'}
                          alt={collection.image?.altText || collection.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-serif text-2xl text-background">{collection.title}</h3>
                          <motion.p 
                            className="text-background/80 text-sm mt-2 flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            Explore <ArrowRight className="h-3 w-3" />
                          </motion.p>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-secondary/50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4">
              <AnimatedSection>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Curated Selection
                </p>
                <h2 className="font-serif text-4xl md:text-5xl">Featured Products</h2>
              </AnimatedSection>
              <AnimatedItem delay={0.2} direction="left">
                <Link 
                  to="/products" 
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 link-underline"
                >
                  Shop All <ArrowRight className="h-4 w-4" />
                </Link>
              </AnimatedItem>
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
                  <StaggerContainer 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    staggerDelay={0.1}
                  >
                    {featuredProducts.map((product: MockProduct) => (
                      <StaggerItem key={product.id}>
                        <ProductCard product={product} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
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
            <AnimatedSection className="max-w-3xl mx-auto text-center mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Our Promise
              </p>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">
                Crafted with Care,<br />Delivered with Love
              </h2>
              <AnimatedLine className="w-24 mx-auto my-6" />
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in the power of simplicity and the beauty of well-crafted products. 
                Every piece in our collection is thoughtfully curated to bring elegance to your everyday life.
              </p>
            </AnimatedSection>

            <StaggerContainer 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              <StaggerItem>
                <motion.div 
                  className="text-center p-8 border border-border bg-background"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Truck className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-serif text-xl mb-3">Free Shipping</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Complimentary shipping on all orders above ₹999. Fast and reliable delivery across India.
                  </p>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div 
                  className="text-center p-8 border border-border bg-background"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-serif text-xl mb-3">Secure Payments</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Shop with confidence. All transactions are encrypted and your data is always protected.
                  </p>
                </motion.div>
              </StaggerItem>
              
              <StaggerItem>
                <motion.div 
                  className="text-center p-8 border border-border bg-background"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border rounded-full"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RotateCcw className="h-7 w-7 text-foreground" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-serif text-xl mb-3">Easy Returns</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Not satisfied? Return within 30 days for a full refund. No questions asked.
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <NewsletterSection />
      </main>
      
      <Footer />
    </>
  );
};

// Separate component for newsletter section with its own animation
function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      className="py-24 bg-foreground text-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-custom">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="text-sm uppercase tracking-[0.3em] text-background/60 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stay Connected
          </motion.p>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Join Our Community
          </motion.h2>
          <motion.p 
            className="text-background/70 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Subscribe to receive updates on new arrivals, exclusive offers, and curated style inspiration.
          </motion.p>
          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-transparent border border-background/30 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
            />
            <motion.button
              type="submit"
              className="px-8 py-4 bg-background text-foreground text-sm uppercase tracking-widest hover:bg-background/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Index;
