import { isUserAuthenticated } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";

interface IAuthService {
  useAuth: () => boolean;
}

export const authService: IAuthService = {
  useAuth: () => {
    const isAuth = useAppSelector(isUserAuthenticated);
    return isAuth;
  },
};
