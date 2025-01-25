import * as types from "../interfaces/auth-types";
import { makeApiCall } from "./utils.repository";

// Base API paths
const AUTH_API_PATHS = {
  OAUTH_CALLBACK: "/api/auth/socialAuth",
  SIGNUP: "/api/auth/signup",
  LOGIN: "/api/auth/login",
  VERIFY_OTP: "/api/auth/verify-otp",
  RESEND_OTP: "/api/auth/resend-otp",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  CHANGE_PASSWORD: "/api/auth/changePassword",
  LOGOUT: "/api/auth/logout",
} as const;

interface IAuthRepository {
  oauthCallback: (token: string) => Promise<types.IOAuth>;
  register: (data: types.IAuthCredentials) => Promise<void>;
  login: (data: types.IAuthCredentials) => Promise<types.IOAuth>;
  verifyOtp: (data: types.IOtp) => Promise<types.IOAuth>;
  resendOtp: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: types.IResetPwd) => Promise<void>;
  changePassword: (data: types.IChangePwd) => Promise<void>;
  logout: () => Promise<void>;
}

// Auth repository implementation
export const authRepository: IAuthRepository = {
  oauthCallback: (token: string) =>
    makeApiCall<types.IOAuth>("post", AUTH_API_PATHS.OAUTH_CALLBACK, {
      data: { token },
    }),

  register: (data: types.IAuthCredentials) =>
    makeApiCall("post", AUTH_API_PATHS.SIGNUP, {
      data: {
        email: data.email,
        password: data.password,
      },
    }),

  login: (data: types.IAuthCredentials) =>
    makeApiCall("post", AUTH_API_PATHS.LOGIN, {
      data: {
        email: data.email,
        password: data.password,
        clientType: "web",
      },
      withCredentials: true,
    }),

  verifyOtp: (data: types.IOtp) =>
    makeApiCall("post", AUTH_API_PATHS.VERIFY_OTP, {
      data: {
        email: data.email,
        otp: data.otp,
      },
    }),

  resendOtp: (email: string) =>
    makeApiCall("post", AUTH_API_PATHS.RESEND_OTP, { data: { email } }),

  forgotPassword: (email: string) =>
    makeApiCall("post", AUTH_API_PATHS.FORGOT_PASSWORD, { data: { email } }),

  resetPassword: (data: types.IResetPwd) =>
    makeApiCall("post", AUTH_API_PATHS.RESET_PASSWORD, {
      data: {
        token: data.token,
        newPassword: data.newPassword,
      },
    }),

  changePassword: (data: types.IChangePwd) =>
    makeApiCall("post", AUTH_API_PATHS.CHANGE_PASSWORD, {
      data: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    }),

  logout: () => makeApiCall<void>("post", AUTH_API_PATHS.LOGOUT),
};
