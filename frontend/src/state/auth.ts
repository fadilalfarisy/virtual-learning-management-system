import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  logged: boolean;
  fullName: string;
  email: string;
  role: string;
  accessToken: string;
}

const initialValue: AuthState = {
  logged: false,
  fullName: "",
  email: "",
  role: "",
  accessToken: "",
};

const initialState = (): AuthState => {
  const authLocalStorage = localStorage.getItem("auth");
  if (authLocalStorage) {
    const authJSON = JSON.parse(authLocalStorage);
    return {
      logged: true,
      ...authJSON,
    };
  }
  return initialValue;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      const newToken = action.payload;
      state.accessToken = newToken;
      const authLocalStorage = localStorage.getItem("auth");
      if (authLocalStorage) {
        const authJSON = JSON.parse(authLocalStorage);
        const newAuth = JSON.stringify({
          ...authJSON,
          accessToken: newToken,
        });
        localStorage.setItem("auth", newAuth);
      }
    },
    setAuth: (state, action: PayloadAction<AuthState>) => {
      const authLocalStorage = {
        fullName: action.payload.fullName,
        email: action.payload.email,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
      state.logged = action.payload.logged;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("auth", JSON.stringify(authLocalStorage));
    },
    deleteAuth: (state) => {
      state.logged = false;
      state.fullName = "";
      state.email = "";
      state.role = "";
      state.accessToken = "";
      localStorage.removeItem("auth");
    },
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
