
import { useState, useEffect, useRef } from "react";
import { getProducts, getCollections } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import { MockProduct, MockCollection } from "@/lib/mockData";
import { 
  Grid3X3, 
  Grid2X2, 
  LayoutList, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Search,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type GridLayout = "small" | "medium" | "large";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || "";
  const initialCollection = searchParams.get('collection') || "";
  
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [collections, setCollections] = useState<MockCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and sorting
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [gridLayout, setGridLayout] = useState<GridLayout>("medium");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Reveal animation
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        
        // Parse sorting option
        let sortKey: string | undefined;
        let reverse = false;
        
        switch(selectedSort) {
          case "price-low":
            sortKey = "PRICE";
            break;
          case "price-high":
            sortKey = "PRICE";
            reverse = true;
            break;
          case "title-asc":
            sortKey = "TITLE";
            break;
          case "title-desc":
            sortKey = "TITLE";
            reverse = true;
            break;
          default:
            sortKey = undefined;
        }
        
        const [fetchedProducts, fetchedCollections] = await Promise.all([
          getProducts(
            selectedCollection || undefined, 
            searchQuery || undefined,
            sortKey,
            reverse
          ),
          getCollections()
        ]);
        
        // Apply price filter client-side
        const filteredProducts = fetchedProducts.filter(product => {
          const price = parseFloat(product.priceRange.minVariantPrice.amount);
          return price >= priceRange[0] && price <= priceRange[1];
        });
        
        setProducts(filteredProducts);
        setCollections(fetchedCollections);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [searchQuery, priceRange, selectedCollection, selectedSort]);

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
  }, [isLoading, products]);

  const addToReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCollection) params.set('collection', selectedCollection);
    
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 50000]);
    setSelectedCollection('');
    setSelectedSort('featured');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCollection,
    priceRange[0] > 0 || priceRange[1] < 50000,
    selectedSort !== 'featured'
  ].filter(Boolean).length;

  const gridClasses = {
    small: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
    medium: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    large: "grid-cols-1 sm:grid-cols-2 gap-8"
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm uppercase tracking-widest mb-4">Search</h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border-b border-border py-3 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </button>
        </form>
      </div>

      {/* Collections */}
      <Accordion type="single" collapsible defaultValue="collections">
        <AccordionItem value="collections" className="border-none">
          <AccordionTrigger className="text-sm uppercase tracking-widest py-0 hover:no-underline">
            Collections
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-3">
              <button
                className={`block w-full text-left text-sm transition-colors ${
                  selectedCollection === '' 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setSelectedCollection('')}
              >
                All Collections
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  className={`block w-full text-left text-sm transition-colors ${
                    selectedCollection === collection.handle 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setSelectedCollection(collection.handle)}
                >
                  {collection.title}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-sm uppercase tracking-widest py-0 hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-6">
            <div className="space-y-6">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          className="w-full py-3 border border-border text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          onClick={resetFilters}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="container-custom py-16 md:py-24">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 opacity-0 animate-fade-up">
              Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl opacity-0 animate-fade-up delay-100">
              {selectedCollection 
                ? collections.find(c => c.handle === selectedCollection)?.title || 'Products' 
                : 'All Products'}
            </h1>
            {selectedCollection && (
              <p className="text-muted-foreground mt-4 max-w-xl opacity-0 animate-fade-up delay-200">
                {collections.find(c => c.handle === selectedCollection)?.description}
              </p>
            )}
          </div>
        </section>

        <section className="container-custom py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="lg:hidden rounded-none border-border"
                      >
                        <SlidersHorizontal className="h-4 w-4 mr-2" strokeWidth={1.5} />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-2 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="font-serif text-2xl">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-8">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <p className="text-sm text-muted-foreground">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-48 rounded-none border-border text-sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" strokeWidth={1.5} />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="title-asc">Name: A to Z</SelectItem>
                      <SelectItem value="title-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Grid Layout Toggle */}
                  <div className="hidden sm:flex items-center border border-border">
                    <button
                      className={`p-2.5 transition-colors ${
                        gridLayout === 'large' 
                          ? 'bg-foreground text-background' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => setGridLayout('large')}
                      aria-label="Large grid"
                    >
                      <Grid2X2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button
                      className={`p-2.5 transition-colors border-x border-border ${
                        gridLayout === 'medium' 
                          ? 'bg-foreground text-background' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => setGridLayout('medium')}
                      aria-label="Medium grid"
                    >
                      <Grid3X3 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button
                      className={`p-2.5 transition-colors ${
                        gridLayout === 'small' 
                          ? 'bg-foreground text-background' 
                          : 'hover:bg-secondary'
                      }`}
                      onClick={() => setGridLayout('small')}
                      aria-label="Small grid"
                    >
                      <LayoutList className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCollection || searchQuery || priceRange[0] > 0 || priceRange[1] < 50000) && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedCollection && (
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                      onClick={() => setSelectedCollection('')}
                    >
                      {collections.find(c => c.handle === selectedCollection)?.title}
                      <X className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                      onClick={() => setSearchQuery('')}
                    >
                      "{searchQuery}"
                      <X className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 50000) && (
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-sm hover:bg-secondary/80 transition-colors"
                      onClick={() => setPriceRange([0, 50000])}
                    >
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      <X className="h-3 w-3" strokeWidth={1.5} />
                    </button>
                  )}
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                  <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="text-center py-16">
                  <p className="text-destructive mb-4">{error}</p>
                  <Link 
                    to="/"
                    className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    Return to Home
                  </Link>
                </div>
              )}

              {/* Products Grid */}
              {!isLoading && !error && (
                <>
                  {products.length > 0 ? (
                    <div className={`grid ${gridClasses[gridLayout]}`}>
                      {products.map((product, index) => (
                        <div
                          key={product.id}
                          ref={addToReveal}
                          className="reveal"
                          style={{ transitionDelay: `${(index % 6) * 50}ms` }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="font-serif text-2xl mb-2">No products found</p>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your filters or search terms
                      </p>
                      <button
                        onClick={resetFilters}
                        className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors link-underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductsPage;
