import { queryOptions } from '@tanstack/react-query';

import { Model } from '@slavseat/types';

import { queryClient } from '@/shared/query/queryClient';

import { getAllFloorSummary, getFloorDetail } from './api';

const keys = {
  root: () => ['floor'],
  floors: () => [...keys.root(), 'floors'],
  floor: (slug: number) => [...keys.root(), 'bySlug', slug],
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

export const floorService = {
  queryKey: (slug: number) => keys.floor(slug),

  getCache: (slug: number) =>
    queryClient.getQueryData<Model.FloorInfo>(floorService.queryKey(slug)),

  setCache: (slug: number, floor: Model.FloorInfo) =>
    queryClient.setQueryData(floorService.queryKey(slug), floor),

  removeCache: (slug: number) =>
    queryClient.removeQueries({ queryKey: floorService.queryKey(slug) }),

  queryOptions: (slug: number) => {
    const floorKey = floorService.queryKey(slug);
    return queryOptions({
      queryKey: floorKey,
      queryFn: () => getFloorDetail(slug),
      initialData: () => floorService.getCache(slug)!,
      initialDataUpdatedAt: () => queryClient.getQueryState(floorKey)?.dataUpdatedAt,
    });
  },

  prefetchQuery: (slug: number) => queryClient.prefetchQuery(floorService.queryOptions(slug)),

  ensureQueryData: (slug: number) => queryClient.ensureQueryData(floorService.queryOptions(slug)),
};
