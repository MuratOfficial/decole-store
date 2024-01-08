import { Product } from "./types";

export const fakeProducts: Product[] = [
  {
    id: "1",
    path: "product1",
    availableForSale: true,
    title: "Fake Product 1",
    description: "This is a fake product description for product 1.",
    descriptionHtml: "<p>This is a fake product description for product 1.</p>",
    options: [
      {
        id: "option1",
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
      {
        id: "option2",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "25.99",
        currencyCode: "KZT",
      },
      minVariantPrice: {
        amount: "19.99",
        currencyCode: "KZT",
      },
    },
    variants: [
      {
        id: "variant1",
        title: "Red - Small",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Red",
          },
          {
            name: "Size",
            value: "Small",
          },
        ],
        price: {
          amount: "19.99",
          currencyCode: "KZT",
        },
      },
      {
        id: "variant2",
        title: "Blue - Medium",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Blue",
          },
          {
            name: "Size",
            value: "Medium",
          },
        ],
        price: {
          amount: "22.99",
          currencyCode: "KZT",
        },
      },
    ],
    featuredImage: {
      url: "/random/1.jpg",
      altText: "Product 1 Image",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "/random/1.jpg",
        altText: "Product 1 Image 1",
        width: 600,
        height: 400,
      },
      {
        url: "/random/2.jpg",
        altText: "Product 1 Image 2",
        width: 600,
        height: 400,
      },
    ],
    seo: {
      title: "Fake Product 1 - Best Price!",
      description: "Explore the amazing features of Fake Product 1.",
    },
    tags: ["fake", "product", "1"],
    updatedAt: "2024-01-09T12:00:00Z",
  },
  {
    id: "2",
    path: "/product2",
    availableForSale: true,
    title: "Fantastic Widget",
    description:
      "Introducing the Fantastic Widget - a revolutionary product that will change your life!",
    descriptionHtml:
      "<p>Introducing the Fantastic Widget - a revolutionary product that will change your life!</p>",
    options: [
      {
        id: "color",
        name: "Color",
        values: ["Silver", "Gold", "Rose Gold"],
      },
      {
        id: "size",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "49.99",
        currencyCode: "KZT",
      },
      minVariantPrice: {
        amount: "39.99",
        currencyCode: "KZT",
      },
    },
    variants: [
      {
        id: "variant1",
        title: "Silver - Small",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Silver",
          },
          {
            name: "Size",
            value: "Small",
          },
        ],
        price: {
          amount: "39.99",
          currencyCode: "KZT",
        },
      },
      {
        id: "variant2",
        title: "Gold - Medium",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Gold",
          },
          {
            name: "Size",
            value: "Medium",
          },
        ],
        price: {
          amount: "44.99",
          currencyCode: "KZT",
        },
      },
    ],
    featuredImage: {
      url: "/random/2.jpg",
      altText: "Fantastic Widget Image",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "/random/2.jpg",
        altText: "Fantastic Widget Image 1",
        width: 600,
        height: 400,
      },
      {
        url: "/random/3.jpg",
        altText: "Fantastic Widget Image 2",
        width: 600,
        height: 400,
      },
    ],
    seo: {
      title: "Fantastic Widget - Limited Stock!",
      description:
        "Discover the amazing features of the Fantastic Widget. Limited stock available!",
    },
    tags: ["fantastic", "widget", "limited"],
    updatedAt: "2024-01-10T10:30:00Z",
  },
  {
    id: "3",
    path: "/product3",
    availableForSale: true,
    title: "Superior Gadget",
    description:
      "Experience the future with our Superior Gadget. Cutting-edge technology in the palm of your hand!",
    descriptionHtml:
      "<p>Experience the future with our Superior Gadget. Cutting-edge technology in the palm of your hand!</p>",
    options: [
      {
        id: "color",
        name: "Color",
        values: ["Black", "White", "Space Gray"],
      },
      {
        id: "storage",
        name: "Storage",
        values: ["64GB", "128GB", "256GB"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "899.99",
        currencyCode: "KZT",
      },
      minVariantPrice: {
        amount: "799.99",
        currencyCode: "KZT",
      },
    },
    variants: [
      {
        id: "variant1",
        title: "Black - 64GB",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Black",
          },
          {
            name: "Storage",
            value: "64GB",
          },
        ],
        price: {
          amount: "799.99",
          currencyCode: "KZT",
        },
      },
      {
        id: "variant2",
        title: "White - 128GB",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "White",
          },
          {
            name: "Storage",
            value: "128GB",
          },
        ],
        price: {
          amount: "899.99",
          currencyCode: "KZT",
        },
      },
    ],
    featuredImage: {
      url: "/random/3.jpg",
      altText: "Superior Gadget Image",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "/random/3.jpg",
        altText: "Superior Gadget Image 1",
        width: 600,
        height: 400,
      },
      {
        url: "/random/2.jpg",
        altText: "Superior Gadget Image 2",
        width: 600,
        height: 400,
      },
    ],
    seo: {
      title: "Superior Gadget - Unleash the Power!",
      description:
        "Discover the power and elegance of the Superior Gadget. Limited quantities available!",
    },
    tags: ["superior", "gadget", "technology"],
    updatedAt: "2024-01-11T14:45:00Z",
  },
  {
    id: "4",
    path: "/product4",
    availableForSale: false,
    title: "Mega Widget XL",
    description:
      "The Mega Widget XL is your ultimate companion for productivity and entertainment.",
    descriptionHtml:
      "<p>The Mega Widget XL is your ultimate companion for productivity and entertainment.</p>",
    options: [
      {
        id: "color",
        name: "Color",
        values: ["Black", "Silver", "Blue"],
      },
      {
        id: "size",
        name: "Size",
        values: ["XL", "XXL", "XXXL"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "129.99",
        currencyCode: "KZT",
      },
      minVariantPrice: {
        amount: "99.99",
        currencyCode: "KZT",
      },
    },
    variants: [
      {
        id: "variant1",
        title: "Black - XL",
        availableForSale: false,
        selectedOptions: [
          {
            name: "Color",
            value: "Black",
          },
          {
            name: "Size",
            value: "XL",
          },
        ],
        price: {
          amount: "99.99",
          currencyCode: "KZT",
        },
      },
      {
        id: "variant2",
        title: "Silver - XXL",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Silver",
          },
          {
            name: "Size",
            value: "XXL",
          },
        ],
        price: {
          amount: "119.99",
          currencyCode: "KZT",
        },
      },
    ],
    featuredImage: {
      url: "/random/4.jpg",
      altText: "Mega Widget XL Image",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "/random/4.jpg",
        altText: "Mega Widget XL Image 1",
        width: 600,
        height: 400,
      },
      {
        url: "/random/5.jpg",
        altText: "Mega Widget XL Image 2",
        width: 600,
        height: 400,
      },
    ],
    seo: {
      title: "Mega Widget XL - Coming Soon!",
      description:
        "Get ready for the launch of the Mega Widget XL. Stay tuned for exciting updates!",
    },
    tags: ["mega", "widget", "XL"],
    updatedAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "5",
    path: "/product5",
    availableForSale: true,
    title: "Epic Gizmo Pro",
    description:
      "The Epic Gizmo Pro is the pinnacle of innovation. Elevate your lifestyle with cutting-edge technology!",
    descriptionHtml:
      "<p>The Epic Gizmo Pro is the pinnacle of innovation. Elevate your lifestyle with cutting-edge technology!</p>",
    options: [
      {
        id: "color",
        name: "Color",
        values: ["Space Black", "Champagne Gold", "Midnight Blue"],
      },
      {
        id: "edition",
        name: "Edition",
        values: ["Standard", "Pro", "Elite"],
      },
    ],
    priceRange: {
      maxVariantPrice: {
        amount: "1499.99",
        currencyCode: "KZT",
      },
      minVariantPrice: {
        amount: "1299.99",
        currencyCode: "KZT",
      },
    },
    variants: [
      {
        id: "variant1",
        title: "Space Black - Pro",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Space Black",
          },
          {
            name: "Edition",
            value: "Pro",
          },
        ],
        price: {
          amount: "1299.99",
          currencyCode: "KZT",
        },
      },
      {
        id: "variant2",
        title: "Champagne Gold - Elite",
        availableForSale: true,
        selectedOptions: [
          {
            name: "Color",
            value: "Champagne Gold",
          },
          {
            name: "Edition",
            value: "Elite",
          },
        ],
        price: {
          amount: "1499.99",
          currencyCode: "KZT",
        },
      },
    ],
    featuredImage: {
      url: "/random/5.jpg",
      altText: "Epic Gizmo Pro Image",
      width: 800,
      height: 600,
    },
    images: [
      {
        url: "/random/5.jpg",
        altText: "Epic Gizmo Pro Image 1",
        width: 600,
        height: 400,
      },
      {
        url: "/random/4.jpg",
        altText: "Epic Gizmo Pro Image 2",
        width: 600,
        height: 400,
      },
    ],
    seo: {
      title: "Epic Gizmo Pro - Explore the Future!",
      description:
        "Immerse yourself in the future with the Epic Gizmo Pro. Limited stock available!",
    },
    tags: ["epic", "gizmo", "pro"],
    updatedAt: "2024-01-13T11:30:00Z",
  },
];
