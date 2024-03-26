"use client";

import { cookies } from "next/headers";
import CartModal from "./modal";
import useBasket from "@/hooks/useBasket";

export default function Cart() {
  const carts = useBasket().basket;
  const cost = useBasket().getTotalBasketPrice();
  const totalQuantity = useBasket().uniqueItemCount;

  return <CartModal lines={carts} cost={cost} totalQuantity={totalQuantity} />;
}
