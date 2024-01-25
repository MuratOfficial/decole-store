import { Collection } from "@prisma/client";

const newDate = new Date();

export const defaultSort: Collection = {
  name: "По умолчанию",
  id: "default",
  createdAt: newDate,
  updatedAt: newDate,
};

export const sorting: Collection[] = [
  defaultSort,
  {
    id: "price",
    name: "По цене",
    createdAt: newDate,
    updatedAt: newDate,
  },
  {
    id: "name",
    name: "По названию",
    createdAt: newDate,
    updatedAt: newDate,
  },
  {
    id: "data",
    name: "По свежести",
    createdAt: newDate,
    updatedAt: newDate,
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
