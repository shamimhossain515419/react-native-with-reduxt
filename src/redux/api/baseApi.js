import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from 'react-native-config';
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.API_URL,  // later .env এ নেবে
  }),
  endpoints: () => ({}),
});
