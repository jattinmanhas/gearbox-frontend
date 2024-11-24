import { FetchWrapperParams, FetchWrapperResponse } from "@/types/misc.types";

export async function fetchWrapper<T>({
  url,
  method = "GET",
  data = null,
  headers = { "Content-Type": "application/json" },
  cache = "no-store"
}: FetchWrapperParams): Promise<FetchWrapperResponse<T>> {
  try {
    const response = await fetch(`http://localhost:8080/api/${url}`, {
      method,
      headers,
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

    const responseData = await response.json();
    return {
      status: 200,
      message: responseData.message,
      data: responseData.data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Unable to connect to the server. Please try again later.",
      data: null,
    };
  }
}