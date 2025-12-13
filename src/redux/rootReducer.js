import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

import adminAuthReducer from "./slices/adminAuthSlice";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token","auth"], 
};

const persistedAuth = persistReducer(persistConfig, authSlice);

export const reducer = combineReducers({
  adminAuth: adminAuthReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuth,
});
