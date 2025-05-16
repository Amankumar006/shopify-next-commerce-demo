
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Link, useLocation } from "react-router-dom";
import { MockProduct } from "@/lib/mockData";

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || "";
  const initialCollection = searchParams.get('collection') || "";
  
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and sorting
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSort, setSelectedSort] = useState("featured");
  
  // Reset form ref
  const [filterExpanded, setFilterExpanded] = useState(false);

  useEffect(() => {
    async function loadProducts() {
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
          default: // featured
            sortKey = undefined;
        }
        
        // Fetch products with filters
        const fetchedProducts = await getProducts(
          selectedCollection || undefined, 
          searchQuery || undefined,
          sortKey,
          reverse
        );
        
        // Apply price filter client-side
        const filteredProducts = fetchedProducts.filter(product => {
          const price = parseFloat(product.priceRange.minVariantPrice.amount);
          return price >= priceRange[0] && price <= priceRange[1];
        });
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [searchQuery, priceRange, selectedCollection, selectedSort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameters
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

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <div className="bg-gray-50 py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold">All Products</h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <section className="container-custom py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="lg:hidden mb-4">
              <button
                className="w-full bg-gray-100 py-2 px-4 rounded-md text-left flex justify-between items-center"
                onClick={() => setFilterExpanded(!filterExpanded)}
              >
                <span className="font-medium">Filters</span>
                <span>{filterExpanded ? '−' : '+'}</span>
              </button>
            </div>
            
            {/* Filters Sidebar */}
            <div className={`${filterExpanded ? 'block' : 'hidden'} lg:block lg:w-1/4 space-y-6`}>
              <div>
                <h3 className="text-lg font-medium mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="500"
                      className="border rounded px-2 py-1 w-24"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      className="border rounded px-2 py-1 w-24"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                  </div>
                </div>
                
                {/* Sort By */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Sort By</h4>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="title-asc">Name: A to Z</option>
                    <option value="title-desc">Name: Z to A</option>
                  </select>
                </div>
                
                {/* Collections */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Collections</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all-collections"
                        name="collection"
                        checked={selectedCollection === ''}
                        onChange={() => setSelectedCollection('')}
                        className="mr-2"
                      />
                      <label htmlFor="all-collections">All Collections</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="collection-clothing"
                        name="collection"
                        value="clothing"
                        checked={selectedCollection === 'clothing'}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="collection-clothing">Clothing</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="collection-accessories"
                        name="collection"
                        value="accessories"
                        checked={selectedCollection === 'accessories'}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="collection-accessories">Accessories</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="collection-electronics"
                        name="collection"
                        value="electronics"
                        checked={selectedCollection === 'electronics'}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="collection-electronics">Electronics</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="collection-home-living"
                        name="collection"
                        value="home-living"
                        checked={selectedCollection === 'home-living'}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor="collection-home-living">Home & Living</label>
                    </div>
                  </div>
                </div>
                
                {/* Reset Button */}
                <button
                  className="w-full border border-gray-300 rounded-md py-2 mt-4 hover:bg-gray-50"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
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
                  <div className="mb-4">
                    <p className="text-gray-500">{products.length} products found</p>
                  </div>
                  
                  {products.length > 0 ? (
                    <div className="product-grid">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-600">No products found matching your criteria.</p>
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
