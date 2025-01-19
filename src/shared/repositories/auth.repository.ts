import type { AxiosResponse } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

// Base API paths
const AUTH_API_PATHS = {
  OAUTH_CALLBACK: '/api/auth/google/callback',
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  VERIFY_OTP: '/api/auth/verify-otp',
  RESEND_OTP: '/api/auth/resend-otp',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  CHANGE_PASSWORD: '/api/auth/changePassword',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LOGOUT: '/api/auth/logout',
} as const;

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

interface IAuthRepository {
  oauthCallback: () => Promise<void>;
  register: (data: IAuthCredentials) => Promise<void>;
  login: (data: IAuthCredentials) => Promise<void>;
  verifyOtp: (data: IOtp) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: IResetPwd) => Promise<void>;
  changePassword: (data: IChangePwd) => Promise<void>;
  refreshToken: (refreshToken: string) => Promise<void>;
  logout: (data: ILogout) => Promise<void>;
}

const makeApiCall = async <T>(method: 'get' | 'post', path: string, data?: unknown): Promise<T> => {
  const response: AxiosResponse<T> = await (method === 'get'
    ? axiosInstance.get(path)
    : axiosInstance.post(path, data));
  return response.data;
};

// Auth repository implementation
export const authRepository: IAuthRepository = {
  oauthCallback: () => makeApiCall('get', AUTH_API_PATHS.OAUTH_CALLBACK),

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

  refreshToken: (refreshToken: string) => makeApiCall('post', AUTH_API_PATHS.REFRESH_TOKEN, { refreshToken }),

  logout: (data: ILogout) =>
    makeApiCall('post', AUTH_API_PATHS.LOGOUT, {
      userId: data.userId,
      refreshToken: data.refreshToken,
    }),
};
