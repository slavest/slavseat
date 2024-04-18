import { Model } from '@slavseat/types';

import { axiosInstance } from './axiosInstance';

export const getUsersByName = async (name: string) => {
  return axiosInstance
    .get<Model.UserInfo[]>('/api/user/search/name', {
      params: {
        name,
      },
    })
    .then((res) => res.data);
};
