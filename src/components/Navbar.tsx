
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
    // Implement search functionality
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
    setIsSearchOpen(false);
  };

  return (
    <header className="border-b bg-white">
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl md:text-2xl">
          ShopifyHeadless
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
            All Products
          </Link>
          <Link to="/collections" className="text-gray-600 hover:text-primary transition-colors">
            Collections
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleSearchToggle} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-primary text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleSearchToggle} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/wishlist" className="relative">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-primary text-white rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleMenuToggle} aria-label="Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/collections"
              className="text-gray-600 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-white z-50 p-4 shadow-md">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              id="searchInput"
              type="text"
              placeholder="Search products..."
              className="flex-grow border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">Search</Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="ml-2"
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
