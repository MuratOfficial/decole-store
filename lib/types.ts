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
  options: string[];
  price: string;
  colors: string[];
  collection: Collection;
  images: Image[];
  tags: string[];
  updatedAt: string;
};

export type Image = {
  url: string;
  altText: string;
};

export type Collection = {
  id: string;
  name: string;
};
