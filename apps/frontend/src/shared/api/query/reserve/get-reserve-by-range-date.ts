import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { RangeParams, getReserveListByDate, getReserveListByRangeDate } from '../../reserve';

export const useGetReserveByRangeDate = (
  { startDate, endDate }: RangeParams,
  options: Partial<
    UndefinedInitialDataOptions<Model.ReserveInfo[], Error, Model.ReserveInfo[], (string | Date)[]>
  > = {},
) =>
  useQuery({
    queryKey: [getReserveListByDate.name, startDate, endDate],
    queryFn: () => getReserveListByRangeDate({ startDate, endDate }),
    refetchInterval: 15000,
    ...options,
  });
