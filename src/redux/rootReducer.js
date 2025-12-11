import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import adminAuthReducer from "./slices/adminAuthSlice";

export const reducer = combineReducers({
  adminAuth: adminAuthReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
