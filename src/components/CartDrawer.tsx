
import { useShopContext } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    removeProductFromCart,
    updateProductQuantity,
    proceedToCheckout,
    isLoading
  } = useShopContext();

  if (!isCartOpen) return null;

  const cartItems = cart?.lines?.edges || [];
  const cartEmpty = cartItems.length === 0;
  
  const subtotal = cart?.estimatedCost?.subtotalAmount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cart.estimatedCost.subtotalAmount.currencyCode,
      }).format(parseFloat(cart.estimatedCost.subtotalAmount.amount))
    : '$0.00';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40" 
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-hidden flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {cartEmpty ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button onClick={toggleCart}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.map(({ node }) => {
                const price = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: node.merchandise.priceV2.currencyCode,
                }).format(parseFloat(node.merchandise.priceV2.amount));
                
                const imageUrl = node.merchandise.image?.url || '/placeholder.svg';
                
                return (
                  <div key={node.id} className="flex py-4 border-b">
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt={node.merchandise.product.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium line-clamp-2">
                          {node.merchandise.product.title}
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => removeProductFromCart(node.id)}
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">{node.merchandise.title}</p>
                      <div className="flex mt-2 items-center justify-between">
                        <div className="flex items-center border rounded">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none" 
                            onClick={() => updateProductQuantity(node.id, Math.max(1, node.quantity - 1))}
                            disabled={isLoading}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{node.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none" 
                            onClick={() => updateProductQuantity(node.id, node.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-medium">{price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={proceedToCheckout}
                  disabled={isLoading}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={toggleCart}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
