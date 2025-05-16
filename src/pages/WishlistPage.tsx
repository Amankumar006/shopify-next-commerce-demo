
import { useShopContext } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Trash, ShoppingCart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, isWishlistLoading, removeFromWishlist, addProductToCart, isLoading } = useShopContext();

  const handleAddToCart = (productId: string) => {
    // Extract variant ID (assuming first variant)
    const variantId = productId.replace("gid://shopify/Product/", "");
    const merchandiseId = `gid://shopify/ProductVariant/${variantId}`;
    addProductToCart(merchandiseId, 1);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        <div className="bg-gray-50 py-8">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-2">Items you've saved for later</p>
          </div>
        </div>

        <section className="container-custom py-12">
          {isWishlistLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Save items you love by clicking the heart icon on products</p>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {wishlist.map((product) => {
                // Format price
                const price = parseFloat(product.priceRange.minVariantPrice.amount);
                const formattedPrice = new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: product.priceRange.minVariantPrice.currencyCode,
                }).format(price);
                
                // Get image
                const imageUrl = product.images?.edges[0]?.node.url || '/placeholder.svg';
                const imageAlt = product.images?.edges[0]?.node.altText || product.title;

                return (
                  <div key={product.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden">
                    <div className="md:w-48 h-48 flex-shrink-0">
                      <img 
                        src={imageUrl} 
                        alt={imageAlt}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-medium">
                          <Link to={`/product/${product.handle}`} className="hover:text-primary">
                            {product.title}
                          </Link>
                        </h2>
                        <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                        <p className="text-lg font-semibold mt-4">{formattedPrice}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button 
                          variant="default" 
                          className="flex items-center gap-2"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={isLoading}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
