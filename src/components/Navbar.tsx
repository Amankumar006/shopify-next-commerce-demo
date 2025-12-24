
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleCart, cartCount } = useShopContext();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById("searchInput")?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl md:text-3xl tracking-tight">
          Élégance
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            to="/" 
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSearchToggle} 
            aria-label="Search"
            className="hover:bg-transparent hover:text-foreground"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Button>
          
          <Link to="/wishlist">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Wishlist"
              className="hover:bg-transparent hover:text-foreground"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart} 
            className="relative hover:bg-transparent hover:text-foreground" 
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] bg-foreground text-background rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSearchToggle} 
            aria-label="Search"
            className="hover:bg-transparent"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Button>
          
          <Link to="/wishlist">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Wishlist"
              className="hover:bg-transparent"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCart} 
            className="relative hover:bg-transparent" 
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] bg-foreground text-background rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMenuToggle} 
            aria-label="Menu"
            className="hover:bg-transparent"
          >
            {isMenuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container-custom py-6 flex flex-col space-y-4 border-t border-border">
          <Link
            to="/"
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/collections"
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      </div>

      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-50 transition-all duration-500 ease-out-expo ${
          isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container-custom h-full flex flex-col justify-center">
          <button
            onClick={handleSearchToggle}
            className="absolute top-6 right-6 p-2 hover:opacity-70 transition-opacity"
            aria-label="Close search"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
          
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto w-full">
            <div className="relative">
              <input
                id="searchInput"
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent border-b-2 border-foreground/20 focus:border-foreground py-6 text-3xl md:text-5xl font-serif placeholder:text-muted-foreground/50 focus:outline-none transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                aria-label="Submit search"
              >
                <Search className="h-8 w-8" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Press Enter to search
            </p>
          </form>
        </div>
      </div>
    </header>
  );
}
