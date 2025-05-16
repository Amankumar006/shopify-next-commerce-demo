
import { mockProducts, mockCollections, generateCartId, generateLineId, MockCart, MockProduct, MockCollection, WishlistItem } from './mockData';

// Get all products
export async function getProducts(
  collectionHandle?: string,
  searchQuery?: string,
  sortKey?: string, 
  reverse?: boolean
): Promise<MockProduct[]> {
  // Apply filtering based on parameters
  let filteredProducts = [...mockProducts];
  
  // Filter by collection if specified
  if (collectionHandle) {
    filteredProducts = filteredProducts.filter(product => 
      product.collections.includes(collectionHandle)
    );
  }
  
  // Filter by search query if specified
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply sorting
  if (sortKey) {
    filteredProducts.sort((a, b) => {
      let valueA, valueB;
      
      // Sort based on specified key
      switch(sortKey) {
        case 'TITLE':
          valueA = a.title;
          valueB = b.title;
          break;
        case 'PRICE':
          valueA = parseFloat(a.priceRange.minVariantPrice.amount);
          valueB = parseFloat(b.priceRange.minVariantPrice.amount);
          break;
        case 'BEST_SELLING':
          // Mock implementation - could be based on number of reviews
          valueA = a.reviews?.length || 0;
          valueB = b.reviews?.length || 0;
          break;
        default:
          valueA = a.title;
          valueB = b.title;
      }
      
      const compareResult = typeof valueA === 'string' 
        ? valueA.localeCompare(valueB) 
        : valueA - valueB;
        
      return reverse ? -compareResult : compareResult;
    });
  }
  
  // Return filtered products with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(filteredProducts);
    }, 300);
  });
}

// Get all collections
export async function getCollections(): Promise<MockCollection[]> {
  // Return mock collections with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCollections);
    }, 300);
  });
}

// Get a specific collection by handle
export async function getCollectionByHandle(handle: string): Promise<MockCollection | null> {
  // Return mock collection by handle with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      const collection = mockCollections.find(c => c.handle === handle);
      resolve(collection || null);
    }, 300);
  });
}

// Get a specific product by handle
export async function getProductByHandle(handle: string): Promise<MockProduct | null> {
  // Return mock product by handle with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.handle === handle);
      resolve(product || null);
    }, 300);
  });
}

// Get products by collection handle
export async function getProductsByCollection(collectionHandle: string): Promise<MockProduct[]> {
  // Return mock products filtered by collection with slight delay
  return new Promise(resolve => {
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(p => p.collections.includes(collectionHandle));
      resolve(filteredProducts);
    }, 300);
  });
}

// Get related products
export async function getRelatedProducts(productId: string, limit = 4): Promise<MockProduct[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      // Find the current product
      const currentProduct = mockProducts.find(p => p.id === productId);
      
      if (!currentProduct) {
        resolve([]);
        return;
      }
      
      // Filter products in the same collections, excluding the current product
      let relatedProducts = mockProducts
        .filter(p => 
          p.id !== productId && 
          p.collections.some(c => currentProduct.collections.includes(c))
        );
      
      // If not enough related products by collection, add products with similar tags
      if (relatedProducts.length < limit) {
        const productsWithSimilarTags = mockProducts.filter(p => 
          p.id !== productId && 
          !relatedProducts.includes(p) &&
          p.tags.some(tag => currentProduct.tags.includes(tag))
        );
        
        relatedProducts = [...relatedProducts, ...productsWithSimilarTags];
      }
      
      // Limit the number of related products
      resolve(relatedProducts.slice(0, limit));
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
export async function createCart(): Promise<MockCart> {
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
        currencyCode: "INR"
      },
      totalAmount: {
        amount: "0.00",
        currencyCode: "INR"
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
export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<MockCart> {
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
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<MockCart> {
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
export async function getCart(cartId: string): Promise<MockCart | null> {
  const cart = getStoredCart();
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cart);
    }, 300);
  });
}

// Update cart quantity
export async function updateCartQuantity(cartId: string, lineId: string, quantity: number): Promise<MockCart> {
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

// Wishlist functions

const WISHLIST_STORAGE_KEY = 'mock_wishlist_data';

// Get wishlist
export function getWishlist(): WishlistItem[] {
  const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Get wishlist products
export async function getWishlistProducts(): Promise<MockProduct[]> {
  const wishlist = getWishlist();
  const productIds = wishlist.map(item => item.productId);
  
  return new Promise(resolve => {
    setTimeout(() => {
      const wishlistProducts = mockProducts.filter(product => 
        productIds.includes(product.id)
      );
      resolve(wishlistProducts);
    }, 300);
  });
}

// Add to wishlist
export function addToWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  
  // Check if product already in wishlist
  if (wishlist.some(item => item.productId === productId)) {
    return false;
  }
  
  // Add to wishlist
  wishlist.push({
    productId,
    addedAt: new Date().toISOString()
  });
  
  // Save updated wishlist
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  
  return true;
}

// Remove from wishlist
export function removeFromWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  
  // Find product in wishlist
  const initialLength = wishlist.length;
  const updatedWishlist = wishlist.filter(item => item.productId !== productId);
  
  // Save updated wishlist
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
  
  return updatedWishlist.length < initialLength;
}

// Check if product is in wishlist
export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
}
