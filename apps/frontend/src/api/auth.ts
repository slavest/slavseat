import { axiosInstance } from './axiosInstance';

export const login = (provider: string = 'microsoft') => {
  const baseURL = import.meta.env.DEV ? 'localhost:3000' : '';

  window.location.href = `${baseURL}/api/auth/${provider}?redirectBackTo=${window.location.href}`;
};

export const refreshAccesToken = () => {
  return axiosInstance.get('/api/auth/refresh');
};

export const logout = () => {
  return axiosInstance.post('/api/auth/logout');
};
