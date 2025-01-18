import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../repositories/user.repository";

interface IAuthService {
  userGetAllUsers: () => void;
}

export const userService: IAuthService = {
  userGetAllUsers: () => {
    return useQuery({
      queryKey: ["getUsersList"],
      queryFn: userRepository.getAllUsers,
    });
  },
};
