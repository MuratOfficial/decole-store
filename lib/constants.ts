export type SortFilter = {
  name: string;
  sort: string;
};

const newDate = new Date();

export const defaultSort: SortFilter = {
  name: "По умолчанию",
  sort: "default",
};

export const sorting: SortFilter[] = [
  defaultSort,

  {
    sort: "data",
    name: "По свежести",
  },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};
