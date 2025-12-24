
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-3xl tracking-tight">
              Élégance
            </Link>
            <p className="text-background/60 mt-4 text-sm leading-relaxed max-w-xs">
              Curating timeless pieces that elevate your everyday style. Quality craftsmanship meets modern design.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="p-2 border border-background/20 hover:border-background/60 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a 
                href="#" 
                className="p-2 border border-background/20 hover:border-background/60 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a 
                href="#" 
                className="p-2 border border-background/20 hover:border-background/60 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-background/60 hover:text-background transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-background/60 hover:text-background transition-colors text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/60 hover:text-background transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/60 hover:text-background transition-colors text-sm">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-6">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/60 hover:text-background transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:hello@elegance.com" 
                  className="text-background/60 hover:text-background transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Mail className="h-3 w-3" /> hello@elegance.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-sm">
            © {year} Élégance. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/40">
            <Link to="/about" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
