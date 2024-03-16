import axios from 'axios';

import { ACCESS_TOKEN_KEY } from '@/constants/auth.constant';
import { getParsedCookies } from '@/utils/cookie.util';

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getParsedCookies()[ACCESS_TOKEN_KEY];
  console.log('accessToken', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
