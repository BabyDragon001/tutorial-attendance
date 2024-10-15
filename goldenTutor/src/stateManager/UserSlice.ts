import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface User {
  id?: string | null;
  _id?: string | null;
  email: string;
  password?: string;
  number?: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  identityNumber?: string;
  name?: string;
  familyName?: string;
  image?: string;
  role?: "user" | "admin";
  department?: string;
  level?: string;
  cummulativePoint?: number;
}

export interface UserSlice {
  user: User | null;
  token?: string | null;
}

const initialState: UserSlice = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ user: User; token: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token"],
};

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export default persistedUserReducer;
