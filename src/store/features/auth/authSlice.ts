import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface AuthState {
  userRole: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  userRole: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { role, accessToken, refreshToken } = action.payload;
      state.userRole = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.userRole = null;
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
export const user = (state: RootState) => state.auth;
export const userRole = (state: RootState) => state.auth.userRole;
