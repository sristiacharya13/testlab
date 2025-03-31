import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  url: string;
  method: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: string;
  response: any;
  responseHistory: any[]; // Store response history
}

const initialState: ApiState = {
  url: "",
  method: "GET",
  headers: {},
  params: {},
  body: "",
  response: null,
  responseHistory: [], // Initialize history as an empty array
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<Partial<ApiState>>) => {
      return { ...state, ...action.payload };
    },
    setResponseData: (state, action: PayloadAction<any>) => {
      // Ensure headers are plain objects
      const responseData = {
        ...action.payload,
        headers: action.payload?.headers
          ? Object.fromEntries(Object.entries(action.payload.headers))
          : {},
        config: {
          ...action.payload?.config,
          headers: action.payload?.config?.headers
            ? Object.fromEntries(Object.entries(action.payload.config.headers))
            : {},
        }, // Ensure config headers are also serializable
      };

      // Store latest response
      state.response = responseData;

      // Append new response to history (limit to last 10 responses)
      state.responseHistory = [responseData, ...state.responseHistory].slice(0, 10);
    },
    clearResponseHistory: (state) => {
      state.responseHistory = []; // Clear history
    },
  },
});

export const { setRequestData, setResponseData, clearResponseHistory } = apiSlice.actions;
export default apiSlice.reducer;
