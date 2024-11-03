"use server";

import { initialStateTypes } from "@/types/forms/loginAuthTypes";
import { cookies } from "next/headers";

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

  try {
    const response = await fetch("http://localhost:8080/admin/login", {
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
        message: errorData.message || "Admin Login failed",
        data: null,
      };
    }

    const responseData = await response.json();
    setTokensInCookies(
      responseData.data.tokens.token,
      responseData.data.data.id
    );

    cookies().set("userData", JSON.stringify(responseData.data.data), {
      path: "/", // Cookie available to the whole app
      sameSite: "strict", // Protect against CSRF
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      status: 200,
      message: "Admin Login successful",
      data: responseData.data.data,
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
