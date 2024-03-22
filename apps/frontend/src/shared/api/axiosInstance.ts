import axios, { isAxiosError } from 'axios';

import { ACCESS_TOKEN_KEY } from '@/shared/constants/auth.constant';
import { getParsedCookies } from '@/shared/utils/cookie.util';

import { refreshAccessToken } from './auth';

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getParsedCookies()[ACCESS_TOKEN_KEY];

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) throw error;

    if (error.response?.status === 401) {
      const { config } = error;
      if (!config || config.url === '/api/auth/refresh') throw error;

      return await refreshAccessToken().then(() =>
        axiosInstance.request(config),
      );
    }
  },
);
