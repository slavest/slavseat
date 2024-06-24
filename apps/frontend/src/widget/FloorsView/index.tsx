import { useQuery } from '@tanstack/react-query';

import { floorsService } from '@/entities/floor/query';

export function FloorsView() {
  const { data: floors } = useQuery(floorsService.queryOptions());
}
