import { useQuery } from '@tanstack/react-query';

import { getUsersByName } from '@/shared/api/user';

export const useSearchQuery = (name?: string) =>
  useQuery({
    queryKey: [getUsersByName.name, name],
    queryFn: () => getUsersByName(name!),
    enabled: !!name,
  });
