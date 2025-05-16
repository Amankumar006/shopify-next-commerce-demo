import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useShopContext } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  const { addProductToCart, isLoading: isCartLoading } = useShopContext();

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
        
        // Set default variant if available
        if (productData?.variants?.edges?.length > 0) {
          setSelectedVariant(productData.variants.edges[0].node.id);
        }
        
        // Set default image if available
        if (productData?.images?.edges?.length > 0) {
          setSelectedImage(productData.images.edges[0].node.url);
        }
        
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

  const handleAddToCart = () => {
    if (selectedVariant) {
      addProductToCart(selectedVariant, quantity);
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
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
  
  // Format price
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

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
              <div className="grid grid-cols-4 gap-2">
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
            <p className="text-2xl font-semibold">{formattedPrice}</p>
            
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="prose max-w-none" />
            
            {/* Variant Selector */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option: any) => (
                  <div key={option.id}>
                    <label className="block text-sm font-medium mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => (
                        <button
                          key={value}
                          className="px-4 py-2 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                          // This is simplified. In a real app, you would need to find the variant that matches all selected options
                          onClick={() => {
                            // Find variant with this option value
                            const variant = variants.find((v: any) => 
                              v.node.selectedOptions.some((o: any) => 
                                o.name === option.name && o.value === value
                              )
                            );
                            if (variant) {
                              setSelectedVariant(variant.node.id);
                            }
                          }}
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
            
            {/* Add to Cart Button */}
            <Button 
              className="w-full py-6"
              size="lg"
              onClick={handleAddToCart}
              disabled={isCartLoading || !selectedVariant}
            >
              {isCartLoading ? "Adding..." : "Add to Cart"}
            </Button>
            
            {/* Additional Information */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-medium">Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over $100</p>
              </div>
              <div>
                <h3 className="font-medium">Returns</h3>
                <p className="text-gray-600">Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
