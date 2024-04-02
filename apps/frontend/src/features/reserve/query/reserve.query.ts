import { useQuery } from '@tanstack/react-query';

import { getReserveListByUser } from '@/shared/api/reserve';

export const useGetReserveByUser = () =>
  useQuery({
    queryKey: [getReserveListByUser.name],
    queryFn: () => getReserveListByUser(),
  });
