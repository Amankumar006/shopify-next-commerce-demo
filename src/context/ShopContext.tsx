import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createCart, getCart, addToCart, removeFromCart, updateCartQuantity } from "@/lib/shopify";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    image?: {
      url: string;
      altText: string | null;
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: CartItem }[] };
  estimatedCost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ShopContextType {
  cart: Cart | null;
  isCartOpen: boolean;
  isLoading: boolean;
  cartCount: number;
  toggleCart: () => void;
  addProductToCart: (merchandiseId: string, quantity: number) => Promise<void>;
  removeProductFromCart: (lineId: string) => Promise<void>;
  updateProductQuantity: (lineId: string, quantity: number) => Promise<void>;
  proceedToCheckout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function useShopContext() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
}

interface ShopProviderProps {
  children: ReactNode;
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Calculate cart count
  const cartCount = cart?.lines?.edges?.reduce(
    (total, item) => total + item.node.quantity,
    0
  ) || 0;

  // Initialize cart on first load
  useEffect(() => {
    const initializeCart = async () => {
      // Check if we have a cart ID in localStorage
      const existingCartId = localStorage.getItem("cartId");
      
      if (existingCartId) {
        try {
          // Try to fetch existing cart
          const existingCart = await getCart(existingCartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        } catch (error) {
          console.log("Could not retrieve cart. Creating new one.");
        }
      }
      
      // Create new cart if no existing cart was found or retrieval failed
      try {
        const newCart = await createCart();
        localStorage.setItem("cartId", newCart.id);
        setCart(newCart);
      } catch (error) {
        console.error("Error creating cart:", error);
        toast({
          title: "Error",
          description: "Could not initialize shopping cart.",
          variant: "destructive",
        });
      }
    };

    initializeCart();
  }, [toast]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addProductToCart = async (merchandiseId: string, quantity: number) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await addToCart(cart.id, [{ merchandiseId, quantity }]);
      setCart(updatedCart);
      toast({
        title: "Success",
        description: "Item added to cart",
      });
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeProductFromCart = async (lineId: string) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeFromCart(cart.id, [lineId]);
      setCart(updatedCart);
      toast({
        title: "Item removed",
        description: "Item removed from cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductQuantity = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await updateCartQuantity(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      toast({
        title: "Error",
        description: "Could not update item quantity",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const proceedToCheckout = () => {
    if (cart?.checkoutUrl) {
      // Since we're using mock data, we'll just show a success message instead of redirecting
      toast({
        title: "Checkout",
        description: "This is a demo store. In a real implementation, you would be redirected to a checkout page.",
      });
      // Simulating checkout by closing the cart and emptying it
      setIsCartOpen(false);
      // In a real implementation, we might clear the cart here or mark it as checked out
    }
  };

  const value = {
    cart,
    isCartOpen,
    isLoading,
    cartCount,
    toggleCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    proceedToCheckout,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
