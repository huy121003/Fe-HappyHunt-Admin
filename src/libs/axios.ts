import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { EMethod } from '@/constants';
import { postMessageHandler } from '@/components/ToastMessage';
import AuthService from '@/features/auth/service';
import { ICommonResponse } from '@/interfaces';
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

// Xử lý thông báo lỗi
const showError = (message: string) => {
  postMessageHandler({ type: 'error', text: message });
};

// Interceptor xử lý response
apiConfig.interceptors.response.use(
  (response: AxiosResponse) => response?.data ?? response,

  async (error: AxiosError<ICommonResponse>) => {
    const { config, response, code } = error;

    if (code === 'ECONNABORTED') {
      postMessageHandler({
        type: 'error',
        text: 'Request timeout, please try again!',
      });
      showError('Request timeout, please try again!');
      return Promise.reject(error);
    }

    if (!config || !response) {
      postMessageHandler({
        type: 'error',
        text: 'Request error, please try again!',
      });
      showError('Request error, please try again!');
      return Promise.reject(error);
    }

    const { status } = response;

    // Xử lý lỗi 401 - Unauthorized
    if (status === 401 && !config.headers[NO_RETRY_HEADER]) {
      try {
        if (
          ['/login', '/register', '/forgot-password'].includes(
            window.location.pathname
          )
        ) {
          return;
        }
        const res = await AuthService.getNewAccessToken();
        const accessToken = res.data?.access_token;

        if (accessToken) {
          localStorage.setItem('access_token', accessToken);

          // Gán token mới vào request header
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers[NO_RETRY_HEADER] = 'true';

          // Gửi lại request đã bị lỗi
          return apiConfig.request(config);
        }
      } catch (refreshError) {
        showError('Token expired, please login again!');
        postMessageHandler({
          type: 'error',
          text: refreshError.response?.data.message,
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
    }

    // // Xử lý lỗi 400 - Token refresh thất bại
    // if (status === 400 && config.url?.includes('auth/get-new-access-token')) {
    //   showError('Token expired, please login again!');
    //   localStorage.removeItem('access_token');
    //   postMessageHandler({
    //     type: 'error',
    //     text: response.data.message,
    //   });
    //   if (
    //     !['/login', '/register', '/forgot-password'].includes(
    //       window.location.pathname
    //     )
    //   ) {
    //     window.location.href = '/login';
    //   }
    // }

    // Trả về lỗi để các hàm gọi API có thể xử lý tiếp
    return Promise.reject(response.data ?? error);
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
