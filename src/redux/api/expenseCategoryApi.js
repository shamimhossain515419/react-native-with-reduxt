import { baseApi } from './baseApi';

export const expenseCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ========= CREATE ========= */
    createExpenseCategory: builder.mutation({
      query: (body) => ({
        url: '/expense-categories',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['expenseCategory'],
    }),

    /* ========= GET ALL ========= */
    getAllExpenseCategory: builder.query({
      query: (params) => ({
        url: '/expense-categories',
        method: 'GET',
        params,
      }),
      providesTags: ['expenseCategory'],
    }),

    /* ========= GET SINGLE ========= */
    getSingleExpenseCategory: builder.query({
      query: (id) => ({
        url: `/expense-categories/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: 'expenseCategory', id },
      ],
    }),

    /* ========= UPDATE (PATCH) ========= */
    updateExpenseCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/expense-categories/${id}`,
        method: 'PATCH',
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'expenseCategory', id },
        'expenseCategory',
      ],
    }),

    /* ========= DELETE ========= */
    deleteExpenseCategory: builder.mutation({
      query: (id) => ({
        url: `/expense-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expenseCategory'],
    }),
  }),
});

export const {
  useCreateExpenseCategoryMutation,
  useGetAllExpenseCategoryQuery,
  useGetSingleExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = expenseCategoryApi;
