import { Product } from "./types";

const fakeProducts: Product[] = [
  {
    id: "1",
    path: "product-1",
    availableForSale: true,
    title: "Awesome Product 1",
    description: "This is an amazing product description for Product 1.",
    collection: {
      id: "collection1",
      name: "Collection 1",
    },
    options: [
      {
        id: "1",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
      {
        id: "2",
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
    ],
    price: "30000",
    colors: [
      {
        id: "1",
        name: "Red",
        values: ["#FF0000", "#B22222"],
      },
      {
        id: "2",
        name: "Blue",
        values: ["#0000FF", "#4169E1"],
      },
    ],
    images: [
      {
        url: "/random/1.jpg",
        altText: "Image 1",
      },
      {
        url: "/random/2.jpg",
        altText: "Image 2",
      },
    ],
    tags: ["Tag1", "Tag2"],
    updatedAt: "2024-01-18T12:00:00Z",
  },
  {
    id: "2",
    path: "product-2",
    availableForSale: true,
    title: "Awesome Product 2",
    description: "This is an amazing product description for Product 2.",
    collection: {
      id: "collection2",
      name: "Collection 2",
    },
    options: [
      {
        id: "1",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
      {
        id: "2",
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
    ],
    price: "30000",
    colors: [
      {
        id: "1",
        name: "Red",
        values: ["#FF0000", "#B22222"],
      },
      {
        id: "2",
        name: "Blue",
        values: ["#0000FF", "#4169E1"],
      },
    ],
    images: [
      {
        url: "/random/2.jpg",
        altText: "Image 1",
      },
      {
        url: "/random/3.jpg",
        altText: "Image 2",
      },
    ],
    tags: ["Tag1", "Tag2"],
    updatedAt: "2024-01-18T12:00:00Z",
  },
  {
    id: "3",
    path: "product-3",
    availableForSale: true,
    title: "Awesome Product 3",
    description: "This is an amazing product description for Product 3.",
    collection: {
      id: "collection3",
      name: "Collection 3",
    },
    options: [
      {
        id: "1",
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
      {
        id: "2",
        name: "Color",
        values: ["Red", "Blue", "Green"],
      },
    ],
    price: "30000",
    colors: [
      {
        id: "3",
        name: "Red",
        values: ["#FF0000", "#B22222"],
      },
      {
        id: "4",
        name: "Blue",
        values: ["#0000FF", "#4169E1"],
      },
    ],
    images: [
      {
        url: "/random/3.jpg",
        altText: "Image 1",
      },
      {
        url: "/random/4.jpg",
        altText: "Image 2",
      },
    ],
    tags: ["Tag1", "Tag2"],
    updatedAt: "2024-01-18T12:00:00Z",
  },
  // Repeat the structure for additional products (2-5)
];

export default fakeProducts;
