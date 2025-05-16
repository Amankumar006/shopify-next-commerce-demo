
const SHOPIFY_STOREFRONT_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

interface ShopifyRequestProps {
  query: string;
  variables?: Record<string, any>;
}

export async function shopifyFetch<T>({ query, variables = {} }: ShopifyRequestProps): Promise<T> {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      console.error('Shopify API errors:', errors);
      throw new Error(`Shopify API errors: ${errors.map((e: any) => e.message).join(', ')}`);
    }

    return data as T;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw new Error('Error fetching data from Shopify');
  }
}

// Get all products
export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query });
  return response.products.edges.map((edge: any) => edge.node);
}

// Get a specific product by handle
export async function getProductByHandle(handle: string) {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        options {
          id
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query, variables: { handle } });
  return response.productByHandle;
}

// Create a cart
export async function createCart() {
  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query });
  return response.cartCreate.cart;
}

// Add items to cart
export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: {
      cartId,
      lines,
    },
  });
  
  return response.cartLinesAdd.cart;
}

// Remove items from cart
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: {
      cartId,
      lineIds,
    },
  });
  
  return response.cartLinesRemove.cart;
}

// Get cart
export async function getCart(cartId: string) {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    handle
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        estimatedCost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: {
      cartId,
    },
  });
  
  return response.cart;
}

// Update cart quantity
export async function updateCartQuantity(cartId: string, lineId: string, quantity: number) {
  const query = `
    mutation UpdateCartQuantity($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      handle
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({
    query,
    variables: {
      cartId,
      lines: [
        {
          id: lineId,
          quantity,
        },
      ],
    },
  });
  
  return response.cartLinesUpdate.cart;
}
