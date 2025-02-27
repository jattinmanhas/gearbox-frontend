"use server";
import {
  CartItemsType,
  CategoryResponse,
  categoryType,
  OrderWithPaymentType,
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
    url: `shop/getAllCategories?skip=${skip}&take=${take}`,
  });

  return response;
}

export async function getAllProducts(
  skip: number,
  take: number
): Promise<FetchWrapperResponse<ProductType[]>> {
  const response = await fetchWrapper<ProductType[]>({
    url: `shop/getAllProducts?skip=${skip}&take=${take}`,
  });

  return response;
}

export async function addItemToCart(product_id: string) {
  const user_id = "1";
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
    url: "shop/addToCart",
    method: "POST",
    data: data,
  });

  return response;
}

export async function getUserCartItems(userId: string) {
  const response = await fetchWrapper<CartItemsType>({
    url : `shop/userCart/${userId}`,
    method: "GET"
  });

  return response;
}

export async function deleteItemFromUserCart(product_id: string) {
  const userId = '1';
  if (!userId) {
    return {
      status: 401,
      message: "Please Log In to Delete From Cart",
      data: null,
    };
  }

  const response = await fetchWrapper<null>({
    url:  `shop/deleteCartItem/${product_id}/${userId}`,
    method: "DELETE"
  });

  return response;
}

export async function updateQuantityFromCart(
  product_id: string,
  quantity: number
) {
  const userId = "1";
  if (!userId) {
    return {
      status: 401,
      message: "Please Log In to Update Quantity",
      data: null,
    };
  }

  const response = await fetchWrapper<null>({
    url: "shop/update-quantity",
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
    url: `shop/getCartCount/${userId}`,
  });

  return response;
}

export async function getAllProductsInSingleCategory(
  category_id: string,
  skip: number = 0,
  take: number = 10
){
  const response = await fetchWrapper<ProductType[]>({
    url: `shop/getAllProductsInCategories/${category_id}?skip=${skip}&take=${take}`,
  });

  return {
    status: response.status,
    message: response.message,
    data: response.data,
  };
}

export async function getSingleProductFromId(
  product_id: string
): Promise<FetchWrapperResponse<ProductType>> {
  const response = await fetchWrapper<ProductType>({
    url: `shop/product/${product_id}`,
  });

  return response;
}

export const stripePayment = async (items: CartItemsType[]) : Promise<FetchWrapperResponse<string>> => {
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

  const response = await fetchWrapper<string>({
    url: "shop/create-checkout-session",
    method: "POST",
    data: body,
    headers: headers,
  });
  // const response = await fetch(
  //   `http://localhost:8080/api/shop/create-checkout-session`,
  //   {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(body),
  //   }
  // );

  return response;
};

export async function getAllOrdersWithPayments(): Promise<FetchWrapperResponse<OrderWithPaymentType[]>> {
  const token = await cookies().get("token")?.value;

  const response = await fetchWrapper<OrderWithPaymentType[]>({
    url: "admin/shop/getAllOrdersWithPayments",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

