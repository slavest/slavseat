import {
  UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { getFloorDetail } from '@/shared/api/floor';

export const useGetFloorDetailQuery = (
  floorId: number,
  options: Partial<
    UndefinedInitialDataOptions<
      Model.FloorInfo,
      Error,
      Model.FloorInfo,
      string[]
    >
  > = {},
) =>
  useQuery({
    queryKey: [getFloorDetail.name, floorId?.toString()],
    queryFn: () => getFloorDetail(floorId),
    ...options,
  });
