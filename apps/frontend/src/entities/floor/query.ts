import { Model } from '@slavseat/types';

import { queryClient } from '@/shared/query/queryClient';

const keys = {
  root: () => ['floor'],
  floors: (slug: string) => [...keys.root(), 'floors', slug],
};

const floorsService = {
  queryKey: (slug: string) => keys.floors(slug),
  getCache: (slug: string) =>
    queryClient.getQueryData<Model.Floorinfo>(floorsService.queryKey(slug)),
};
