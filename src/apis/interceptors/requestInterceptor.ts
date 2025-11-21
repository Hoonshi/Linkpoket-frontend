import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

/* request 전에 accessToken을 헤더에 자동으로 추가 */
export const setupRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });
};
