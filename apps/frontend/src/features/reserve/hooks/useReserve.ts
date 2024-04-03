import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  getReserveListByUser,
  removeReserve,
} from '@/shared/api/reserve';

import { checkUsing, groupDataByDate } from '../utils/reserve.util';

interface UseCancelReserveArgs {
  onSuccess?: ({ removed }: { removed: number }) => void;
}

function useCancelReserve({ onSuccess }: UseCancelReserveArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeReserve,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [getReserveListByUser.name],
      });

      onSuccess?.(data);
    },
  });
}

interface UseReserveArgs {
  onCancelSuccess?: UseCancelReserveArgs['onSuccess'];
}

export function useReserve({ onCancelSuccess }: UseReserveArgs) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [getReserveListByUser.name],
    queryFn: () => getReserveListByUser(),
  });

  // 예약 취소
  const { mutate: cancelReserve } = useCancelReserve({
    onSuccess: onCancelSuccess,
  });

  // 고정 좌석 예약 정보
  const alwayReserve = useMemo(() => {
    return data?.find((reserve) => reserve.always);
  }, [data]);

  // 날짜별 예약 정보
  const groupReserves = useMemo(
    () =>
      data
        ? groupDataByDate(data.filter((reserve) => !reserve.always))
        : null,
    [data],
  );

  const usingReserves = useMemo(
    () => (data ? data.filter((reserve) => checkUsing(reserve)) : []),
    [data],
  );

  return {
    alwayReserve,
    groupReserves,
    usingReserves,
    isError,
    isLoading,
    cancelReserve,
  };
}
