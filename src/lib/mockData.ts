
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
  collections: string[];
  tags: string[];
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export interface MockCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText: string | null;
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

// Mock collections data
export const mockCollections: MockCollection[] = [
  {
    id: "gid://shopify/Collection/1",
    title: "Clothing",
    handle: "clothing",
    description: "Our latest clothing collection featuring premium materials and designs",
    image: {
      url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
      altText: "Clothing Collection"
    }
  },
  {
    id: "gid://shopify/Collection/2",
    title: "Accessories",
    handle: "accessories",
    description: "Complete your look with our designer accessories",
    image: {
      url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop",
      altText: "Accessories Collection"
    }
  },
  {
    id: "gid://shopify/Collection/3",
    title: "Electronics",
    handle: "electronics",
    description: "Premium electronics for work and entertainment",
    image: {
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
      altText: "Electronics Collection"
    }
  },
  {
    id: "gid://shopify/Collection/4",
    title: "Home & Living",
    handle: "home-living",
    description: "Elevate your living space with our curated home decor selection",
    image: {
      url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1770&auto=format&fit=crop",
      altText: "Home & Living Collection"
    }
  }
];

// Mock products data
export const mockProducts: MockProduct[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Classic White T-Shirt",
    handle: "classic-white-t-shirt",
    description: "A comfortable classic white t-shirt that goes with everything.",
    descriptionHtml: "<p>A comfortable classic white t-shirt that goes with everything. Made from 100% organic cotton for breathability and comfort. Features a classic crew neckline and short sleeves.</p>",
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
    },
    collections: ["clothing"],
    tags: ["essentials", "bestseller", "basics"],
    reviews: [
      {
        id: "review1",
        author: "Rahul Singh",
        rating: 5,
        comment: "Great quality t-shirt. Very comfortable and fits perfectly.",
        date: "2023-04-15"
      },
      {
        id: "review2",
        author: "Priya Sharma",
        rating: 4,
        comment: "Good material but slightly tight around the shoulders.",
        date: "2023-05-22"
      },
      {
        id: "review3",
        author: "Amit Patel",
        rating: 5,
        comment: "My go-to white tee now. Washes well and maintains shape.",
        date: "2023-06-10"
      }
    ]
  },
  {
    id: "gid://shopify/Product/2",
    title: "Designer Jeans",
    handle: "designer-jeans",
    description: "High-quality jeans with a modern fit and premium finish.",
    descriptionHtml: "<p>High-quality jeans with a modern fit and premium finish. Made from durable denim with a touch of stretch for comfort. Features a classic 5-pocket design and button closure.</p>",
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
    },
    collections: ["clothing"],
    tags: ["denim", "trending", "premium"],
    reviews: [
      {
        id: "review4",
        author: "Vikram Mehta",
        rating: 5,
        comment: "Best jeans I've owned. Great fit and very durable.",
        date: "2023-05-05"
      },
      {
        id: "review5",
        author: "Anjali Desai",
        rating: 4,
        comment: "Very comfortable but the color faded slightly after a few washes.",
        date: "2023-06-17"
      }
    ]
  },
  {
    id: "gid://shopify/Product/3",
    title: "Canvas Backpack",
    handle: "canvas-backpack",
    description: "Durable canvas backpack with leather details, perfect for daily use or short trips.",
    descriptionHtml: "<p>Durable canvas backpack with leather details, perfect for daily use or short trips. Features multiple compartments including a padded laptop sleeve, water bottle pockets, and hidden security pocket.</p>",
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
    },
    collections: ["accessories"],
    tags: ["travel", "casual", "bestseller"],
    reviews: [
      {
        id: "review6",
        author: "Meera Joshi",
        rating: 5,
        comment: "This backpack is amazing! So many pockets and extremely durable.",
        date: "2023-04-19"
      },
      {
        id: "review7",
        author: "Rajesh Kumar",
        rating: 5,
        comment: "Perfect for daily commute. Fits my laptop and all essentials easily.",
        date: "2023-05-30"
      },
      {
        id: "review8",
        author: "Neha Verma",
        rating: 4,
        comment: "Good quality but could use more padding on the shoulder straps.",
        date: "2023-07-02"
      }
    ]
  },
  {
    id: "gid://shopify/Product/4",
    title: "Wireless Headphones",
    handle: "wireless-headphones",
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    descriptionHtml: "<p>Premium wireless headphones with noise cancellation and long battery life. Features advanced Bluetooth 5.0 technology, 40mm dynamic drivers for exceptional sound, and up to 30 hours of battery life. Comes with a carrying case.</p>",
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
    },
    collections: ["electronics"],
    tags: ["audio", "premium", "wireless"],
    reviews: [
      {
        id: "review9",
        author: "Suresh Iyer",
        rating: 5,
        comment: "Sound quality is exceptional and noise cancellation works great.",
        date: "2023-05-28"
      },
      {
        id: "review10",
        author: "Divya Malhotra",
        rating: 4,
        comment: "Great battery life but a bit tight on my ears after long use.",
        date: "2023-06-14"
      },
      {
        id: "review11",
        author: "Karan Shah",
        rating: 5,
        comment: "Worth every rupee. The sound is crisp and clear.",
        date: "2023-07-09"
      }
    ]
  },
  {
    id: "gid://shopify/Product/5",
    title: "Smart Watch",
    handle: "smart-watch",
    description: "Latest generation smart watch with health monitoring and notification features.",
    descriptionHtml: "<p>Latest generation smart watch with health monitoring and notification features. Tracks heart rate, steps, sleep, and workouts. Receive notifications, control music, and even take calls. Water-resistant up to 50 meters.</p>",
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
    },
    collections: ["electronics"],
    tags: ["wearable", "fitness", "premium"],
    reviews: [
      {
        id: "review12",
        author: "Ravi Sharma",
        rating: 5,
        comment: "Amazing battery life and health features are super accurate.",
        date: "2023-06-05"
      },
      {
        id: "review13",
        author: "Ananya Gupta",
        rating: 3,
        comment: "Good looking but the app is a bit glitchy sometimes.",
        date: "2023-07-18"
      }
    ]
  },
  {
    id: "gid://shopify/Product/6",
    title: "Premium Coffee Maker",
    handle: "premium-coffee-maker",
    description: "Professional-grade coffee maker for the perfect brew every morning.",
    descriptionHtml: "<p>Professional-grade coffee maker for the perfect brew every morning. Features programmable brewing, temperature control, built-in grinder, and a thermal carafe to keep coffee hot for hours. Makes up to 12 cups of coffee.</p>",
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
    },
    collections: ["home-living"],
    tags: ["kitchen", "appliances", "premium"],
    reviews: [
      {
        id: "review14",
        author: "Arjun Nair",
        rating: 5,
        comment: "Makes amazing coffee and the thermal carafe keeps it hot for hours.",
        date: "2023-05-15"
      },
      {
        id: "review15",
        author: "Pooja Reddy",
        rating: 5,
        comment: "Worth every penny! The built-in grinder makes a huge difference.",
        date: "2023-06-22"
      }
    ]
  },
  {
    id: "gid://shopify/Product/7",
    title: "Handcrafted Leather Wallet",
    handle: "handcrafted-leather-wallet",
    description: "Premium genuine leather wallet with multiple compartments and RFID protection.",
    descriptionHtml: "<p>Premium genuine leather wallet with multiple compartments and RFID protection. Features 8 card slots, 2 bill compartments, and a coin pocket. Each wallet is handcrafted by skilled artisans using traditional techniques.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "2499",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "2499",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop",
            altText: "Handcrafted Leather Wallet",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1887&auto=format&fit=crop",
            altText: "Leather Wallet Open View",
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
        values: ["Brown", "Black", "Tan"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/701",
            title: "Brown",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "2499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Brown" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/702",
            title: "Black",
            availableForSale: true,
            quantityAvailable: 12,
            priceV2: {
              amount: "2499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Black" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/703",
            title: "Tan",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "2499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Tan" }
            ]
          }
        }
      ]
    },
    collections: ["accessories"],
    tags: ["leather", "handcrafted", "essentials"],
    reviews: [
      {
        id: "review16",
        author: "Anil Kumar",
        rating: 5,
        comment: "Excellent quality leather and craftsmanship. Love the RFID protection.",
        date: "2023-07-02"
      },
      {
        id: "review17",
        author: "Sanjay Mehta",
        rating: 4,
        comment: "Great wallet but took some time to break in.",
        date: "2023-07-25"
      }
    ]
  },
  {
    id: "gid://shopify/Product/8",
    title: "Silk Saree",
    handle: "silk-saree",
    description: "Traditional handwoven silk saree with intricate zari work and rich colors.",
    descriptionHtml: "<p>Traditional handwoven silk saree with intricate zari work and rich colors. Made by skilled artisans using time-honored techniques. Comes with a matching blouse piece.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "8999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "8999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1610189352640-8243fcc00841?q=80&w=2070&auto=format&fit=crop",
            altText: "Silk Saree",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1610189352640-8243fcc00841?q=80&w=2070&auto=format&fit=crop",
            altText: "Silk Saree Detail",
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
        values: ["Red", "Blue", "Green", "Purple"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/801",
            title: "Red",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "8999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Red" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/802",
            title: "Blue",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "8999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Blue" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/803",
            title: "Green",
            availableForSale: true,
            quantityAvailable: 7,
            priceV2: {
              amount: "8999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Green" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/804",
            title: "Purple",
            availableForSale: true,
            quantityAvailable: 6,
            priceV2: {
              amount: "8999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Color", value: "Purple" }
            ]
          }
        }
      ]
    },
    collections: ["clothing"],
    tags: ["traditional", "handcrafted", "premium"],
    reviews: [
      {
        id: "review18",
        author: "Lakshmi Rao",
        rating: 5,
        comment: "Stunning saree with beautiful craftsmanship. The zari work is exquisite.",
        date: "2023-06-12"
      },
      {
        id: "review19",
        author: "Sunita Patil",
        rating: 5,
        comment: "Received so many compliments when I wore this. Quality is excellent.",
        date: "2023-07-30"
      }
    ]
  },
  {
    id: "gid://shopify/Product/9",
    title: "Smart LED TV",
    handle: "smart-led-tv",
    description: "4K Ultra HD Smart LED TV with voice control and streaming apps.",
    descriptionHtml: "<p>4K Ultra HD Smart LED TV with voice control and streaming apps. Features Dolby Vision, HDR10, and premium sound quality. Pre-installed with Netflix, Prime Video, Disney+, and other popular streaming services.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "42999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "59999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
            altText: "Smart LED TV",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
            altText: "Smart TV Interface",
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
        values: ["43 inch", "50 inch", "55 inch"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/901",
            title: "43 inch",
            availableForSale: true,
            quantityAvailable: 12,
            priceV2: {
              amount: "42999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "43 inch" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/902",
            title: "50 inch",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "49999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "50 inch" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/903",
            title: "55 inch",
            availableForSale: true,
            quantityAvailable: 5,
            priceV2: {
              amount: "59999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "55 inch" }
            ]
          }
        }
      ]
    },
    collections: ["electronics"],
    tags: ["entertainment", "premium", "home"],
    reviews: [
      {
        id: "review20",
        author: "Deepak Sinha",
        rating: 5,
        comment: "Picture quality is superb and the smart features work flawlessly.",
        date: "2023-06-08"
      },
      {
        id: "review21",
        author: "Kavita Menon",
        rating: 4,
        comment: "Great TV but the remote could be more intuitive.",
        date: "2023-07-15"
      },
      {
        id: "review22",
        author: "Manoj Tiwari",
        rating: 5,
        comment: "Best TV in this price range. Sound quality is exceptional.",
        date: "2023-08-03"
      }
    ]
  },
  {
    id: "gid://shopify/Product/10",
    title: "Handmade Ceramic Dinner Set",
    handle: "handmade-ceramic-dinner-set",
    description: "Beautiful handcrafted ceramic dinner set with traditional Indian designs.",
    descriptionHtml: "<p>Beautiful handcrafted ceramic dinner set with traditional Indian designs. Each piece is hand-painted by skilled artisans. The set includes 4 dinner plates, 4 side plates, 4 bowls, and 4 mugs.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "7499",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "7499",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=1974&auto=format&fit=crop",
            altText: "Handmade Ceramic Dinner Set",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?q=80&w=1974&auto=format&fit=crop",
            altText: "Ceramic Dinner Set Detail",
            width: 800,
            height: 800
          }
        }
      ]
    },
    options: [
      {
        id: "option1",
        name: "Design",
        values: ["Floral", "Geometric", "Traditional"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1001",
            title: "Floral",
            availableForSale: true,
            quantityAvailable: 8,
            priceV2: {
              amount: "7499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Design", value: "Floral" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1002",
            title: "Geometric",
            availableForSale: true,
            quantityAvailable: 6,
            priceV2: {
              amount: "7499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Design", value: "Geometric" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1003",
            title: "Traditional",
            availableForSale: true,
            quantityAvailable: 7,
            priceV2: {
              amount: "7499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Design", value: "Traditional" }
            ]
          }
        }
      ]
    },
    collections: ["home-living"],
    tags: ["kitchen", "handcrafted", "home-decor"],
    reviews: [
      {
        id: "review23",
        author: "Shweta Agarwal",
        rating: 5,
        comment: "Absolutely beautiful! The craftsmanship is outstanding.",
        date: "2023-05-20"
      },
      {
        id: "review24",
        author: "Rohit Sharma",
        rating: 4,
        comment: "Love the design but one plate arrived with a small chip.",
        date: "2023-06-30"
      }
    ]
  },
  {
    id: "gid://shopify/Product/11",
    title: "Organic Cotton Bedsheet Set",
    handle: "organic-cotton-bedsheet-set",
    description: "Luxurious 400 thread count organic cotton bedsheet set for ultimate comfort.",
    descriptionHtml: "<p>Luxurious 400 thread count organic cotton bedsheet set for ultimate comfort. Includes 1 fitted sheet, 1 flat sheet, and 2 pillowcases. Made from GOTS-certified organic cotton that's soft, durable, and eco-friendly.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "3999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "4999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2069&auto=format&fit=crop",
            altText: "Organic Cotton Bedsheet Set",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=2069&auto=format&fit=crop",
            altText: "Bedsheet Detail",
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
        values: ["Single", "Double", "Queen", "King"]
      },
      {
        id: "option2",
        name: "Color",
        values: ["White", "Ivory", "Grey", "Blue"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1101",
            title: "Single / White",
            availableForSale: true,
            quantityAvailable: 20,
            priceV2: {
              amount: "3999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "Single" },
              { name: "Color", value: "White" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1102",
            title: "Queen / Blue",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "4499",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "Queen" },
              { name: "Color", value: "Blue" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1103",
            title: "King / Grey",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "4999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "King" },
              { name: "Color", value: "Grey" }
            ]
          }
        }
      ]
    },
    collections: ["home-living"],
    tags: ["bedroom", "organic", "premium"],
    reviews: [
      {
        id: "review25",
        author: "Maya Reddy",
        rating: 5,
        comment: "Softest sheets I've ever used. Gets better with each wash.",
        date: "2023-07-05"
      },
      {
        id: "review26",
        author: "Vivek Bajaj",
        rating: 5,
        comment: "Excellent quality and the organic certification is a plus.",
        date: "2023-08-12"
      }
    ]
  },
  {
    id: "gid://shopify/Product/12",
    title: "Handmade Leather Sandals",
    handle: "handmade-leather-sandals",
    description: "Comfortable handcrafted leather sandals made by skilled artisans.",
    descriptionHtml: "<p>Comfortable handcrafted leather sandals made by skilled artisans. Features cushioned footbed, adjustable straps, and durable non-slip soles. Perfect for everyday wear with classic timeless design.</p>",
    priceRange: {
      minVariantPrice: {
        amount: "1999",
        currencyCode: "INR"
      },
      maxVariantPrice: {
        amount: "1999",
        currencyCode: "INR"
      }
    },
    images: {
      edges: [
        {
          node: {
            url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1887&auto=format&fit=crop",
            altText: "Handmade Leather Sandals",
            width: 800,
            height: 800
          }
        },
        {
          node: {
            url: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1887&auto=format&fit=crop",
            altText: "Sandals Side View",
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
        values: ["36", "37", "38", "39", "40", "41", "42", "43", "44"]
      },
      {
        id: "option2",
        name: "Color",
        values: ["Brown", "Black", "Tan"]
      }
    ],
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/1201",
            title: "38 / Brown",
            availableForSale: true,
            quantityAvailable: 12,
            priceV2: {
              amount: "1999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "38" },
              { name: "Color", value: "Brown" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1202",
            title: "40 / Black",
            availableForSale: true,
            quantityAvailable: 15,
            priceV2: {
              amount: "1999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "40" },
              { name: "Color", value: "Black" }
            ]
          }
        },
        {
          node: {
            id: "gid://shopify/ProductVariant/1203",
            title: "42 / Tan",
            availableForSale: true,
            quantityAvailable: 10,
            priceV2: {
              amount: "1999",
              currencyCode: "INR"
            },
            selectedOptions: [
              { name: "Size", value: "42" },
              { name: "Color", value: "Tan" }
            ]
          }
        }
      ]
    },
    collections: ["accessories"],
    tags: ["footwear", "handcrafted", "summer"],
    reviews: [
      {
        id: "review27",
        author: "Neeta Kapoor",
        rating: 5,
        comment: "Very comfortable and the leather is high quality.",
        date: "2023-04-25"
      },
      {
        id: "review28",
        author: "Prakash Jha",
        rating: 4,
        comment: "Good sandals but took a few days to break in.",
        date: "2023-06-10"
      }
    ]
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

// Mock wishlist storage
export interface WishlistItem {
  productId: string;
  addedAt: string;
}
