import { Product } from "./types";

const fakeProducts: Product[] = [
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
    options: ["Small", "Medium", "Large"],
    price: "30000",
    colors: ["#0000FF", "#4169E1"],

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
];

export default fakeProducts;
