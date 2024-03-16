import { useQuery } from '@tanstack/react-query';

import { getAllFloorSummary } from '@/api/floor';

export const useGetAllFloorSummaryQuery = () =>
  useQuery({
    queryKey: [getAllFloorSummary.name],
    queryFn: getAllFloorSummary,
  });
