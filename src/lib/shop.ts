"use server";
import { getCookiesData } from "@/app/(static)/shop/page";
import { CartItemsType, categoryType, ProductType } from "@/types/shop/shopTypes";
import { loadStripe } from "@stripe/stripe-js";
import { cookies } from "next/headers";

type ProductResponse = {
  status: number;
  message: string;
  data: ProductType[] | null;
};

type CategoryResponse = {
  status: number;
  message: string;
  data: categoryType[] | null;
};

export async function getAllCategories(
  skip: number,
  take: number
): Promise<CategoryResponse> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/getAllCategories?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to get Categories",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Retrieval of all Categories..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getAllProducts(
  skip: number,
  take: number
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/getAllProducts?skip=${skip}&take=${take}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to get Products",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Retrieval of all Products..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
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

  try {
    const response = await fetch(`http://localhost:8080/user/shop/addToCart`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to add Item to the cart",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful added Item to the cart..",
      data: responseData.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getUserCartItems(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/userCart/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to add Item to the cart",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful added Item to the cart..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
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

  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/deleteCartItem/${product_id}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to Delete Item from the cart",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Deleted Item from the cart..",
      data: responseData.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
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

  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/update-quantity`,
      {
        method: "PUT",
        body: JSON.stringify({
          user_id: userId,
          product_id: product_id,
          quantity: quantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to Update Quantity from the cart",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Update Quantity from the cart..",
      data: responseData.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getUserCartItemsCount(userId: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/getCartCount/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message:
          errorData.message || "Failed to FETCH Cart Item Count from the db",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Fetched Item Count from the db..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getAllProductsInSingleCategory(
  category_id: string
): Promise<ProductResponse> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/getAllProductsInCategories/${category_id}?skip=0&take=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message:
          errorData.message ||
          "Failed to FETCH All Products of single Category",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Fetched All Products of single Category..",
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export async function getSingleProductFromId(
  product_id: string
): Promise<{ status: number; data: ProductType | null; message: string }> {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/product/${product_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Failed to Product",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful Fetched Product...",
      data: responseData.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message:
        "Unable to connect to the server at the moment. Please try again later.",
      data: null,
    };
  }
}

export const stripePayment = async (items : CartItemsType[]) => {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const token = await cookies().get('token')?.value;

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
