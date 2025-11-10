import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import { authReducer } from "./auth";
import { bookmarkReducer } from "./bookmark";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
