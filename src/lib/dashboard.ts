"use server";

import { initialStateTypes } from "@/types/forms/loginAuthTypes";
import { cookies } from "next/headers";
import axios from "axios";

export async function createNewCategory(
  prevState: initialStateTypes,
  formData: FormData
): Promise<initialStateTypes> {
  const category_name = formData.get("category_name");
  const category_description = formData.get("category_description") as string;
  const file = formData.get("file") as File;
  const token = cookies().get("token")?.value;

  if (!category_name) {
    return {
      status: 400,
      message: "Category Name cannot be empty",
      data: null,
    };
  }

  let data = new FormData();
  data.append("category_name", category_name);
  data.append("category_description", category_description);
  data.append("file", file);

  try {
    const response = await fetch(
      "http://localhost:8080/admin/shop/addCategory",
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return {
        status: errorData.status,
        message: errorData.message || "Category Creation Failed.",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Category Created Successfully",
      data: responseData.data.data,
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

export async function createNewProduct(
  prevState: initialStateTypes,
  formData: FormData
): Promise<initialStateTypes> {  
  const product_name = formData.get("product_name");
  const product_description = formData.get("product_description") as string;
  const product_price = String(formData.get("product_price"));
  const product_stock = String(formData.get("stock"));
  const category_id = formData.get('category_id') as string;
  const files = formData.getAll("file") as File[];
  const token = cookies().get("token")?.value;

  if (!product_name) {
    return {
      status: 400,
      message: "Category Name cannot be empty",
      data: null,
    };
  }

  let data = new FormData();
  data.append("product_name", product_name);
  data.append("product_description", product_description);
  data.append("product_price", product_price);
  data.append("stock", product_stock);
  data.append("category_id", category_id)
  files.forEach((file) => {
    data.append("file", file);
  });

  try {
    const response = await fetch(
      "http://localhost:8080/admin/shop/addProduct",
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return {
        status: errorData.status,
        message: errorData.message || "Product Creation Failed.",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Product Created Successfully",
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