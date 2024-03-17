import { useQuery } from '@tanstack/react-query';

import { getAuthedUser } from '@/api/auth';

export const useGetAuthedUser = () =>
  useQuery({
    queryKey: [getAuthedUser.name],
    queryFn: getAuthedUser,
  });
