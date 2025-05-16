
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative bg-gray-50">
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Modern E-commerce <span className="text-primary">Reimagined</span>
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">
              Experience the future of online shopping with our headless Shopify + Next.js demo. Fast, flexible, and beautifully designed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[5/4] bg-gradient-to-tr from-primary/20 to-primary/5 rounded-xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Hero product"
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 bg-white/95 backdrop-blur rounded-lg shadow-lg text-center max-w-[80%]">
                  <p className="font-medium text-primary mb-2">Featured Collection</p>
                  <h3 className="text-xl font-bold mb-3">Summer Essentials</h3>
                  <Link to="/products" className="text-sm font-medium text-primary hover:underline">
                    View Collection →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
