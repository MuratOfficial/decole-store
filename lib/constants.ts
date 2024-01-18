import { Collection } from "./types";

export enum VercelSortKeys {
  RELEVANCE = "RELEVANCE",
  BEST_SELLING = "BEST_SELLING",
  CREATED_AT = "CREATED_AT",
  PRICE = "PRICE",
}

export const defaultSort: Collection = {
  name: "Example",
  id: "example",
};

export const sorting: Collection[] = [
  defaultSort,
  {
    id: "collection1",
    name: "Collection 1",
  },
  {
    id: "collection2",
    name: "Collection 2",
  },
  {
    id: "collection3",
    name: "Collection 3",
  },
];
