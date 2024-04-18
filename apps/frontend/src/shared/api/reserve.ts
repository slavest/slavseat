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
    .then(
      (res) =>
        res.data.map((reserve) => ({
          ...reserve,
          start: new Date(reserve.start),
          end: reserve.end ? new Date(reserve.end) : null,
        })) as Model.ReserveInfo[],
    );
};

export const getReserveListByUser = async () => {
  return axiosInstance
    .get<Model.ReserveInfo[]>('/api/reserve/user')
    .then(
      (res) =>
        res.data.map((reserve) => ({
          ...reserve,
          start: new Date(reserve.start),
          end: reserve.end ? new Date(reserve.end) : null,
        })) as Model.ReserveInfo[],
    );
};

export const addReserve = async (data: {
  start: Date;
  end?: Date | null;
  always: boolean;
  facilityId: number;
}) => {
  return axiosInstance
    .post<Model.ReserveInfo>('/api/reserve', data)
    .then(
      (res) =>
        ({
          ...res.data,
          start: new Date(res.data.start),
          end: res.data.end ? new Date(res.data.end) : null,
        }) as Model.ReserveInfo,
    );
};

export const addAdminReserve = async (data: {
  userId: number;
  start: Date;
  end?: Date | null;
  always: boolean;
  facilityId: number;
}) => {
  return axiosInstance
    .post<Model.ReserveInfo>('/api/reserve/admin', data)
    .then(
      (res) =>
        ({
          ...res.data,
          start: new Date(res.data.start),
          end: res.data.end ? new Date(res.data.end) : null,
        }) as Model.ReserveInfo,
    );
};

export const removeReserve = async (reserveId: number) => {
  return axiosInstance
    .delete<{ removed: number }>(`/api/reserve/${reserveId}`)
    .then((res) => res.data);
};
