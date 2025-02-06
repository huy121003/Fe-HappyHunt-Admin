import authApi from '@/apis/authApi';
import { EMethod } from '@/constants';
import i18n from '@/locales';
import axios from 'axios';

const baseURL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
const NO_RETRY_HEADER = 'x-no-retry';

// 🔹 Tạo Axios instance
export const apiConfig = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// 🔹 Hàm gửi request
export const apiRequest = (
  method: EMethod,
  url: string,
  isFormData: boolean,
  data?: any
) => {
  const headers: Record<string, string> = {};

  // ✅ Tự động nhận diện JSON hoặc FormData
  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  headers['Accept'] = 'application/json';

  return apiConfig({
    method,
    url,
    headers,
    data,
  });
};

// 🔹 Thêm Interceptor Request
apiConfig.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const language = localStorage.getItem('i18nextLng');
    if (language) {
      config.headers['Accept-Language'] = i18n.language;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 🔹 Hàm refresh token
const handelRefreshToken = async () => {
  try {
    const res = await authApi.AGetNewAccessToken();
    return res?.data?.access_token ?? null;
  } catch {
    return null;
  }
};

// 🔹 Thêm Interceptor Response
apiConfig.interceptors.response.use(
  (response) => response?.data ?? response,
  async (error) => {
    if (
      error.config &&
      error.response?.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handelRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = 'true';

      if (access_token) {
        error.config.headers['Authorization'] = `Bearer ${access_token}`;
        localStorage.setItem('access_token', access_token);
        return apiConfig.request(error.config);
      }
    }

    // Xử lý trường hợp token hết hạn
    if (
      error.response?.status === 400 &&
      error.config.url === 'auth/get-new-access-token'
    ) {
      localStorage.removeItem('access_token');
      if (
        !['/login', '/register', '/forgot-password', '/'].includes(
          window.location.pathname
        )
      ) {
        window.location.href = '/';
      }
    }

    return Promise.reject(error?.response?.data ?? error);
  }
);

export default apiConfig;
