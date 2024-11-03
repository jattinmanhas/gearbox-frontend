export type singleCategoryType = {
  signedUrl: string;
  category_id: string;
  name: string;
  description: string;
  imageName: string;
  eTag: string;
  isDeleted: boolean;
  products?: [];
};

export type categoryType = {
  name: string;
  category_id: string;
  description: string | null;
  imageName: string | null;
  eTag: string | null;
  isDeleted: boolean;
  products: {
    name: string;
    description: string | null;
    product_id: string;
    price: number;
    stock: number;
  }[];
};

type Creator = {
  username: string | null;
  fullname: string | null;
};

type CategoryForProducts = {
  name: string;
  description: string | null;
};

export type ProductImage = {
  imageName: string;
  eTag: string;
  image_id: number;
  signedUrl?: string;
};

export type ProductType = {
  product_id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number | string; // Assuming price may be stored as Decimal or string
  stock: number;
  Ratings: number | string; // Assuming Ratings may be stored as Decimal or string
  isDeleted: boolean;
  category: CategoryForProducts;
  images: ProductImage[];
  creator: Creator;
};