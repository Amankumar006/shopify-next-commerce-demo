
import { mockProducts, generateCartId, generateLineId, MockCart } from './mockData';

// Mock implementation using local data instead of Shopify API

// Get all products
export async function getProducts() {
  // Return mock products with slight delay to simulate network request
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 300);
  });
}

// Get a specific product by handle
export async function getProductByHandle(handle: string) {
  // Return mock product by handle with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.handle === handle);
      resolve(product || null);
    }, 300);
  });
}

// Mock local storage for cart
const CART_STORAGE_KEY = 'mock_cart_data';

// Helper to retrieve cart from storage
const getStoredCart = (): MockCart | null => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

// Helper to save cart to storage
const saveCartToStorage = (cart: MockCart): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Create a cart
export async function createCart() {
  // Check if we already have a cart in storage
  const existingCart = getStoredCart();
  if (existingCart) {
    return existingCart;
  }

  // Create a new mock cart
  const newCart: MockCart = {
    id: generateCartId(),
    checkoutUrl: 'https://checkout.example.com/mock-checkout',
    lines: { edges: [] },
    estimatedCost: {
      subtotalAmount: {
        amount: "0.00",
        currencyCode: "USD"
      },
      totalAmount: {
        amount: "0.00",
        currencyCode: "USD"
      }
    }
  };

  // Save to storage
  saveCartToStorage(newCart);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newCart);
    }, 300);
  });
}

// Add items to cart
export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const cart = getStoredCart();
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Process each line
  for (const line of lines) {
    const { merchandiseId, quantity } = line;
    
    // Extract product ID from variantId
    const variantIdParts = merchandiseId.split('/');
    const variantIdNumber = variantIdParts[variantIdParts.length - 1];
    
    // Find the variant in our mock data
    let foundVariant = null;
    let foundProduct = null;
    
    for (const product of mockProducts) {
      const variant = product.variants.edges.find(
        edge => edge.node.id.includes(variantIdNumber)
      );
      if (variant) {
        foundVariant = variant.node;
        foundProduct = product;
        break;
      }
    }
    
    if (!foundVariant || !foundProduct) {
      continue; // Skip if variant not found
    }
    
    // Check if this variant is already in the cart
    const existingLineIndex = cart.lines.edges.findIndex(
      edge => edge.node.merchandise.id === merchandiseId
    );
    
    if (existingLineIndex >= 0) {
      // Update quantity if already in cart
      cart.lines.edges[existingLineIndex].node.quantity += quantity;
    } else {
      // Add new line item
      cart.lines.edges.push({
        node: {
          id: generateLineId(),
          quantity,
          merchandise: {
            id: merchandiseId,
            title: foundVariant.title,
            product: {
              title: foundProduct.title,
              handle: foundProduct.handle
            },
            priceV2: foundVariant.priceV2,
            image: foundVariant.image || foundProduct.images.edges[0]?.node
          }
        }
      });
    }
  }
  
  // Recalculate cart totals
  updateCartTotals(cart);
  
  // Save updated cart
  saveCartToStorage(cart);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cart);
    }, 300);
  });
}

// Remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const cart = getStoredCart();
  if (!cart) {
    throw new Error("Cart not found");
  }
  
  // Remove specified lines
  cart.lines.edges = cart.lines.edges.filter(
    edge => !lineIds.includes(edge.node.id)
  );
  
  // Recalculate cart totals
  updateCartTotals(cart);
  
  // Save updated cart
  saveCartToStorage(cart);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cart);
    }, 300);
  });
}

// Get cart
export async function getCart(cartId: string) {
  const cart = getStoredCart();
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cart);
    }, 300);
  });
}

// Update cart quantity
export async function updateCartQuantity(cartId: string, lineId: string, quantity: number) {
  const cart = getStoredCart();
  if (!cart) {
    throw new Error("Cart not found");
  }
  
  // Find and update the line
  const lineIndex = cart.lines.edges.findIndex(
    edge => edge.node.id === lineId
  );
  
  if (lineIndex >= 0) {
    cart.lines.edges[lineIndex].node.quantity = quantity;
  }
  
  // Recalculate cart totals
  updateCartTotals(cart);
  
  // Save updated cart
  saveCartToStorage(cart);
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cart);
    }, 300);
  });
}

// Helper function to calculate cart totals
function updateCartTotals(cart: MockCart) {
  let subtotal = 0;
  
  cart.lines.edges.forEach(edge => {
    const price = parseFloat(edge.node.merchandise.priceV2.amount);
    const quantity = edge.node.quantity;
    subtotal += price * quantity;
  });
  
  // Update cart totals
  cart.estimatedCost.subtotalAmount.amount = subtotal.toFixed(2);
  cart.estimatedCost.totalAmount.amount = subtotal.toFixed(2);
}
