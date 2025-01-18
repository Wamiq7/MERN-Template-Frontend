import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios/axiosInstance";

export interface IRegister {
  email: string;
  password: string;
}

interface IAuthRepository {
  oauthCallback: () => Promise<void>;
  register: (data: IRegister) => Promise<void>;
}

export const authRepository: IAuthRepository = {
  oauthCallback: async () => {
    const response: AxiosResponse<void> = await axiosInstance.get(
      "/api/auth/google/callback"
    );
    return response.data;
  },
  register: async (data: IRegister) => {
    const response: AxiosResponse<void> = await axiosInstance.post(
      "/api/auth/signup",
      {
        email: data.email,
        password: data.password,
      }
    );
    return response.data;
  },
};
