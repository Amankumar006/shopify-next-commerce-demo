
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    options?: Array<{
      id: string;
      name: string;
      values: string[];
    }>;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addProductToCart, isLoading, addToWishlist, removeFromWishlist, isInWishlist } = useShopContext();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  // Format price
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);
  
  // Get image or placeholder
  const imageUrl = product.images?.edges[0]?.node.url || '/placeholder.svg';
  const imageAlt = product.images?.edges[0]?.node.altText || product.title;
  
  // Extract Shopify ID (remove "gid://shopify/Product/" prefix)
  const variantId = product.id.replace("gid://shopify/Product/", "");
  const productInWishlist = isInWishlist(product.id);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`;
    addProductToCart(merchandiseId, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (productInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group relative bg-background">
        <Link to={`/product/${product.handle}`} className="block">
          {/* Image Container */}
          <div className="aspect-[3/4] overflow-hidden relative bg-secondary">
            <img 
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            
            {/* Overlay Actions - Top Right */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {/* Wishlist Button */}
              <button 
                className={`p-2.5 border transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 ${
                  productInWishlist 
                    ? 'bg-foreground border-foreground opacity-100 translate-x-0' 
                    : 'bg-background/90 border-transparent hover:bg-foreground hover:border-foreground'
                }`} 
                onClick={handleToggleWishlist}
                aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    productInWishlist 
                      ? 'text-background fill-background' 
                      : 'text-foreground hover:text-background'
                  }`} 
                  strokeWidth={1.5}
                />
              </button>

              {/* Quick View Button */}
              <button 
                className="p-2.5 bg-background/90 border border-transparent hover:bg-foreground hover:border-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 delay-75"
                onClick={handleQuickView}
                aria-label="Quick view"
              >
                <Eye 
                  className="h-4 w-4 text-foreground hover:text-background transition-colors" 
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* Quick Add Button - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <Button 
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full rounded-none py-4 text-xs uppercase tracking-widest font-sans bg-foreground hover:bg-foreground/90 transition-colors"
              >
                <ShoppingBag className="h-4 w-4 mr-2" strokeWidth={1.5} />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-5 pb-2">
            <h3 className="font-serif text-lg mb-1 group-hover:opacity-70 transition-opacity duration-300">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
              {product.description}
            </p>
            <p className="text-foreground font-medium tracking-wide">
              {formattedPrice}
            </p>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
