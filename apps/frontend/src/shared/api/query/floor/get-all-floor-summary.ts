import { useQuery } from '@tanstack/react-query';

import { getAllFloorSummary } from '@/shared/api/floor';

export const useGetAllFloorSummaryQuery = () =>
  useQuery({
    queryKey: [getAllFloorSummary.name],
    queryFn: getAllFloorSummary,
  });
