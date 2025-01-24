import {
  isUserAuthenticated,
  logout,
  setCredentials,
} from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authRepository } from "../repositories/auth.repository";
import { useToast } from "@/hooks/use-toast";
import { IApiError } from "../interfaces/services";
import * as types from "../interfaces/auth-types";
import { useRouter } from "next/navigation";

interface IAuthService {
  useAuth: () => boolean;
  useOAuthCallback: () => UseMutationResult<types.IOAuth, IApiError, string>;
  useRegister: () => UseMutationResult<void, IApiError, types.IAuthCredentials>;
  useLogin: () => UseMutationResult<
    types.IOAuth,
    IApiError,
    types.IAuthCredentials
  >;
  useVerifyOtp: () => UseMutationResult<types.IOAuth, IApiError, types.IOtp>;
  useResendOtp: () => UseMutationResult<void, IApiError, string>;
  useForgotPassword: () => UseMutationResult<void, IApiError, string>;
  useResetPassword: () => UseMutationResult<void, IApiError, types.IResetPwd>;
  useChangePassword: () => UseMutationResult<void, IApiError, types.IChangePwd>;
  useLogout: () => UseMutationResult<void, IApiError>;
}

export const authService: IAuthService = {
  useAuth: () => {
    return useAppSelector(isUserAuthenticated);
  },

  useOAuthCallback: () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.oauthCallback,
      onSuccess: (resp) => {
        dispatch(
          setCredentials({
            role: resp.data.role,
            accessToken: resp.token,
          })
        );
        router.push("/");
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useRegister: () => {
    const { toast } = useToast();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.register,
      onSuccess: (_, variables) => {
        toast({
          title: "Success",
          description: "You have been registered successfully",
        });
        router.push(`/verify-otp/${variables.email}`);
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useLogin: () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.login,
      onSuccess: (resp) => {
        console.log("resp", resp);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        dispatch(
          setCredentials({
            role: resp.data.role,
            accessToken: resp.token,
          })
        );
        router.push("/");
      },
      onError: (error: IApiError, variables) => {
        console.log("error", error);
        if (
          error?.response?.data?.message ===
          "Email is not verified. Please verify your email to proceed."
        ) {
          router.push(`/verify-otp/${variables.email}`);
        }
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useVerifyOtp: () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.verifyOtp,
      onSuccess: (resp) => {
        toast({
          title: "Success",
          description: "OTP verified successfully",
        });
        dispatch(
          setCredentials({
            role: resp.data.role,
            accessToken: resp.token,
          })
        );
        router.push("/");
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useResendOtp: () => {
    const { toast } = useToast();

    return useMutation({
      mutationFn: authRepository.resendOtp,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "OTP resent successfully",
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useForgotPassword: () => {
    const { toast } = useToast();

    return useMutation({
      mutationFn: authRepository.forgotPassword,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset instructions sent to your email",
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useResetPassword: () => {
    const { toast } = useToast();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.resetPassword,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password reset successfully",
        });
        router.push("/login");
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useChangePassword: () => {
    const { toast } = useToast();

    return useMutation({
      mutationFn: authRepository.changePassword,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useLogout: () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    return useMutation({
      mutationFn: authRepository.logout,
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Logged out successfully",
        });
        dispatch(logout());
        router.push("/login");
      },
      onError: (error: IApiError) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message,
        });
      },
    });
  },
};
