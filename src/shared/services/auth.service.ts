import { isUserAuthenticated } from '@/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { authRepository } from '../repositories/auth.repository';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { IApiError } from '../interfaces/services';

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IOtp {
  email: string;
  otp: string;
}

export interface IResetPwd {
  token: string;
  newPassword: string;
}

export interface ILogout {
  userId: string;
  refreshToken: string;
}

export interface IChangePwd {
  oldPassword: string;
  newPassword: string;
}

interface IAuthService {
  useAuth: () => boolean;
  useOAuthCallback: () => ReturnType<typeof useQuery>;
  useRegister: () => UseMutationResult<void, IApiError, IAuthCredentials>;
  useLogin: () => UseMutationResult<void, IApiError, IAuthCredentials>;
  useVerifyOtp: () => UseMutationResult<void, IApiError, IOtp>;
  useResendOtp: () => UseMutationResult<void, IApiError, string>;
  useForgotPassword: () => UseMutationResult<void, IApiError, string>;
  useResetPassword: () => UseMutationResult<void, IApiError, IResetPwd>;
  useChangePassword: () => UseMutationResult<void, IApiError, IChangePwd>;
  useRefreshToken: () => UseMutationResult<void, IApiError, string>;
  useLogout: () => UseMutationResult<void, IApiError, ILogout>;
}

export const authService: IAuthService = {
  useAuth: () => {
    return useAppSelector(isUserAuthenticated);
  },

  useOAuthCallback: () => {
    return useQuery({
      queryKey: ['oauthCallback'],
      queryFn: authRepository.oauthCallback,
    });
  },

  useRegister: () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: authRepository.register,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'You have been registered successfully',
        });
        navigate('/');
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useLogin: () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    return useMutation({
      mutationFn: authRepository.login,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
        navigate('/');
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useVerifyOtp: () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: authRepository.verifyOtp,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'OTP verified successfully',
        });
        navigate('/');
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
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
          title: 'Success',
          description: 'OTP resent successfully',
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
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
          title: 'Success',
          description: 'Password reset instructions sent to your email',
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useResetPassword: () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: authRepository.resetPassword,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Password reset successfully',
        });
        navigate('/login');
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
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
          title: 'Success',
          description: 'Password changed successfully',
        });
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useRefreshToken: () => {
    const { toast } = useToast();

    return useMutation({
      mutationFn: authRepository.refreshToken,
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },

  useLogout: () => {
    const { toast } = useToast();
    const navigate = useNavigate();

    return useMutation({
      mutationFn: authRepository.logout,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Logged out successfully',
        });
        navigate('/login');
      },
      onError: (error: IApiError) => {
        toast({
          title: 'Error',
          description: error?.response?.data?.message,
        });
      },
    });
  },
};
