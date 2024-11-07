"use server";

import { getCookiesData } from "@/app/(static)/shop/page";
import { initialStateTypes } from "@/types/forms/loginAuthTypes";
import { SignupInitialStateTypes } from "@/types/forms/signupAuthTypes";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

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

export async function getTokenValueFromCookie() {
  const token = cookies().get("token");

  return token;
}

export async function getRefreshIdFromCookie() {
  const refresh = cookies().get("refreshId");

  return refresh;
}

export async function Login(
  prevState: initialStateTypes,
  formData: FormData
): Promise<initialStateTypes> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {
      status: 400,
      message: "Username/Email or Password cannot be empty",
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
    const response = await fetch("http://localhost:8080/user/login", {
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
        status: errorData.statusCode,
        message: errorData.message || "Login failed",
        data: null,
      };
    }

    const responseData = await response.json();
    setTokensInCookies(
      responseData.data.tokens.token,
      responseData.data.data.id
    );

    cookies().set("userData", JSON.stringify(responseData.data.data), {
      sameSite: "strict", // Protect against CSRF
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      status: responseData.statusCode,
      message: "Login successful",
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

export async function Signup(
  prevState: SignupInitialStateTypes,
  formData: FormData
): Promise<SignupInitialStateTypes> {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  if (!fullname || !email || !username || !password) {
    return {
      status: 400,
      message: "Some fields are empty, Please fill all details.",
      data: null,
    };
  }

  let data = {
    fullname: fullname,
    email: email,
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8080/user/register", {
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
        message: errorData.message || "Signup failed",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Signup successful",
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

export async function RefreshUserToken(token: string) {  
  try {
    const response = await fetch("http://localhost:8080/user/refreshToken", {
      method: "POST",
      body: JSON.stringify({ refreshId: token }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "REFRESHING USER AUTH failed",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Token Verification Successful..",
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

export async function Logout() {
  try {
    const refreshId = cookies().get("refreshId");

    const response = await fetch("http://localhost:8080/user/logout", {
      method: "POST",
      body: JSON.stringify({ refreshId: refreshId }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status,
        message: errorData.message || "Logout failed",
        data: null,
      };
    }
    const responseData = await response.json();
    if (cookies().has("refreshId")) cookies().delete("refreshId");
    if (cookies().has("token")) cookies().delete("token");
    if(cookies().has("userData")) cookies().delete("userData");

    return {
      status: 200,
      message: "User Logout Successful..",
      data: null,
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


export async function OAuthLogin(data: {email: string, name: string}){
  try {
      const response = await fetch("http://localhost:8080/user/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.statusCode,
        message: errorData.message || "Login failed",
        data: null,
      };
    }

    const responseData = await response.json();
    setTokensInCookies(
      responseData.data.tokens.token,
      responseData.data.data.id
    );

    cookies().set("userData", JSON.stringify(responseData.data.data), {
      sameSite: "strict", // Protect against CSRF
      maxAge: 60 * 60 * 24, // 1 day
    });

    return {
      status: responseData.statusCode,
      message: "Login successful",
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

export async function getCompleteUserDetails() {
  const userId = await getCookiesData();
  if(!userId){
    return {
      status : 400,
      message : "Please Login to get User Details",
      data : null
    }
  }

  try {
    const response = await fetch(
      `http://localhost:8080/user/userDetails/${userId}`,
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
        message: errorData.message || "Failed to get User Details",
        data: null,
      };
    }

    const responseData = await response.json();

    return {
      status: 200,
      message: "Successful fetched User details..",
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


