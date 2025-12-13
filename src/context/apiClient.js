import axios from 'axios';
import Config from 'react-native-config';
import { store } from '../redux/store';
import { clearRefreshToken, getRefreshToken, saveRefreshToken } from './secureStore';
import { loginSuccess, logout } from '../redux/slices/authSlice';


const apiClient = axios.create({
  baseURL: 'http://192.168.1.102:8000/api',
  timeout: 15000,
});

/* 🔐 Request interceptor (attach access token) */
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* 🔁 Response interceptor (refresh token) */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest,'originalRequest')
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const res = await axios.post(
          `http://192.168.1.102:8000/api/auth/refresh`,
          { refreshToken }
        );

        // update redux
        store.dispatch(
          loginSuccess({
            user: res.data.user,
            accessToken: res.data.accessToken,
          })
        );

        // save new refresh token securely
        await saveRefreshToken(res.data.refreshToken);

        // retry original request
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        await clearRefreshToken();
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
