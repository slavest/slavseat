import { Model } from '@slavseat/types';
import { format } from 'date-fns';

import { axiosInstance } from './axiosInstance';

export const getReserveListByDate = async (date: Date) => {
  return axiosInstance
    .get<Model.ReserveInfo[]>('/api/reserve', {
      params: {
        date: format(date, 'yyyy-MM-dd'),
      },
    })
    .then((res) => res.data);
};

export const getReserveListByUser = async () => {
  return axiosInstance
    .get<Model.ReserveInfo[]>('/api/reserve/user')
    .then((res) => res.data);
};

export const addReserve = async (data: {
  start: Date;
  end?: Date | null;
  always: boolean;
  facilityId: number;
}) => {
  return axiosInstance
    .post<Model.ReserveInfo>('/api/reserve', data)
    .then((res) => res.data);
};

export const removeReserve = async (reserveId: number) => {
  return axiosInstance
    .delete<{ removed: number }>(`/api/reserve/${reserveId}`)
    .then((res) => res.data);
};
