export type Menu = {
  title: string;
  path: string;
};

export type Product = {
  id: string;
  path: string;
  availableForSale: boolean;
  title: string;
  description: string;
  options: ProductOption[];
  price: string;
  colors: Colors[];
  collection: Collection;
  images: Image[];
  tags: string[];
  updatedAt: string;
};

export type Image = {
  url: string;
  altText: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Colors = {
  id: string;
  name: string;
  values: string[];
};

export type Collection = {
  id: string;
  name: string;
};
