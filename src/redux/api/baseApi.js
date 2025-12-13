import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../context/axiosBaseQuery";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ['auth'],
  endpoints: () => ({}),
});
