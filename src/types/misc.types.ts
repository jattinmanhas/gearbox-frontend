export type FetchWrapperParams = {
  url: string;
  method?: string;
  data?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
};

export type FetchWrapperResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};