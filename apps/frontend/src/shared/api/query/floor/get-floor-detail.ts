import { useQuery } from '@tanstack/react-query';

import { getFloorDetail } from '@/shared/api/floor';

export const useGetFLoorDetailQuery = (floorId: number) =>
  useQuery({
    queryKey: [getFloorDetail.name],
    queryFn: () => getFloorDetail(floorId),
  });
