"use server";
import { FetchWrapperParams, FetchWrapperResponse } from "@/types/misc.types";
import { cookies } from "next/headers";

export async function fetchWrapper<T>({
  url,
  method = "GET",
  data = null,
  headers = { "Content-Type": "application/json" },
  cache = "no-store",
}: FetchWrapperParams): Promise<FetchWrapperResponse<T>> {
  try {
    const clientCookies = cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const fetchHeaders = {
      ...headers, // Preserve any existing headers
      Cookie: clientCookies, // Add the client's cookies
    };

    const response = await fetch(`https://localhost:8080/api/${url}`, {
      method,
      credentials: "include",
      headers: fetchHeaders,
      body: data ? JSON.stringify(data) : null,
      cache: cache,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: errorData.status || response.status,
        message: errorData.message || "Request failed",
        data: null,
      };
    }

    if (response.headers.getSetCookie) {
      const setCookieHeaders = response.headers.getSetCookie();
      setCookieHeaders.forEach((cookieString) => {
        const [nameValue, ...attributes] = cookieString.split("; ");
        const [name, value] = nameValue.split("=");
        const expiresMatch = attributes.find((attr) =>
          attr.startsWith("Expires=")
        );
        const expires = expiresMatch
          ? new Date(expiresMatch.split("=")[1])
          : undefined;

        cookies().set({
          name,
          value,
          httpOnly: true,
          secure: true,
          sameSite: "none",
          expires,
          path: "/",
        });
      });
    }

    const responseData = await response.json();
    return {
      status: 200,
      message: responseData.message,
      data: responseData.data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Unable to connect to the server. Please try again later.",
      data: null,
    };
  }
}
