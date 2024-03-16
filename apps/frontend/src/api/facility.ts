import { Model } from '@slavseat/types';

import { axiosInstance } from './axiosInstance';

export const getAllFacility = async () => {
  return axiosInstance
    .get<Model.FacilityInfo[]>('/api/facility')
    .then((res) => res.data);
};

export const addFacility = async ({
  floorId,
  facilities,
}: {
  floorId: number;
  facilities: Omit<Model.FacilitySummary, 'id'>[];
}) => {
  return axiosInstance
    .post<Model.FacilityInfo[]>('/api/facility', {
      floorId,
      facilities,
    })
    .then((res) => res.data);
};

export const updateFacility = async (
  facilities: Model.FacilitySummary[],
) => {
  return axiosInstance
    .put<{ updated: number }>('/api/facility', { facilities })
    .then((res) => res.data);
};

export const removeFacility = async (facilities: number[]) => {
  return axiosInstance
    .delete<{ removed: number }>(`/api/facility`, {
      data: { facilities },
    })
    .then((res) => res.data);
};
