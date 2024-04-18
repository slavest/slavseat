import { useQuery } from '@tanstack/react-query';

import { Model } from '@slavseat/types';
import debounce from 'lodash/debounce';

import { getUsersByName } from '@/shared/api/user';
import { debounceAsync } from '@/shared/utils/debounce.util';

export const useSearchQuery = (name?: string) => {
  return useQuery({
    queryKey: [getUsersByName.name, name],
    queryFn: () =>
      debounceAsync<Model.UserInfo[], typeof getUsersByName>(
        getUsersByName,
        500,
      )(name!),
    enabled: !!name,
  });
};
