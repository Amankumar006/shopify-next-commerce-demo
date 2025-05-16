
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Shopify Demo</h3>
            <p className="text-gray-600">
              A headless e-commerce demo using Shopify and Next.js
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-primary">All Products</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-primary">Featured</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-primary">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Our Story</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">Returns Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>© {year} Headless Shopify Demo. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This is a demonstration project and not a real e-commerce store.
          </p>
        </div>
      </div>
    </footer>
  );
}
