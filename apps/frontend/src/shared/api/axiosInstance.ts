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
    if (!isAxiosError(error)) return error;

    if (
      error.response?.status === 401 &&
      error.config?.url !== '/api/auth/me'
    ) {
      const accessToken = getParsedCookies()[ACCESS_TOKEN_KEY];
      const { config } = error;
      if (!accessToken || !config) return error;

      return await refreshAccessToken()
        .then(() => axiosInstance.request(config))
        .catch(() => error);
    }
  },
);
