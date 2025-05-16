
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";

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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addProductToCart, isLoading } = useShopContext();
  
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
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`;
    addProductToCart(merchandiseId, 1);
  };

  return (
    <div className="product-card group">
      <Link to={`/product/${product.handle}`} className="block relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-medium mb-2 line-clamp-1">{product.title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{formattedPrice}</span>
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading}
              size="sm"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
