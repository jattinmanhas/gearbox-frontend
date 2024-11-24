"use server";
import { getCookiesData } from "@/app/(static)/shop/page";
import {
  CartItemsType,
  CategoryResponse,
  categoryType,
  ProductResponse,
  ProductType,
} from "@/types/shop/shopTypes";
import { loadStripe } from "@stripe/stripe-js";
import { cookies } from "next/headers";
import { fetchWrapper } from "./fetchapiWrapper";
import { FetchWrapperResponse } from "@/types/misc.types";

export async function getAllCategories(
  skip: number,
  take: number
): Promise<FetchWrapperResponse<categoryType[]>> {
  const response = await fetchWrapper<categoryType[]>({
    url: `user/shop/getAllCategories?skip=${skip}&take=${take}`,
  });

  return response;
}

export async function getAllProducts(
  skip: number,
  take: number
): Promise<FetchWrapperResponse<ProductType[]>> {
  const response = await fetchWrapper<ProductType[]>({
    url: `user/shop/getAllProducts?skip=${skip}&take=${take}`,
  });

  return response;
}

export async function addItemToCart(product_id: string) {
  const user_id = await getCookiesData();
  if (!user_id) {
    return {
      status: 401,
      message: "Please Log In to Delete From Cart",
      data: null,
    };
  }

  let data = {
    user_id: user_id,
    product_id: product_id,
  };

  const response = await fetchWrapper<any>({
    url: "user/shop/addToCart",
    method: "POST",
    data: data,
  });

  return response;
}

export async function getUserCartItems(userId: string) {
  const response = await fetchWrapper<CartItemsType>({
    url : `user/shop/userCart/${userId}`,
    method: "GET"
  });

  return response;
}

export async function deleteItemFromUserCart(product_id: string) {
  const userId = await getCookiesData();
  if (!userId) {
    return {
      status: 401,
      message: "Please Log In to Delete From Cart",
      data: null,
    };
  }

  const response = await fetchWrapper<null>({
    url:  `user/shop/deleteCartItem/${product_id}/${userId}`,
    method: "DELETE"
  });

  return response;
}

export async function updateQuantityFromCart(
  product_id: string,
  quantity: number
) {
  const userId = await getCookiesData();
  if (!userId) {
    return {
      status: 401,
      message: "Please Log In to Update Quantity",
      data: null,
    };
  }

  const response = await fetchWrapper<null>({
    url: "user/shop/update-quantity",
    method: "PUT",
    data: {
      user_id: userId,
      product_id: product_id,
      quantity: quantity,
    },
  });

  return response;
}

export async function getUserCartItemsCount(userId: string) {
  const response = await fetchWrapper<Number>({
    url: `user/shop/getCartCount/${userId}`,
  });

  return response;
}

export async function getAllProductsInSingleCategory(
  category_id: string,
  skip: number = 0,
  take: number = 10
): Promise<FetchWrapperResponse<ProductResponse[]>> {
  const response = await fetchWrapper<ProductResponse[]>({
    url: `user/shop/getAllProductsInCategories/${category_id}?skip=${skip}&take=${take}`,
  });

  return response;
}

export async function getSingleProductFromId(
  product_id: string
): Promise<FetchWrapperResponse<ProductType>> {
  const response = await fetchWrapper<ProductType>({
    url: `user/shop/product/${product_id}`,
  });

  return response;
}

export const stripePayment = async (items: CartItemsType[]) => {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const token = await cookies().get("token")?.value;

  const body = {
    products: items,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `http://localhost:8080/user/shop/create-checkout-session`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );

  const session = await response.json();

  return session;
};
