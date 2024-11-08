type FetchWrapperParams = {
  url: string;
  method?: string;
  data?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
};

type FetchWrapperResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

export async function fetchWrapper<T>({
  url,
  method = "GET",
  data = null,
  headers = { "Content-Type": "application/json" },
  cache = "no-store"
}: FetchWrapperParams): Promise<FetchWrapperResponse<T>> {
  try {
    const response = await fetch(`http://localhost:8080/${url}`, {
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
      message: "Request successful",
      data: responseData,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Unable to connect to the server. Please try again later.",
      data: null,
    };
  }
}