import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios/axiosInstance";

export const makeApiCall = async <T>(
  method: "get" | "post",
  path: string,
  options?: {
    data?: unknown;
    params?: Record<string, unknown>;
    withCredentials?: boolean;
  }
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance({
    method,
    url: path,
    withCredentials: options?.withCredentials ?? false, // Use `withCredentials` only if specified
    ...(method === "get"
      ? { params: options?.params }
      : { data: options?.data }),
  });
  return response.data;
};
