import apiClient from './apiClient';

export const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await apiClient({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
        console.log(axiosError,'axiosError')
      return {
        error: {
          status: axiosError.response?.status,
          message: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
