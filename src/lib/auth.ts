"use server";

// import { getCookiesData } from "@/app/(static)/shop/page";
import {
  initialStateTypes,
  LoginResponse,
  UserLoginResponse,
} from "@/types/forms/loginAuthTypes";
import { cookies } from "next/headers";
import { fetchWrapper } from "./fetchapiWrapper";
import { FetchWrapperResponse } from "@/types/misc.types";
import { UserDetails } from "@/types/forms/UserProfileForm";
import { User } from "firebase/auth";

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
  const token = cookies().get("access_token");

  return token;
}

export async function Login(
  formData: FormData
): Promise<FetchWrapperResponse<UserLoginResponse>> {
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

  const response = await fetchWrapper<UserLoginResponse>({
    url: "user/login",
    method: "POST",
    data: data,
  });

  if (!response.data) {
    return {
      status: response.status,
      message: response.message,
      data: null,
    };
  }

  return {
    status: response.status,
    data : response.data,
    message: response.message
  };
}

export async function Signup(
  formData: FormData
): Promise<FetchWrapperResponse<UserLoginResponse>> {
  const firstName = formData.get("firstName");
  const middleName = formData.get("middleName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  if (!firstName || !lastName || !email || !username || !password) {
    return {
      status: 400,
      message: "Some fields are empty, Please fill all details.",
      data: null,
    };
  }

  let data = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    roleId: "53fdd43c-132b-4843-a3cc-2504db47698f"
  };

  const response = await fetchWrapper<UserLoginResponse>({
    url: "user/register",
    method: "POST",
    data: data,
  });

  return {
    status: response.status,
    data : response.data,
    message: response.message
  };
}

export async function RefreshUserToken(token: string) {
  const response = await fetchWrapper<LoginResponse>({
    url : "user/refreshToken",
    method: "POST",
    data : {refreshId : token}
  })

  return {
    status: response.status,
    data: response.data,
    message: response.message
  };
}

export async function Logout() {
    const response = await fetchWrapper<null>({
      url: "user/logout",
      method: "POST",
    });

    console.log(response);
    if (response.status === 200) {
      if (cookies().has("access_token")) cookies().delete("access_token");
      if (cookies().has("user_ref")) cookies().delete("user_ref");
    }

    return response;
}

export async function OAuthLogin(data: { email: string; name: string }) {
  try {
    const response = await fetch("http://localhost:8080/api/user/google", {
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
  const userId = await "1";
  if (!userId) {
    return {
      status: 400,
      message: "Please Login to get User Details",
      data: null,
    };
  }

  const response = await fetchWrapper<UserDetails>({
    url : `user/userDetails/${userId}`,
  })

  return response;
}

export async function getAllUsers(){
  const token = cookies().get("access_token")?.value;

  const response = await fetchWrapper<UserDetails[]>({
    url : "admin/userList",
    method: "GET",
    headers : {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  return response;
}
