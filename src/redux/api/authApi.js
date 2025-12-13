import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        data: body,
      }),
      invalidatesTags:['auth']
    }),
   login: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        data: body,
      }),
       invalidatesTags:['auth']
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
} = authApi;
