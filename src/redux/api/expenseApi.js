import { baseApi } from './baseApi';

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ========= CREATE ========= */
    createExpense: builder.mutation({
      query: (body) => ({
        url: '/expenses',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['expense'],
    }),

    /* ========= GET ALL ========= */
    getAllExpense: builder.query({
      query: (params) => ({
        url: '/expenses',
        method: 'GET',
        params, // pagination / search থাকলে
      }),
      providesTags: ['expense'],
    }),

    /* ========= GET SINGLE ========= */
    getSingleExpense: builder.query({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: 'expense', id },
      ],
    }),

    /* ========= UPDATE (PATCH) ========= */
    updateExpense: builder.mutation({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'expense', id },
        'expense',
      ],
    }),

    /* ========= DELETE ========= */
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expense'],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpenseQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
