import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  selfie: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = {
        id: user.id,
        name: user.name ? user.name : "Anonymous",
        email: user.email,
        role: user.role,
        selfie: user.selfie,
      };
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, updateAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const isUserAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const user = (state: RootState) => state.auth.user;
export const userRole = (state: RootState) => state.auth.user?.role;
