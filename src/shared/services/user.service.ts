import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userRepository } from '../repositories/user.repository';

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

interface IAuthService {
  useGetAllUsers: (page: number, limit: number) => UseQueryResult<IGetUsers>;
}

export const userService: IAuthService = {
  useGetAllUsers: (page: number = 1, limit: number = 10) => {
    return useQuery({
      queryKey: ['getUsersList', page, limit],
      queryFn: () => userRepository.getAllUsers(page, limit),
    });
  },
};
