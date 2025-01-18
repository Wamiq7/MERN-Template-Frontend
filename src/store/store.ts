import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import themeReducer from "./features/theme/themeSlice";
import authReducer from "./features/auth/authSlice";
import { PersistPartial } from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "persist-store",
  version: 1,
  storage,
  whitelist: ["theme", "auth"],
};

const reducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

const persistedReducers = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export type AppDispatch = typeof store.dispatch;
