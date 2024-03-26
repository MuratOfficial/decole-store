import { Image, Product } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BasketProps {
  basket: (Product & { images: Image[] })[];
  counts: Record<string, number>;
  uniqueItemCount: number;
  addToBasket: (item: Product & { images: Image[] }) => void;
  decreaseCount: (id: string) => void;
  removeItem: (id: string) => void;
  getTotalPrice: () => Record<string, number>;
  getTotalBasketPrice: () => number;
  getItemCount: (id: string) => number;
  removeAllItems: () => void;
}

const useBaskets = create(
  persist<BasketProps>(
    (set, get) => ({
      basket: [],
      counts: {},
      uniqueItemCount: 0,
      addToBasket: (item) =>
        set((state) => {
          // Check if the item ID already exists in the counts object
          if (!state.counts[item.id]) {
            toast.success("Продукт добавлен в корзину");
            return {
              basket: [...state.basket, item],
              counts: { ...state.counts, [item.id]: 1 }, // Initialize count for the item
              uniqueItemCount: state.uniqueItemCount + 1,
            };
          } else {
            toast("Добавлено в корзину");
            const updatedCounts = {
              ...state.counts,
              [item.id]: state.counts[item.id] + 1,
            };
            return {
              basket: state.basket,
              counts: updatedCounts,
              uniqueItemCount: state.uniqueItemCount,
            };
          }
        }),
      decreaseCount: (id) =>
        set((state) => {
          const basketCopy = [...state.basket]; // Create a copy of basket array
          const itemIndex = basketCopy.findIndex((item) => item.id === id); // Find index of item with specified ID
          if (itemIndex !== -1) {
            // If item exists in basket
            const updatedCounts = { ...state.counts };
            const itemCount = updatedCounts[id] || 0; // Get count of the item
            if (itemCount > 1) {
              // If count is greater than 1, decrease count
              updatedCounts[id] = itemCount - 1;
            } else {
              // If count is 1, remove item from basket and counts
              basketCopy.splice(itemIndex, 1);
              delete updatedCounts[id];
              return {
                basket: basketCopy,
                counts: updatedCounts,
                uniqueItemCount: state.uniqueItemCount - 1,
              };
            }
            return {
              basket: basketCopy,
              counts: updatedCounts,
              uniqueItemCount: state.uniqueItemCount,
            };
          }
          return state; // If item not found, return current state
        }),
      removeItem: (id) =>
        set((state) => {
          const basketCopy = [...state.basket]; // Create a copy of basket array
          const itemIndex = basketCopy.findIndex((item) => item.id === id); // Find index of item with specified ID
          if (itemIndex !== -1) {
            // If item exists in basket
            const updatedCounts = { ...state.counts };
            const itemCount = updatedCounts[id] || 0; // Get count of the item
            basketCopy.splice(itemIndex, 1); // Remove item from basket
            if (itemCount) {
              // If count is 1, remove item from counts and decrement uniqueItemCount
              delete updatedCounts[id];
              return {
                basket: basketCopy,
                counts: updatedCounts,
                uniqueItemCount: state.uniqueItemCount - 1,
              };
            }
          }
          return state; // If item not found, return current state
        }),
      removeAllItems: () =>
        set({
          basket: [],
          counts: {},
          uniqueItemCount: 0,
        }),
      getTotalPrice: () => {
        const totalPrice: Record<string, number> = {};
        get().basket.forEach((item) => {
          const count = get().counts[item.id] || 0; // Get count for the item
          const price = parseFloat(item.price); // Get price for the item
          totalPrice[item.id] = count * price; // Calculate total price for the item
        });
        return totalPrice;
      },
      getTotalBasketPrice: () => {
        return get().basket.reduce((total, item) => {
          const count = get().counts[item.id] || 0; // Get count for the item
          const price = parseFloat(item.price); // Get price for the item
          return total + count * price; // Add price for the item to total
        }, 0);
      },
      getItemCount: (id) => {
        return get().counts[id] || 0; // Return count for the item
      },
    }),
    {
      name: "project-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBaskets;
