
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus,
  X,
  ArrowRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Product {
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
      node: ProductImage;
    }>;
  };
  options?: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addProductToCart, isLoading, addToWishlist, removeFromWishlist, isInWishlist } = useShopContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const images = product.images?.edges.map(edge => edge.node) || [];
  const currentImage = images[currentImageIndex] || { url: '/placeholder.svg', altText: product.title };
  
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  const variantId = product.id.replace("gid://shopify/Product/", "");
  const productInWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`;
    addProductToCart(merchandiseId, quantity);
    onClose();
  };

  const handleToggleWishlist = () => {
    if (productInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 rounded-none border-none overflow-hidden">
        <DialogTitle className="sr-only">{product.title} - Quick View</DialogTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-secondary aspect-square md:aspect-auto md:h-full">
            {/* Main Image */}
            <div className="relative h-full overflow-hidden">
              <img
                src={currentImage.url}
                alt={currentImage.altText || product.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/90 hover:bg-background transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/90 hover:bg-background transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-foreground w-6' 
                        : 'bg-foreground/40 hover:bg-foreground/60'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-10 flex flex-col">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-secondary transition-colors z-10"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="flex-1">
              {/* Title & Price */}
              <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl mb-2">{product.title}</h2>
                <p className="text-xl font-medium">{formattedPrice}</p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-4">
                {product.description}
              </p>

              {/* Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-6 mb-8">
                  {product.options.map((option) => (
                    <div key={option.id}>
                      <label className="text-sm uppercase tracking-widest mb-3 block">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: value }))}
                            className={`px-4 py-2 text-sm border transition-colors ${
                              selectedOptions[option.name] === value
                                ? 'bg-foreground text-background border-foreground'
                                : 'border-border hover:border-foreground'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-sm uppercase tracking-widest mb-3 block">
                  Quantity
                </label>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-secondary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-secondary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full rounded-none py-6 text-sm uppercase tracking-widest font-sans"
              >
                <ShoppingBag className="h-4 w-4 mr-2" strokeWidth={1.5} />
                Add to Cart
              </Button>

              <div className="flex gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-1 py-4 border text-sm uppercase tracking-widest transition-colors ${
                    productInWishlist
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  <Heart 
                    className={`h-4 w-4 inline-block mr-2 ${productInWishlist ? 'fill-background' : ''}`} 
                    strokeWidth={1.5} 
                  />
                  {productInWishlist ? 'Saved' : 'Save'}
                </button>

                <Link
                  to={`/product/${product.handle}`}
                  onClick={onClose}
                  className="flex-1 py-4 border border-border hover:border-foreground text-sm uppercase tracking-widest transition-colors text-center flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
