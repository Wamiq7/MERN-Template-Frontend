import { isUserAuthenticated } from "@/store/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authRepository } from "../repositories/auth.repository";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface IAuthService {
  useAuth: () => boolean;
  useOAuthCallback: () => any;
  useRegister: () => any;
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
  useRegister: () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: authRepository.register,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "You have been registered successfully",
        });
        navigate("/");
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      },
    });
  },
};
