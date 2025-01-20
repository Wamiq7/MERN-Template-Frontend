import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IUser {
  _id: string;
  email: string;
  name: string;
  location: string;
  keyStatus: string;
  dateOfBirth: string;
  kycStatus: string;
  document: string;
  selfie: string;
}

interface IGetUsers {
  pagination: IPagination;
  data: IUser[];
}

interface IPostRepository {
  getAllUsers: (page: number, limit: number) => Promise<IGetUsers>;
}

export const userRepository: IPostRepository = {
  getAllUsers: async (page: number = 1, limit: number = 10) => {
    const response: AxiosResponse<IGetUsers> = await axiosInstance.get('/api/users', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};
