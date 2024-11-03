"use server";
import { cookies } from "next/headers";

export async function getAllCategories(skip: number, take: number) {
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

export async function getAllProducts(skip: number, take: number) {
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

export async function addItemToCart(user_id: string, product_id: string) {
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
    console.log(responseData);

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

export async function deleteItemFromUserCart(userId: string, userCartId: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/user/shop/deleteCartItem/${userCartId}/${userId}`,
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
        message: errorData.message || "Failed to FETCH Cart Item Count from the db",
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


