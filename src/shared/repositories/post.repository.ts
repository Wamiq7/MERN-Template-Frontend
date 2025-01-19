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
  getPostList: () => Promise<IGetPostList>;
  getPostDetail: (postId: string) => Promise<IGetPostDetail>;
}

export const postRepository: IPostRepository = {
  getPostList: async () => {
    const response: AxiosResponse<IGetPostList> = await axiosInstance.get('/posts');
    return response.data;
  },
  getPostDetail: async (postId: string) => {
    const response: AxiosResponse<IGetPostDetail> = await axiosInstance.get(`/posts/${postId}`);
    return response.data;
  },
};
