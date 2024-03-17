import { Model } from '@slavseat/types';

import { axiosInstance } from './axiosInstance';

export const getAllFloorSummary = async () => {
  return axiosInstance
    .get<Model.FloorSummary[]>('/api/floor')
    .then((res) => res.data);
};

export const getFloorDetail = async (floorId: number) => {
  return axiosInstance
    .get<Model.FloorInfo>(`/api/floor/${floorId}`)
    .then((res) => res.data);
};

export const createFloor = async (data: { name: string }) => {
  return axiosInstance
    .post<Model.FloorInfo>('/api/floor', data)
    .then((res) => res.data);
};

export const uploadFloorImage = async (
  floorId: number,
  file: File,
) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance
    .post<Model.FloorInfo>(`/api/floor/${floorId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
};
