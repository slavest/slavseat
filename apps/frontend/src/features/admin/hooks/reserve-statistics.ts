import { useQuery } from '@tanstack/react-query';

import { getRecentDailyReserveStatistics } from '@/shared/api/statistics';

export const useReserveStatistics = () => {
  return useQuery({
    queryKey: [getRecentDailyReserveStatistics.name],
    queryFn: getRecentDailyReserveStatistics,
  });
};
