import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { EMethod } from '@/constants';
import { postMessageHandler } from '@/components/ToastMessage';
import AuthService from '@/features/auth/service';
const baseURL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const NO_RETRY_HEADER = 'x-no-retry';
const apiConfig = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

// Lấy access token từ localStorage

// Interceptor Request
apiConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor Response
apiConfig.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,
  async (error: AxiosError) => {
    console.log('error', error);
    const { config, response, code, request } = error;
    if (code === 'ECONNABORTED') {
      postMessageHandler({
        type: 'error',
        text: 'Request timeout, please try again!',
      });
    } else if (response && config) {
      if (response.status === 401 && !config.headers[NO_RETRY_HEADER]) {
        const res = await AuthService.getNewAccessToken();
        const accessToken = res.data?.access_token;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers[NO_RETRY_HEADER] = 'true';
          return apiConfig.request(config);
        }
      }
      if (
        response.status === 400 &&
        config.url?.includes('auth/get-new-access-token')
      ) {
        postMessageHandler({
          type: 'error',
          text: 'Token expired, please login again!',
        });
        localStorage.removeItem('access_token');
        if (
          !['/login', '/register', '/forgot-password'].includes(
            window.location.pathname
          )
        ) {
          window.location.href = '/login';
        }
      }
      return Promise.reject(response.data);
    } else if (request) {
      postMessageHandler({
        type: 'error',
        text: 'Request error, please try again!',
      });
    } else {
      postMessageHandler({
        type: 'error',
        text: 'Request error, please try again!',
      });
    }
  }
);

// API Request Wrapper
const apiRequest = async <T, R>(
  method: EMethod,
  url: string,
  isFormData = false,
  data?: T
): Promise<R> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
    },
  };

  return apiConfig.request<T, R>({
    method,
    url,
    data,
    ...config,
  });
};

export default apiRequest;
