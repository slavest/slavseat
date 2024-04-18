import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { getReserveListByDate } from '../../reserve';

export const useGetReserveByDate = (
  date: Date,
  options: Partial<
    UndefinedInitialDataOptions<Model.ReserveInfo[], Error, Model.ReserveInfo[], (string | Date)[]>
  > = {},
) =>
  useQuery({
    queryKey: [getReserveListByDate.name, date],
    queryFn: () => getReserveListByDate(date),
    refetchInterval: 15000,
    ...options,
  });
