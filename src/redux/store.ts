import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";

export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["api.response.config.headers"], // Ignore config.headers serialization
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
