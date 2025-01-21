import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

// export const makeApiCall = async <T>(method: 'get' | 'post', path: string, data?: unknown): Promise<T> => {
//   const response: AxiosResponse<T> = await (method === 'get'
//     ? axiosInstance.get(path)
//     : axiosInstance.post(path, data));
//   return response.data;
// };

export const makeApiCall = async <T>(
  method: 'get' | 'post',
  path: string,
  options?: { data?: unknown; params?: Record<string, unknown> },
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance({
    method,
    url: path,
    ...(method === 'get' ? { params: options?.params } : { data: options?.data }),
  });
  return response.data;
};
