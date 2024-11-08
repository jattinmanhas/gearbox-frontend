import { ProductType } from "./shop/shopTypes";

export type ContactInitialType = {
  status: number;
  message: string;
  data: null;
};

type Blog = {
  id: string;
  title: string;
  description: string;
  mainImage: string | null;
  createdAt: string;
  updatedAt: string;
  category_id: string;
  authorId: string;
  author: {
    fullname: string;
  };
  category: {
    name: string;
  };
};

export type ApiResponse = {
  products: ProductType[];
  blogs: Blog[];
};
