import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

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

interface IOAuth {
  data: {
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Base API paths
const AUTH_API_PATHS = {
  OAUTH_CALLBACK: '/api/auth/socialAuth', // done
  SIGNUP: '/api/auth/signup', // done 1
  LOGIN: '/api/auth/login', // done 2
  VERIFY_OTP: '/api/auth/verify-otp', // 3
  RESEND_OTP: '/api/auth/resend-otp', // optional
  FORGOT_PASSWORD: '/api/auth/forgot-password', // done
  RESET_PASSWORD: '/api/auth/reset-password', // done
  CHANGE_PASSWORD: '/api/auth/changePassword',
  LOGOUT: '/api/auth/logout', // done
} as const;

interface IAuthRepository {
  oauthCallback: (token: string) => Promise<IOAuth>;
  register: (data: IAuthCredentials) => Promise<void>;
  login: (data: IAuthCredentials) => Promise<void>;
  verifyOtp: (data: IOtp) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: IResetPwd) => Promise<void>;
  changePassword: (data: IChangePwd) => Promise<void>;
  logout: () => Promise<void>;
}

const makeApiCall = async <T>(method: 'get' | 'post', path: string, data?: unknown): Promise<T> => {
  const response: AxiosResponse<T> = await (method === 'get'
    ? axiosInstance.get(path)
    : axiosInstance.post(path, data));
  return response.data;
};

// Auth repository implementation
export const authRepository: IAuthRepository = {
  oauthCallback: (token: string) => makeApiCall<IOAuth>('post', AUTH_API_PATHS.OAUTH_CALLBACK, { token }),

  register: (data: IAuthCredentials) =>
    makeApiCall('post', AUTH_API_PATHS.SIGNUP, {
      email: data.email,
      password: data.password,
    }),

  login: (data: IAuthCredentials) =>
    makeApiCall('post', AUTH_API_PATHS.LOGIN, {
      email: data.email,
      password: data.password,
    }),

  verifyOtp: (data: IOtp) =>
    makeApiCall('post', AUTH_API_PATHS.VERIFY_OTP, {
      email: data.email,
      otp: data.otp,
    }),

  resendOtp: (email: string) => makeApiCall('post', AUTH_API_PATHS.RESEND_OTP, { email }),

  forgotPassword: (email: string) => makeApiCall('post', AUTH_API_PATHS.FORGOT_PASSWORD, { email }),

  resetPassword: (data: IResetPwd) =>
    makeApiCall('post', AUTH_API_PATHS.RESET_PASSWORD, {
      token: data.token,
      newPassword: data.newPassword,
    }),

  changePassword: (data: IChangePwd) =>
    makeApiCall('post', AUTH_API_PATHS.CHANGE_PASSWORD, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }),

  logout: () => makeApiCall<void>('post', AUTH_API_PATHS.LOGOUT),
};
