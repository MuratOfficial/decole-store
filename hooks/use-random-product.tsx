import { Money, Product } from "@/lib/types";
import { create } from "zustand";

interface RandomProductsStore {
  items: Product[];
  generateProducts: (num: number) => void;
}

const useRandomProducts = create<RandomProductsStore>((set) => ({
  items: [],
  generateProducts: (num: number) => {
    const generateRandomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const generateRandomBoolean = (): boolean => {
      return Math.random() < 0.5;
    };

    const generateRandomString = (length: number = 10): string => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const generateRandomMoney: () => Money = () => {
      return {
        amount: (Math.random() * 100).toFixed(2),
        currencyCode: "USD",
      };
    };

    const generateRandomProduct = (): Product => {
      const randomMoney: Money = generateRandomMoney();

      return {
        id: generateRandomString(),
        path: generateRandomString(),
        availableForSale: generateRandomBoolean(),
        title: generateRandomString(),
        description: generateRandomString(50),
        descriptionHtml: `<p>${generateRandomString(50)}</p>`,
        options: [
          {
            id: generateRandomString(),
            name: "Color",
            values: ["Red", "Blue", "Green"],
          },
          {
            id: generateRandomString(),
            name: "Size",
            values: ["Small", "Medium", "Large"],
          },
        ],
        priceRange: {
          maxVariantPrice: randomMoney,
          minVariantPrice: randomMoney,
        },
        variants: [
          {
            id: generateRandomString(),
            title: "Variant 1",
            availableForSale: generateRandomBoolean(),
            selectedOptions: [
              { name: "Color", value: "Red" },
              { name: "Size", value: "Small" },
            ],
            price: randomMoney,
          },
          {
            id: generateRandomString(),
            title: "Variant 2",
            availableForSale: generateRandomBoolean(),
            selectedOptions: [
              { name: "Color", value: "Blue" },
              { name: "Size", value: "Medium" },
            ],
            price: randomMoney,
          },
        ],
        featuredImage: {
          url: "/random/1.jpg",
          altText: "Image 1",
          width: generateRandomNumber(100, 1000),
          height: generateRandomNumber(100, 1000),
        },
        images: [
          {
            url: "/random/2.jpg",
            altText: "Image 2",
            width: generateRandomNumber(100, 1000),
            height: generateRandomNumber(100, 1000),
          },
          {
            url: "/random/3.jpg",
            altText: "Image 3",
            width: generateRandomNumber(100, 1000),
            height: generateRandomNumber(100, 1000),
          },
        ],
        seo: {
          title: generateRandomString(20),
          description: generateRandomString(50),
        },
        tags: ["Tag1", "Tag2", "Tag3"],
        updatedAt: new Date().toISOString(),
      };
    };

    // Generate an array of random products based on the specified number
    const randomProductsArray: Product[] = Array.from(
      { length: num },
      generateRandomProduct
    );
    set({ items: randomProductsArray });
  },
}));

export default useRandomProducts;
