import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { getAllFloorSummary } from '@/shared/api/floor';

export const useGetAllFloorSummaryQuery = (
  options: Partial<
    UndefinedInitialDataOptions<Model.FloorSummary[], Error, Model.FloorSummary[], string[]>
  > = {},
) =>
  useQuery({
    queryKey: [getAllFloorSummary.name],
    queryFn: getAllFloorSummary,
    ...options,
  });
