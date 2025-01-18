import { isUserAuthenticated } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { authRepository } from "../repositories/auth.repository";

interface IAuthService {
  useAuth: () => boolean;
  useOAuthCallback: () => any;
}

export const authService: IAuthService = {
  useAuth: () => {
    const isAuth = useAppSelector(isUserAuthenticated);
    return isAuth;
  },
  useOAuthCallback: () => {
    return useQuery({
      queryKey: ["oauthCallback"],
      queryFn: () => authRepository.oauthCallback(),
    });
  },
};
