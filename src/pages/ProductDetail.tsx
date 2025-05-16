
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { MockProduct } from "@/lib/mockData";
import { Star, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<MockProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<MockProduct[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const { 
    addProductToCart, 
    isLoading: isCartLoading, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useShopContext();

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        const productData = await getProductByHandle(handle);
        
        if (!productData) {
          setError("Product not found");
          setProduct(null);
          return;
        }
        
        setProduct(productData);
        
        // Initialize selected options with defaults
        const initialOptions: Record<string, string> = {};
        productData.options.forEach(option => {
          initialOptions[option.name] = option.values[0];
        });
        setSelectedOptions(initialOptions);
        
        // Set default variant if available
        if (productData?.variants?.edges?.length > 0) {
          setSelectedVariant(productData.variants.edges[0].node.id);
        }
        
        // Set default image if available
        if (productData?.images?.edges?.length > 0) {
          setSelectedImage(productData.images.edges[0].node.url);
        }
        
        // Load related products
        const related = await getRelatedProducts(productData.id);
        setRelatedProducts(related);
        
        setError(null);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [handle]);

  useEffect(() => {
    // Find the right variant based on selected options
    if (product && Object.keys(selectedOptions).length > 0) {
      const matchingVariant = product.variants.edges.find(({ node }) => {
        return node.selectedOptions.every(option => 
          selectedOptions[option.name] === option.value
        );
      });
      
      if (matchingVariant) {
        setSelectedVariant(matchingVariant.node.id);
      }
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addProductToCart(selectedVariant, quantity);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-16">
          <div className="text-center py-10">
            <p className="text-red-500">{error || "Product not found"}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const productInWishlist = isInWishlist(product.id);
  
  // Format price
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  // Calculate average rating
  const avgRating = product.reviews && product.reviews.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0;
  const avgRatingFormatted = avgRating.toFixed(1);

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <main className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
              <img 
                src={selectedImage || "/placeholder.svg"} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((image: any, index: number) => (
                  <button 
                    key={index}
                    className={`bg-gray-100 rounded overflow-hidden ${selectedImage === image.node.url ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedImage(image.node.url)}
                  >
                    <img 
                      src={image.node.url} 
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(avgRating)}
              </div>
              <span className="text-sm">
                {avgRating > 0 ? (
                  <>{avgRatingFormatted} ({product.reviews?.length} reviews)</>
                ) : (
                  'No reviews yet'
                )}
              </span>
            </div>
            <p className="text-2xl font-semibold">{formattedPrice}</p>
            
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="prose max-w-none" />
            
            {/* Variant Selector */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <label className="block text-sm font-medium mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className={`px-4 py-2 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary ${
                            selectedOptions[option.name] === value ? 'bg-gray-100 border-primary' : ''
                          }`}
                          onClick={() => handleOptionChange(option.name, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center border rounded-md w-32">
                <button 
                  className="px-3 py-2" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  readOnly 
                  className="w-full text-center border-0 focus:ring-0" 
                />
                <button 
                  className="px-3 py-2" 
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart and Wishlist Buttons */}
            <div className="flex gap-4">
              <Button 
                className="flex-grow py-6"
                size="lg"
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant}
              >
                {isCartLoading ? "Adding..." : "Add to Cart"}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleToggleWishlist}
                className={`py-6 px-6 ${productInWishlist ? 'border-red-200' : ''}`}
              >
                <Heart className={`h-5 w-5 ${productInWishlist ? 'text-red-500 fill-red-500' : ''}`} />
              </Button>
            </div>
            
            {/* Additional Information */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over ₹5000</p>
              </div>
              <div>
                <h3 className="font-medium">Returns</h3>
                <p className="text-gray-600">Free returns within 30 days</p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="pt-4">
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(review.date).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
