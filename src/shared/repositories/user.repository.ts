import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

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

interface IPostRepository {
  getAllUsers: () => Promise<IGetPostList>;
}

export const userRepository: IPostRepository = {
  getAllUsers: async () => {
    const response: AxiosResponse<IGetPostList> = await axiosInstance.get('/api/users');
    return response.data;
  },
};
