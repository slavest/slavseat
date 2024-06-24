import { queryOptions } from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { queryClient } from '@/shared/query/queryClient';

import { getAllFloorSummary } from './api';

const keys = {
  root: () => ['floor'],
  floors: () => [...keys.root(), 'floors'],
};

export const floorsService = {
  queryKey: () => keys.floors(),
  getCache: () => queryClient.getQueryData<Model.FloorSummary[]>(floorsService.queryKey()),
  setCache: (floors: Model.FloorSummary[]) =>
    queryClient.setQueryData(floorsService.queryKey(), floors),
  removeCache: () => queryClient.removeQueries({ queryKey: floorsService.queryKey() }),
  queryOptions: () => {
    const floorsKey = floorsService.queryKey();
    return queryOptions({
      queryKey: floorsKey,
      queryFn: getAllFloorSummary,
      initialData: () => floorsService.getCache()!,
      initialDataUpdatedAt: () => queryClient.getQueryState(floorsKey)?.dataUpdatedAt,
    });
  },
  prefetchQuery: () => queryClient.prefetchQuery(floorsService.queryOptions()),
  ensureQueryData: () => queryClient.ensureQueryData(floorsService.queryOptions()),
};
