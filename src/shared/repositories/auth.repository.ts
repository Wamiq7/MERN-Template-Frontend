import type { AxiosResponse } from "axios";
import { axiosInstance } from "../axios/axiosInstance";

interface IGetPostList {
  posts: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

interface IGetPostDetail {
  id: string;
  title: string;
  content: string;
}

interface IAuthRepository {
  oauthCallback: () => Promise<void>;
  getPostDetail: (postId: string) => Promise<IGetPostDetail>;
}

export const authRepository: IAuthRepository = {
  oauthCallback: async () => {
    const response: AxiosResponse<void> = await axiosInstance.get(
      "/api/auth/google/callback"
    );
    return response.data;
  },
  getPostDetail: async (postId: string) => {
    const response: AxiosResponse<IGetPostDetail> = await axiosInstance.get(
      `/posts/${postId}`
    );
    return response.data;
  },
};
