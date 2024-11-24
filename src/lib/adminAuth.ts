"use server";

import { initialStateTypes, LoginResponse } from "@/types/forms/loginAuthTypes";
import { cookies } from "next/headers";
import { fetchWrapper } from "./fetchapiWrapper";

function setTokensInCookies(token: string, refreshId: string) {
  // set token first for 15 mins
  cookies().set("token", token, {
    httpOnly: true, // Prevent access via JavaScript
    secure: true, // Send only over HTTPS
    path: "/", // Cookie available to the whole app
    sameSite: "strict", // Protect against CSRF
    maxAge: 60 * 15, // 15 min
  });

  cookies().set("refreshId", refreshId, {
    httpOnly: true, // Prevent access via JavaScript
    secure: true, // Send only over HTTPS
    path: "/", // Cookie available to the whole app
    sameSite: "strict", // Protect against CSRF
    maxAge: 60 * 60 * 24, // 1 day
  });
}

function checkInput(input: string) {
  // Regular expression for validating an Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test if the input matches the email pattern
  if (emailRegex.test(input)) {
    return true;
  } else {
    return false;
  }
}


export async function AdminLogin(
  prevState: initialStateTypes,
  formData: FormData
): Promise<initialStateTypes> {
  const username = formData.get("adminUsername") as string;
  const password = formData.get("adminPassword") as string;

  if (!username || !password) {
    return {
      status: 400,
      message: "Admin Username/Email or Password cannot be empty",
      data: null,
    };
  }

  let data = {};

  if (await checkInput(username)) {
    data = {
      email: username,
      password: password,
    };
  } else {
    data = {
      username: username,
      password: password,
    };
  }

  const response = await fetchWrapper<LoginResponse>({
    url: "admin/login",
    method: "POST",
    data: data,
  });

  if (!response.data) {
    return {
      status: 400,
      message: "Response is Empty.",
      data: null,
    };
  }

  setTokensInCookies(response.data.tokens.token, response.data.data.id);

  cookies().set("userData", JSON.stringify(response.data.data), {
    sameSite: "strict", // Protect against CSRF
    maxAge: 60 * 60 * 24, // 1 day
  });

  return {
    status: response.status,
    data : response.data.data,
    message: response.message
  };
}
