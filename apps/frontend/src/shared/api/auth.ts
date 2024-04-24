import { Model } from '@slavseat/types';

import { axiosInstance } from './axiosInstance';

export const getAuthedUser = () => {
  return axiosInstance.get<Model.UserInfo>('/api/auth/me').then((res) => res.data);
};

export const login = (provider: string = 'microsoft', callbackUrl: string = '/') => {
  const baseURL = import.meta.env.DEV ? 'http://localhost:3000' : '';

  window.location.href = `${baseURL}/api/auth/${provider}?redirectBackTo=${window.location.origin}${callbackUrl}`;
};

export const refreshAccessToken = () => {
  return axiosInstance.get('/api/auth/refresh');
};

export const logout = () => {
  return axiosInstance.post('/api/auth/logout');
};
