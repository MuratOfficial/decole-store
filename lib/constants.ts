import { Collection } from "./types";

export const defaultSort: Collection = {
  name: "По умолчанию",
  id: "default",
};

export const sorting: Collection[] = [
  defaultSort,
  {
    id: "price",
    name: "По цене",
  },
  {
    id: "name",
    name: "По названию",
  },
  {
    id: "data",
    name: "По свежести",
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
