
// Mock product data to replace Shopify API calls

export interface MockProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
        image?: {
          url: string;
          altText: string | null;
        };
      };
    }>;
  };
}

export interface MockCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
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
      };
    }>;
  };
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

// Mock products data
export const mockProducts: MockProduct[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Classic White T-Shirt",
    handle: "classic-white-t-shirt",
    description: "A comfortable classic white t-shirt that goes with everything.",
    descriptionHtml: "<p>A comfortable classic white t-shirt that goes with everything.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "1499",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "1499",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
            altText: "Classic White T-Shirt",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
            altText: "Classic White T-Shirt Side View",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Size",
        values: ["S", "M", "L", "XL"]
      },
      {
        id: "option2",
        name: "Color",
        values: ["White"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/101",
            title: "S / White",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "1499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "S" },
              { name: "Color", value: "White" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/102",
            title: "M / White",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "1499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "M" },
              { name: "Color", value: "White" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/103",
            title: "L / White",
            availableForSale: true,
            quantityAvailable: 5,
            priceV2: {
              amount: "1499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "L" },
              { name: "Color", value: "White" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/104",
            title: "XL / White",
            availableForSale: true,
            quantityAvailable: 7,
            priceV2: {
              amount: "1499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "XL" },
              { name: "Color", value: "White" }
            ]
          }
        }
      ]
    }
  },
  {
    id: "gid://shopify/Product/2",
    title: "Designer Jeans",
    handle: "designer-jeans",
    description: "High-quality jeans with a modern fit and premium finish.",
    descriptionHtml: "<p>High-quality jeans with a modern fit and premium finish.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "3999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "3999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=1915&auto=format&fit=crop",
            altText: "Designer Jeans",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2080&auto=format&fit=crop",
            altText: "Designer Jeans Detail",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Size",
        values: ["30", "32", "34", "36"]
      },
      {
        id: "option2",
        name: "Style",
        values: ["Slim", "Regular"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/201",
            title: "30 / Slim",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "3999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "30" },
              { name: "Style", value: "Slim" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/202",
            title: "32 / Regular",
            availableForSale: true,
            quantityAvailable: 12,
            priceV2: {
              amount: "3999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "32" },
              { name: "Style", value: "Regular" }
            ]
          }
        }
      ]
    }
  },
  {
    id: "gid://shopify/Product/3",
    title: "Canvas Backpack",
    handle: "canvas-backpack",
    description: "Durable canvas backpack with leather details, perfect for daily use or short trips.",
    descriptionHtml: "<p>Durable canvas backpack with leather details, perfect for daily use or short trips.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "5999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "5999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop",
            altText: "Canvas Backpack",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
            altText: "Canvas Backpack Inside View",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Color",
        values: ["Brown", "Navy", "Olive"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/301",
            title: "Brown",
            availableForSale: true,
            quantityAvailable: 5,
            priceV2: {
              amount: "5999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Brown" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/302",
            title: "Navy",
            availableForSale: true,
            quantityAvailable: 7,
            priceV2: {
              amount: "5999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Navy" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/303",
            title: "Olive",
            availableForSale: true,
            quantityAvailable: 3,
            priceV2: {
              amount: "5999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Olive" }
            ]
          }
        }
      ]
    }
  },
  {
    id: "gid://shopify/Product/4",
    title: "Wireless Headphones",
    handle: "wireless-headphones",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    descriptionHtml: "<p>Premium wireless headphones with noise cancellation and long battery life.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "10999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "10999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
            altText: "Wireless Headphones",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1818&auto=format&fit=crop",
            altText: "Wireless Headphones Case",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Color",
        values: ["Black", "Silver", "Rose Gold"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/401",
            title: "Black",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "10999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Black" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/402",
            title: "Silver",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "10999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Silver" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/403",
            title: "Rose Gold",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "10999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Rose Gold" }
            ]
          }
        }
      ]
    }
  },
  {
    id: "gid://shopify/Product/5",
    title: "Smart Watch",
    handle: "smart-watch",
    description: "Latest generation smart watch with health monitoring and notification features.",
    descriptionHtml: "<p>Latest generation smart watch with health monitoring and notification features.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "15999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "19999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
            altText: "Smart Watch",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2064&auto=format&fit=crop",
            altText: "Smart Watch on Wrist",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Size",
        values: ["40mm", "44mm"]
      },
      {
        id: "option2",
        name: "Band",
        values: ["Sport", "Leather", "Metal"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/501",
            title: "40mm / Sport",
            availableForSale: true,
            quantityAvailable: 20,
            priceV2: {
              amount: "15999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "40mm" },
              { name: "Band", value: "Sport" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/502",
            title: "44mm / Leather",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "17999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "44mm" },
              { name: "Band", value: "Leather" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/503",
            title: "44mm / Metal",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "19999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "44mm" },
              { name: "Band", value: "Metal" }
            ]
          }
        }
      ]
    }
  },
  {
    id: "gid://shopify/Product/6",
    title: "Premium Coffee Maker",
    handle: "premium-coffee-maker",
    description: "Professional-grade coffee maker for the perfect brew every morning.",
    descriptionHtml: "<p>Professional-grade coffee maker for the perfect brew every morning.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "9999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "9999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
            altText: "Premium Coffee Maker",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1572119865084-43c285814d63?q=80&w=2070&auto=format&fit=crop",
            altText: "Coffee Maker Brewing",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Color",
        values: ["Black", "Stainless Steel"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/601",
            title: "Black",
            availableForSale: true,
            quantityAvailable: 25,
            priceV2: {
              amount: "9999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Black" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/602",
            title: "Stainless Steel",
            availableForSale: true,
            quantityAvailable: 18,
            priceV2: {
              amount: "9999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Stainless Steel" }
            ]
          }
        }
      ]
    }
  }
];

// Mock cart data
let mockCart: MockCart | null = null;
let mockCartId = 0;
let mockLineId = 0;

export const generateCartId = (): string => {
  mockCartId++;
  return `mock-cart-${mockCartId}`;
};

export const generateLineId = (): string => {
  mockLineId++;
  return `mock-line-${mockLineId}`;
};
